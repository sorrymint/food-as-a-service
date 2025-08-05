import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
    migrations: {
    schema: "public", // Specify the schema for the migration log table
  },
  dbCredentials: {
    url: process.env.POSTGRES_URL!
  },
  schemaFilter: "public",

} satisfies Config;

