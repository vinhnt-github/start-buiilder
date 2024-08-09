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

const tags = [
  { text: "js" },
  { text: "nodejs" },
  { text: "System Architecture" },
];

type Props = Article;

export default function ArticleItem(props: Props) {
  return (
    <Box>
      <Link href={"#"}>
        <Heading as={"h3"} fontSize={"2xl"} fontWeight={"600"} py={4}>
          Redis: The Silent Speedster Powering Modern Web Applications
        </Heading>
      </Link>
      <Text variant={"description"} as={Box} noOfLines={3}>
        Picture this: You're the lead developer for a rapidly growing e-commerce
        platform. Thanks to a viral marketing campaign 😜, your site's traffic
        has exploded overnight. Suddenly, you're facing a tsunami of concurrent
        users, all eager to snag limited-edition products. Your database is
        gasping for air, page load times are crawling, and you're watching
        potential sales slip away with each passing second.
      </Text>
      <Wrap my={3} spacing="5px">
        {tags.map((tag, i) => (
          <Articletag {...tag} />
        ))}
      </Wrap>
      <Center gap={2} justifyContent={"start"}>
        <Avatar size={"sm"} name="Author"></Avatar>
        <Text fontSize={"sm"}>Author</Text>
        <Text fontSize={"sm"} variant={"desciption"}>
          3 min read
        </Text>
      </Center>
    </Box>
  );
}
