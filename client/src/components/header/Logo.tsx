import { Center, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Center>
      <Link href={"/"}>
        <Text size={"md"} color={"red"}>
          Starter
        </Text>
      </Link>
    </Center>
  );
}
