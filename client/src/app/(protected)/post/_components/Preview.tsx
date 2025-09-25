import { Box } from "@chakra-ui/react";

interface PreviewProps {
  htmlContent: string;
  className?: string;
}

export default function Preview({ htmlContent, className }: PreviewProps) {
  return (
    <Box
      className={`prose dark:prose-invert max-w-none ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      bg="#282c34"
      p={4}
      borderRadius="md"
      height="500px"
      minH="500px"
      overflowY="auto"
    />
  );
}
