import { Article } from "@/services/types";
import { Avatar, Box, Center, Heading, Text, Wrap } from "@chakra-ui/react";
import Link from "next/link";
import Articletag from "./Articletag";
import TimeDistance from "./TimeDistance";

type Props = Article;

export default function ArticleItem({ title, tags, slug, ...article }: Props) {
  return (
    <Box>
      <Link href={`/article/${slug}`}>
        <Heading as={"h3"} fontSize={"2xl"} fontWeight={"600"} py={4}>
          {title}
        </Heading>
      </Link>
      <Wrap my={3} spacing="5px">
        {tags?.map((t, i) => (
          <Articletag key={t.id} tag={t} />
        ))}
      </Wrap>
      <Center gap={2} justifyContent={"start"}>
        <Avatar size={"sm"} name="Author"></Avatar>
        <Text fontSize={"sm"}>Author</Text>
        <TimeDistance date={article.publishedAt} />
      </Center>
    </Box>
  );
}
