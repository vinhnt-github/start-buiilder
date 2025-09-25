import { getArticleBySlug } from "@/services/article";
import { getAllTag } from "@/services/tag";
import PostForm from "../../_components/PostForm";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function NewPost({ params: { slug } }: PageProps) {
  const [postResponse, tagsResponse] = await Promise.all([
    getArticleBySlug(slug),
    getAllTag(),
  ]);
  return <PostForm tags={tagsResponse.data} postData={postResponse.data} />;
}
