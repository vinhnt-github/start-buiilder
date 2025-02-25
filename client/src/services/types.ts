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
  user: Users;
  tags: Tag[];
};

export type Flag = "Yes" | "No";

export type Tag = {
  id: number;
  name: string;
  displayName: string;
  deleteFlg: Flag;
  color: string;
};

export type PostsDetail = any;
