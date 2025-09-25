import { posts } from '@/core/database/schema/post.schema';
import { tags } from '@/core/database/schema/tag.schema';
import { POST_STATUS } from '@/core/type';
import { SQL, and, eq, ilike } from 'drizzle-orm';

export class SearchConditionBuilder {
  private conditions: SQL<unknown>[] = [];

  constructor(intialCondition?: SQL<unknown>) {
    intialCondition && this.conditions.push(intialCondition);
  }

  addTitleSearch(q?: string) {
    if (q) {
      this.conditions.push(ilike(posts.title, `%${q}%`));
    }
    return this;
  }

  addAuthorFilter(author?: string) {
    if (author) {
      const authorId = Number(author);
      if (!isNaN(authorId)) {
        this.conditions.push(eq(posts.authorId, authorId));
      }
    }
    return this;
  }

  addTagFilter(tagName?: string) {
    if (tagName) {
      this.conditions.push(eq(tags.name, tagName));
    }
    return this;
  }

  addStatusFilter(status?: POST_STATUS) {
    if (status) {
      this.conditions.push(eq(posts.status, status));
    }
    return this;
  }

  build() {
    return this.conditions.length > 1
      ? and(...this.conditions)
      : this.conditions[0];
  }
}
