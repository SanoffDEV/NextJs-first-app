import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const githubId = process.env.GITHUB_ID!;
const githubSecret = process.env.GITHUB_SECRET!;

const googleId = process.env.GOOGLE_ID!;
const googleSecret = process.env.GOOGLE_SECRET!;

if (!githubId || !githubSecret || !googleId || !googleSecret) {
  throw new Error("Missing environment variables");
}

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authConfig);
