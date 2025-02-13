import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import  dbConnect  from "@/database/dbConnect";
import {user} from "@/model/User";

import { AuthOptions } from "next-auth";
import { NextAuthUser } from "../auth/types/type";

 export  const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<any> {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          await dbConnect();
          const userFromDb = await user.findOne({ email }).exec();

          if (!userFromDb) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            userFromDb.password
          );

          if (!passwordsMatch) {
            return null;
          }

          // Map to NextAuthUser
          const userResponse: NextAuthUser = {
            email: userFromDb.email,
            name: userFromDb.name,
            role: userFromDb.role,
            image: userFromDb.image,
          };

          return userResponse;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "default-secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure the user object is cast to NextAuthUser
        token.user = user as NextAuthUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.user) {
        session.user = token.user as NextAuthUser;
      }
      return session;
    },
  },
  pages: {
    signIn: "/home",
  },
};