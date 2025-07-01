// lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password required');
        }

        // Drizzle query to find user
        const foundUsers = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        const user = foundUsers[0];

        if (!user) {
          throw new Error('No user found with that email');
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id.toString(),
          name: user.name ?? '',
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);
