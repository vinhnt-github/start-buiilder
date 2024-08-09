import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ColorModeScript } from "@chakra-ui/react";
import theme, { colorMode } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Start builder",
  description: "Generated by create next app",
};

if (process.env.NEXT_PUBLIC_ENABLE_MSW === "true") {
  require("../mocks/index");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={colorMode.initialColorMode} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
