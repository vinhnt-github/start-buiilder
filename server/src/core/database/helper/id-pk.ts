import { serial } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const IdSerialPrimaryKey = {
  id: serial('id').primaryKey(),
};

export const WithIdSerialPrimaryKey = {
  id: z.number(),
};
export const OmitIdSerialPrimaryKey = {
  id: true,
} as const;
