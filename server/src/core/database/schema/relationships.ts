import { relations } from 'drizzle-orm';
import { posts } from './post.schema';
import { tags } from './tag.schema';
import { tagToPost } from './tagsToPosts.schema';
import { users } from './user.schema';

export const tagToUserRelationship = relations(tags, ({ one }) => ({
  user: one(users, {
    fields: [tags.createdBy],
    references: [users.id],
  }),
}));

export const postToUserRelationship = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.createdBy],
    references: [users.id],
  }),
}));

export const tagsToPostsRelations = relations(tagToPost, ({ one }) => ({
  posts: one(posts, {
    fields: [tagToPost.postId],
    references: [posts.id],
  }),
  tags: one(tags, {
    fields: [tagToPost.tagId],
    references: [tags.id],
  }),
}));
