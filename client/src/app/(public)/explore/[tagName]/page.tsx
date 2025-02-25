import ArticleItem from "@/components/article/ArticleItem";
import ArticleList from "@/components/article/ArticleList";
import { getArticleByTag } from "@/services/article";

async function Page({
  params,
  searchParams,
}: {
  params: { tagName: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tagName = (await params).tagName;
  const articleResponse = await getArticleByTag(tagName);
  return (
    <div>
      <ArticleList articles={articleResponse.data}>
        {(article) => <ArticleItem {...article} />}
      </ArticleList>
    </div>
  );
}

export default Page;
