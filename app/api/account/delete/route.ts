import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { users, activityLogs, teamMembers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
    const session = await auth();

    if (!session?.user?.id) {
        return new Response('Unauthorized', { status: 401 });
    }
    
    await db
        .delete(activityLogs)
        .where(eq(activityLogs.userId, session.user.id));
    
    await db
        .delete(teamMembers)
        .where(eq(teamMembers.userId, session.user.id));
    
    await db
        .delete(users)
        .where(eq(users.id, session.user.id));

    return new Response('Account deleted', { status: 200 });
}
