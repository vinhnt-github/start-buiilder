import ArticleItem from "@/components/article/ArticleItem";
import ArticleList from "@/components/article/ArticleList";
import { getAllArticle } from "@/services/article";
import React from "react";

async function Home() {
  const articleResponse = await getAllArticle();
  return (
    <div>
      <ArticleList articles={articleResponse.data}>
        {(article) => <ArticleItem {...article} />}
      </ArticleList>
    </div>
  );
}

export default Home;
