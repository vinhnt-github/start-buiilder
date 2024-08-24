import React from "react";
import PostHeader from "../_components/PostHeader";
import PostForm from "../_components/PostForm";
import { getAllTag } from "@/services/tag";

export default async function NewPost() {
  const tagsResponse = await getAllTag();
  return <PostForm tags={tagsResponse.data} />;
}
