import Articletag from "@/components/article/ArticleTag";
import { getDistanceTimeToNow } from "@/lib/date-time";
import { getArticleBySlug } from "@/services/article";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { data: article } = await getArticleBySlug(slug);
  if (!article) {
    return <div className="text-center text-red-500">Article not found</div>;
  }

  return (
    <Container maxW="4xl" py={8}>
      {/* Hero section */}
      <Box mb={8}>
        <Heading as="h2" textAlign={"center"} size="2xl" mb={4}>
          {article.title}
        </Heading>

        {/* Tags section */}
        {article.tags && (
          <HStack spacing={2} mb={6}>
            {article.tags.map((tag) => (
              <Tag key={tag.id} color={tag.color} size="md">
                {tag.name}
              </Tag>
            ))}
          </HStack>
        )}

        <Wrap my={4} justify={"flex-end"}>
          {article.tags.map((t) => (
            <Articletag key={t.id} tag={t}></Articletag>
          ))}
        </Wrap>
      </Box>

      <Divider mb={8} />

      {/* Article content */}
      <Box
        className="prose prose-lg max-w-none"
        sx={{
          "h2, h3, h4": {
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: "1rem",
          },
          p: {
            marginBottom: "1.5rem",
          },
          "ul, ol": {
            marginBottom: "1.5rem",
            paddingLeft: "1.5rem",
          },
        }}
        dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
      />
      <Flex gap={4} mb={6} justifyContent={"end"}>
        <Text fontWeight="medium">
          <Text as="span" color="gray.500">
            Created by
          </Text>{" "}
          {article.createdBy.givenName}
        </Text>
        <Text color="gray.500">•</Text>
        <Text color="gray.500">
          {getDistanceTimeToNow(article.publishedAt)}
        </Text>
      </Flex>
    </Container>
  );
}
