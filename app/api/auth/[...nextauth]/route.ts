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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        }).select("+password");

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Update login info
        user.lastLoginAt = new Date();
        user.loginCount += 1;
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();

        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          // Create new user
         dbUser = await User.create({
  name: user.name,
  email: user.email,
  avatar: user.image,
  role: "JOBSEEKER",
  provider: "GOOGLE",
  verified: true,
});
          console.log("✅ New user created via Google:", dbUser._id);
          // Create profile
          await JobSeekerProfile.create({
            userId: dbUser._id,
            skills: [],
          });
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }
      return true;
    },

    async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = (user as any).role;
    token.email = user.email;
  }
  return token;
}
,
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
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
