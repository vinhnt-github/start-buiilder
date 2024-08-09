"use client";

import theme, { colorMode } from "@/lib/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={{ ...theme, initialColorMode: "dark" }}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
