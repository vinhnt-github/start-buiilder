import { Article } from "@/services/types";
import { Grid, GridItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  articles: Article[];
  children: (d: Article) => ReactNode;
};

export default function ArticleList({ articles, children }: Props) {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={10}>
      {articles?.map((article, index) => {
        return <GridItem key={index}>{children(article)}</GridItem>;
      })}
    </Grid>
  );
}
