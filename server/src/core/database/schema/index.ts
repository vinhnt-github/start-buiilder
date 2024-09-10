import * as posts from './post.schema';
import * as relationships from './relationships';
import * as tags from './tag.schema';
import * as tagToPost from './tagsToPosts.schema';
import * as users from './user.schema';

export const databaseSchema = {
  ...posts,
  ...tags,
  ...users,
  ...tagToPost,
  ...relationships,
};

export { posts, tagToPost, tags, users };
