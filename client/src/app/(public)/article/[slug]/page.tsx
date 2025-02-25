import { getArticleBySlug } from "@/services/article";

async function Page({ params }: { params: { slug: string } }) {
  const postSlug = params.slug;
  const articleResponse = await getArticleBySlug(postSlug);
  return <div>{JSON.stringify(articleResponse)}</div>;
}

export default Page;
