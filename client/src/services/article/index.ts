import { fetcher } from "@/services";
import { ParseOptions } from "querystring";

export const getAllArticle = async (param?: ParseOptions) => {
  return fetcher("/post", {
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
  console.log("data", data);
};
