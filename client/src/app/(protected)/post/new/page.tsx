import React from "react";
import PostHeader from "../_components/PostHeader";
import PostForm from "../_components/PostForm";
import { getAllTag } from "@/services/tag";

export default async function NewPost() {
  const tag = await getAllTag();
  return <PostForm />;
}
