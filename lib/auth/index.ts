import { getSession } from './session';

export async function auth() {
    const session = await getSession();

    if (!session) {
        return null;
    }

    return session;
}