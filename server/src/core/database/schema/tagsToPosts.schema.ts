import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { DateModifine } from '../helper/dates';
import { posts } from './post.schema';
import { tags } from './tag.schema';

export const tagToPost = pgTable(
  'tags-to-posts',
  {
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id),
    ...DateModifine,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tagId, t.postId] }),
  }),
);
