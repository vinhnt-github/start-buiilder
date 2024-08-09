import Header from "@/components/header/Header";
import { Container, VStack } from "@chakra-ui/react";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <VStack py={10}>
        <Container>{children}</Container>
      </VStack>
    </>
  );
}
