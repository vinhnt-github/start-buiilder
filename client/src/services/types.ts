export type PostStatus = "DRAFT" | "PUBLISHED" | "DELETED";

export type User = {
  id: string;
  name: string;
  username: string;
  vatar_small_url: string;
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
  user: User;
};

export type Flag = "Yes" | "No";

export type Tag = {
  id: number;
  name: string;
  displayName: string;
  taggingsCount: number;
  color: string;
  image: string;
  description: string;
  deleteFlg: Flag;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};
