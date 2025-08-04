import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { comparePasswords, hashPassword } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
        return new NextResponse('Missing passwords', { status: 400 });
    }

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

    if (!user) {
        return new NextResponse('User not found', { status: 404 });
    }

    const isMatch = await comparePasswords(currentPassword, user.passwordHash);
    if (!isMatch) {
        return new NextResponse('Current password is incorrect', { status: 403 });
    }

    const newHashedPassword = await hashPassword(newPassword);

    await db
        .update(users)
        .set({ passwordHash: newHashedPassword, updatedAt: new Date() })
        .where(eq(users.id, session.user.id));

    return new NextResponse('Password updated', { status: 200 });
}
