import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import JobSeekerProfile from "../../../models/Jobseeker";

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

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        }).select("+password");

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        user.lastLoginAt = new Date();
        user.loginCount += 1;
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    /** ✅ GOOGLE SIGN IN */
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();

        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
            role: "JOBSEEKER",
            provider: "GOOGLE",
            verified: true,
          });

          await JobSeekerProfile.create({
            userId: dbUser._id,
            fullName: dbUser.name,
            email: dbUser.email,
            skills: "",
          });
        }

        user.id = dbUser._id.toString();
        (user as any).role = dbUser.role;
      }
      return true;
    },

    /** ✅ JWT – SINGLE SOURCE OF TRUTH */
    async jwt({ token, user }) {
      // first login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role;
      }

      // safety net (prevents 302 loop)
      if (!token.role && token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) token.role = dbUser.role;
      }

      return token;
    },

    /** ✅ SESSION */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    },

    /** ✅ POST LOGIN REDIRECT */
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard/jobseeker`;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };