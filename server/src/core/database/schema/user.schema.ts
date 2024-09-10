import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  username: varchar('username', { length: 256 }),
  givenName: varchar('given_name', { length: 256 }),
  familyName: varchar('family_name', { length: 256 }),
  description: text('description'),
  avatar: varchar('avatar'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export type NewUserRecord = typeof users.$inferInsert;
