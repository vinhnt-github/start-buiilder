"use client";

import { Flex, List, ListItem } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pages: (LinkProps & { text: string })[] = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/article",
    text: "Article",
  },
];

export default function MenuLink() {
  const pathName = usePathname();
  return (
    <List display={"flex"} gap={30}>
      {pages.map(({ text, ...props }) => (
        <ListItem
          key={props.href.toString()}
          listStyleType={"none"}
          position={"relative"}
          px={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          _after={{
            content: `''`,
            display: "block",
            position: "absolute",
            backgroundColor: "red",
            width: "100%",
            height: "1px",
            transition: "0.3s",
            opacity: pathName === props.href ? "1" : "0",
            top: "calc(100% + var(--chakra-space-4) - 1px)",
          }}
        >
          <Link {...props}>{text}</Link>
        </ListItem>
      ))}
    </List>
  );
}
