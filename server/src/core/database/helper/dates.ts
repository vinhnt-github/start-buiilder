import { timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const DateModifine = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
};

export const WithDateModifine = {
  createdAt: z.date(),
  updatedAt: z.date(),
};
export const OmitDateModifine = {
  createdAt: true,
  updatedAt: true,
} as const;
