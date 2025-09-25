import { tagCache } from "@/lib/cache/tags";
import { fetcher } from "@/services";
import { ParseOptions } from "querystring";
import { Article, Post } from "../types";

export const getAllArticle = async (param?: ParseOptions) => {
  return fetcher<Article[]>("/post", {
    method: "GET",
  });
};

export const getArticleByTag = async (
  tagName: string,
  param?: ParseOptions
) => {
  return fetcher(`/explore/tag/${tagName}`, {
    method: "GET",
  });
};
export const postNewArticle = async (data: any) => {
  return fetcher("/post/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const putEditArticleBySlug = async (data: any) => {
  return fetcher(`/post`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getArticleBySlug = async (slug: string, param?: ParseOptions) => {
  return fetcher<Post>(`/post/${slug}`, {
    method: "GET",
    next: {
      tags: tagCache.getPostDetail(slug),
    },
  });
};
