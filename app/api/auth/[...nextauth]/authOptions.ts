import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db/drizzle'; // your drizzle setup
import { users } from '@/lib/db/schema';  // your users table
import { eq } from 'drizzle-orm';          // for WHERE condition
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password required');
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .then(results => results[0]);

        if (!user) {
          throw new Error('No user found with that email');
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id.toString(),
          name: user.name,
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
  },
};