import { getAllTag } from "@/services/tag";
import PostForm from "../_components/PostForm";

export default async function NewPost() {
  const tagsResponse = await getAllTag();
  return <PostForm tags={tagsResponse.data} />;
}
