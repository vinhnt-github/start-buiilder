import { Container, VStack } from "@chakra-ui/react";
import React, { Children } from "react";

export default function HeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStack
      px={4}
      py={4}
      gap={6}
      position={"relative"}
      _after={{
        content: `''`,
        display: "block",
        position: "absolute",
        background: "background.borderGradient",
        width: "100%",
        height: "1px",
        bottom: 0,
      }}
    >
      <Container>{children}</Container>
    </VStack>
  );
}
