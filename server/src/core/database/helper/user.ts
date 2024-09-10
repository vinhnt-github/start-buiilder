import { integer } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const UserModifine = {
  createdBy: integer('created_by').notNull(),
  updatedBy: integer('updated_by').notNull(),
};

export const WithUserModifine = {
  createdBy: z.number(),
  updatedBy: z.number(),
};
export const OmitUserModifine = {
  createdBy: true,
  updatedBy: true,
} as const;
