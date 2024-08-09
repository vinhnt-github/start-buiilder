import ArticleItem from "@/components/article/ArticleItem";
import ArticleList from "@/components/article/ArticleList";
import React from "react";

function Home() {
  return (
    <div>
      <ArticleList articles={[1, 2]}>
        {(article) => <ArticleItem {...article} />}
      </ArticleList>
    </div>
  );
}

export default Home;
