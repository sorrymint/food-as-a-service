'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { createCheckoutSession } from '@/lib/payments/stripe';
import {
    validatedAction
} from '@/lib/auth/middleware';
import { getUser, getUserWithTeam } from '@/lib/db/queries';

const mockUsers: any[] = [];
const mockTeams: any[] = [];
const mockTeamMembers: any[] = [];
const mockInvitations: any[] = [];

function findUserByEmail(email: string) {
    return mockUsers.find((u) => u.email === email);
}

function findTeamById(id: number) {
    return mockTeams.find((t) => t.id === id);
}

function createMockId(list: any[]) {
    return list.length + 1;
}

async function logActivity(teamId: number | undefined, userId: number, type: string) {
    console.log(`[Activity] User ${userId} ${type} on team ${teamId}`);
}

const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100)
});

export const signIn = validatedAction(signInSchema, async ({ email, password }, formData) => {
    const user = findUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.passwordHash))) {
        return { error: 'Invalid email or password. Please try again.', email, password };
    }

    const team = mockTeamMembers.find((m) => m.userId === user.id);
    const foundTeam = team ? findTeamById(team.teamId) : null;

    await Promise.all([
        setSession(user),
        logActivity(foundTeam?.id, user.id, 'SIGN_IN')
    ]);

    const redirectTo = formData.get('redirect') as string | null;
    if (redirectTo === 'checkout') {
        const priceId = formData.get('priceId') as string;
        return createCheckoutSession({ team: foundTeam, priceId });
    }

    redirect('/dashboard');
});

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    inviteId: z.string().optional()
});

export const signUp = validatedAction(signUpSchema, async ({ email, password, inviteId }, formData) => {
    if (findUserByEmail(email)) {
        return { error: 'Email already in use. Please try again.', email, password };
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
        id: createMockId(mockUsers),
        email,
        passwordHash,
        name: '',
        role: 'owner',
        deletedAt: null
    };
    mockUsers.push(newUser);

    let teamId: number;
    let team: any = null;
    let role = 'owner';

    if (inviteId) {
        const invite = mockInvitations.find((i) => i.id.toString() === inviteId && i.email === email);
        if (!invite) return { error: 'Invalid or expired invitation.', email, password };

        teamId = invite.teamId;
        role = invite.role;
        invite.status = 'accepted';
        team = findTeamById(teamId);
        await logActivity(teamId, newUser.id, 'ACCEPT_INVITATION');
    } else {
        teamId = createMockId(mockTeams);
        team = { id: teamId, name: `${email}'s Team` };
        mockTeams.push(team);
        await logActivity(teamId, newUser.id, 'CREATE_TEAM');
    }

    mockTeamMembers.push({ id: createMockId(mockTeamMembers), teamId, userId: newUser.id, role });
    await Promise.all([
        logActivity(teamId, newUser.id, 'SIGN_UP'),
        setSession(newUser)
    ]);

    const redirectTo = formData.get('redirect') as string | null;
    if (redirectTo === 'checkout') {
        const priceId = formData.get('priceId') as string;
        return createCheckoutSession({ team, priceId });
    }

    redirect('/dashboard');
});

export async function signOut() {
    // @ts-ignore
    const user = await getUser();
    // @ts-ignore
    const userWithTeam = await getUserWithTeam(user.id);
    await logActivity(userWithTeam?.teamId, user.id, 'SIGN_OUT');
    (await cookies()).delete('session');
}
