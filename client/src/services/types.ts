export type PostStatus = "DRAFT" | "PUBLISHED" | "DELETED";

export type Users = {
  id: number;
  email: string;
  username: string;
  givenName: string;
  familyName: string;
  avatar?: string;
  description?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  articleType: string;
  bodyLettersCount: string;
  bodyUpdatedAt: string;
  commentsCount: string;
  emoji: string;
  likedCount: string;
  pinned: string;
  publication: string;
  publishedAt: string;
  createAt: string;
  createdBy: Users;
  tags: Tag[];
  authorId: number;
  bodyHtml: string;
};

export type Flag = "Yes" | "No";

export type Tag = {
  id: number;
  name: string;
  displayName: string;
  deleteFlg: Flag;
  color: string;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  bodyMarkdown: string;
  bodyHtml: string;
  status: PostStatus;
  tags: Tag[];
  createdBy: Users;
  emoji?: string;
  pinned?: boolean;
  publishedAt?: Date | null;
};
