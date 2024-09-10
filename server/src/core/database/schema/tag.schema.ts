import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

import { DateModifine } from '@/core/database/helper/dates';
import { IdSerialPrimaryKey } from '@/core/database/helper/id-pk';
import { UserModifine } from '@/core/database/helper/user';
import { FlagEnum } from './enum';
import { FlagSchema } from './type';

export const tags = pgTable('tags', {
  ...IdSerialPrimaryKey,
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  displayName: varchar('display_name', { length: 256 }).notNull(),
  taggingCount: integer('tagging_count'),
  color: varchar('color').notNull(),
  description: text('description'),
  deletedFlag: FlagEnum('flag').default(FlagSchema.enum.N),
  image: varchar('image', { length: 1000 }),
  ...UserModifine,
  ...DateModifine,
});
