import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/core/database/schema/relationships.ts',
    './src/core/database/schema/enum.ts',
    './src/core/database/schema/*.schema.ts',
  ],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
