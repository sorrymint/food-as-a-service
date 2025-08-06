import type { Config } from 'drizzle-kit';

export default {
  schema: '@/lib/db/schema',
  out: '@/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: "public",
} satisfies Config;

