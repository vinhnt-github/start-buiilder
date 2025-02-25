import ArticleItem from "@/components/article/ArticleItem";
import ArticleList from "@/components/article/ArticleList";
import ArticleListSkeleton from "@/components/article/ArticleListSkeleton";
import { getAllArticle } from "@/services/article";
import { Suspense } from "react";

async function Page() {
  return (
    <div>
      <h1>Article List</h1>
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList data={getAllArticle()}>
          {(article) => <ArticleItem {...article} />}
        </ArticleList>
      </Suspense>
    </div>
  );
}

export default Page;
