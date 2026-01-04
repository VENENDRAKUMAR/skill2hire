import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { sendMail, emailTemplates } from "../../../lib/mail"; // ✅ Import mail utility

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase() }).select("+password");
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
// api/auth/[...nextauth]/route.ts

cookies: {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === "production",
      // LOCALHOST TESTING KE LIYE: 
      // Agar 'domain' kaam na kare toh is line ko comment karke check karein, 
      // par technically ".localhost" hi sahi hai.
      domain: ".localhost", 
    },
  },
},

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        let dbUser = await User.findOne({ email: user.email });
        
        // 🔍 Check if this is the Admin email from .env
        const isAdmin = user.email === process.env.ADMIN_EMAIL;

        if (!dbUser) {
          console.log(`🆕 Creating ${isAdmin ? 'ADMIN' : 'USER'} via Google...`);
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
            role: isAdmin ? "ADMIN" : "JOBSEEKER", // Admin ko auto-role dena
            provider: "GOOGLE",
            isNewUser: !isAdmin,
          });

          // 📧 Send Welcome Email for new users
          try {
            await sendMail(
              user.email!,
              "Welcome to JobBoard! 🎉",
              emailTemplates.welcome(user.name!, dbUser.role)
            );
          } catch (mailError) {
            console.error("❌ Welcome email failed:", mailError);
          }
        } else if (isAdmin && dbUser.role !== "ADMIN") {
          // Agar user hai par Admin role nahi mila ab tak
          dbUser.role = "ADMIN";
          await dbUser.save();
        }
        
        user.id = dbUser._id.toString();
        (user as any).role = dbUser.role;
        return true;
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.isNewUser = (user as any).isNewUser;
      }
      if (trigger === "update" && session?.role) {
        token.role = session.role;
        token.isNewUser = false;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.isNewUser = token.isNewUser as boolean;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };