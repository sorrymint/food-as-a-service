import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!
  },
    migrations: {
    schema: "public", // Specify the schema for the migrations table
  },
} satisfies Config;

