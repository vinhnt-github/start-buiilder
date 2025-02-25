import { Article } from "@/services/types";
import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";
import ArticleItemSkeleton from "./ArticleItemSkeleton";

type Props = {
  articles: Article[];
  children: (d: Article) => ReactNode;
};

export default function ArticleListSkeleton() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={10}>
      {Array.from(new Array(10)).map((_, index) => {
        return (
          <GridItem>
            <ArticleItemSkeleton key={index} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
