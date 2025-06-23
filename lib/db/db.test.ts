import { execSync } from 'node:child_process';
import { describe, it, expect, beforeAll } from 'vitest';
import { db } from './drizzle';
import { users } from './schema';
import { eq } from 'drizzle-orm';

describe('Database', () => {
  beforeAll(async () => {
    execSync('pnpx env-cmd -f .env.test drizzle-kit migrate', {
      stdio: 'inherit',
    });
    await db.delete(users).where(eq(users.email, 'test@example.com'));

  });

  it('can insert and fetch a user', async () => {
    const [createdUser] = await db
      .insert(users)
      .values({ email: 'test@example.com', passwordHash: 'hashed', role: 'CUSTOMER' })
      .returning();

    const fetchedUser = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, 'test@example.com'),
    });

    expect(fetchedUser).toBeDefined();
    expect(fetchedUser!.id).toBe(createdUser.id);
    expect(fetchedUser!.email).toBe('test@example.com');
  });
});