import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;

// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   dialect: "postgresql",
//   out: "./drizzle-schema",
//   dbCredentials: {
//     database: "dined",
//     host: "localhost",
//     port: 5432,
//     user: "docker",
//     password: "docker",
//     ssl: false,
//   },
// });
