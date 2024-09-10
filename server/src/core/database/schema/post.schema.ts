import { DateModifine } from '@/core/database/helper/dates';
import { IdSerialPrimaryKey } from '@/core/database/helper/id-pk';
import { UserModifine } from '@/core/database/helper/user';
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { PostStatusEnum, PostTypeEnum } from './enum';

export const posts = pgTable('posts', {
  ...IdSerialPrimaryKey,
  type: PostTypeEnum('type'),
  title: varchar('title', { length: 110 }).notNull(),
  emoji: varchar('emoji').default('🫥'),
  bodyMarkdown: text('body_markdown').notNull(),
  bodyHtml: text('body_html').notNull(),
  slug: varchar('slug', { length: 12 }).notNull().unique(),
  path: varchar('path', { length: 113 }).notNull(),
  likedCount: integer('liked_count').default(0),
  commentsCount: integer('comments_count').default(0),
  publishedAt: timestamp('published_at'),
  status: PostStatusEnum('status').notNull(),
  pinned: boolean('pinned').default(false),
  deleteFlag: varchar('delete_flag'),
  authorId: integer('author_id').notNull(),
  ...UserModifine,
  ...DateModifine,
});
