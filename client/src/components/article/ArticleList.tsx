import { FetchResponse } from "@/services";
import { Article } from "@/services/types";
import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";
import ArticleItem from "./ArticleItem";

type Props = {
  data: Promise<FetchResponse<Article[]>>;
  children: (d: Article) => ReactNode;
};

export default async function ArticleList({ data, children }: Props) {
  const articles = (await data).data;
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={10}>
      {articles?.map((article, index) => {
        return (
          <GridItem key={index}>
            <ArticleItem {...article} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
