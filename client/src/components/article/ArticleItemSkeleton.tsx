import { Article } from "@/services/types";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

type Props = Article;

export default function ArticleItemSkeleton({}) {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
}
