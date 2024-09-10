import { pgEnum } from 'drizzle-orm/pg-core';

export const PostTypeEnum = pgEnum('PostType', ['ARTICLE', 'SCRIPT']);
export const FlagEnum = pgEnum('Flag', ['Y', 'N']);
export const PostStatusEnum = pgEnum('status', [
  'DRAFT',
  'PUBLISHED',
  'DELETED',
]);
