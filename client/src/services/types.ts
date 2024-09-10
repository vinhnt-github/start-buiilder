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
  article_type: string;
  body_letters_count: string;
  body_updated_at: string;
  comments_count: string;
  emoji: string;
  liked_count: string;
  pinned: string;
  publication: string;
  published_at: string;
  user: Users;
  tag: Tag[];
};

export type Flag = "Yes" | "No";

export type Tag = {
  id: number;
  name: string;
  displayName: string;
  deleteFlg: Flag;
};

export type PostsDetail = any;
