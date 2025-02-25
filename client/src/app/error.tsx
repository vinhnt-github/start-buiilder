"use client";

import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl" mb={2}>
          {error.message}
        </Heading>
        <Text fontSize="lg" mb={6}>
          An unexpected error has occurred
        </Text>
        <Link href="/" passHref>
          <Button colorScheme="teal" size="md">
            Go to Home
          </Button>
        </Link>
        <Button onClick={reset} colorScheme="teal" size="md">
          Try Again
        </Button>
      </VStack>
    </Box>
  );
}
