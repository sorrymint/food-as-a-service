// app/auth/actions.ts
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/session';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';

export async function signUp(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then(res => res[0]);

  if (existingUser) {
    return { error: 'User already exists.' };
  }

  const passwordHash = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      role: 'member',
      name: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!newUser) {
    return { error: 'Failed to create user.' };
  }

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  };
}

export async function signIn(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then(res => res[0]);

  if (!user) {
    return { error: 'No user found with that email.' };
  }

  const isValid = await compare(password, user.passwordHash);
  if (!isValid) {
    return { error: 'Invalid password.' };
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}