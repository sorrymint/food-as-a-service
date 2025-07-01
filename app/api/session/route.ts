// /app/api/session/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session'; // your existing function

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ user: null });
  }

  // You can include more user info if available
  return NextResponse.json({ user: { id: session.user.id } });
}