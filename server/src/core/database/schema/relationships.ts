import { relations } from 'drizzle-orm';
import { tags } from './tag.schema';
import { users } from './user.schema';

export const tagToUserRelationship = relations(tags, ({ one }) => ({
  user: one(users, {
    fields: [tags.createdBy],
    references: [users.id],
  }),
}));
