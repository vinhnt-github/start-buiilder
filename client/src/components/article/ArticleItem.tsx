import { Article } from "@/services/types";
import {
  Box,
  Wrap,
  Heading,
  Tag,
  Text,
  Flex,
  Avatar,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Articletag from "./Articletag";
import { formatDistance } from "date-fns";
import { getDistanceTimeToNow } from "@/lib/date-time";
import TimeDistance from "./TimeDistance";

type Props = Article;

export default function ArticleItem({ title, tag, ...article }: Props) {
  return (
    <Box>
      <Link href={"#"}>
        <Heading as={"h3"} fontSize={"2xl"} fontWeight={"600"} py={4}>
          {title}
        </Heading>
      </Link>
      <Text variant={"description"} as={Box} noOfLines={3}>
        aaaaaaa
      </Text>
      <Wrap my={3} spacing="5px">
        {tag?.map((t, i) => (
          <Articletag key={t.id} tag={t} />
        ))}
      </Wrap>
      <Center gap={2} justifyContent={"start"}>
        <Avatar size={"sm"} name="Author"></Avatar>
        <Text fontSize={"sm"}>Author</Text>
        <TimeDistance date={article.published_at} />
      </Center>
    </Box>
  );
}
