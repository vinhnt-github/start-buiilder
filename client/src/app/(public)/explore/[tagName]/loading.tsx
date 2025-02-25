import SkeletonCard from "@/components/skeletonCard";
import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

// A simple loading component for Next.js using Tailwind CSS
const Loading: React.FC = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={10}>
      {Array.from(new Array(10)).map((_, index) => {
        return (
          <GridItem>
            <SkeletonCard key={index} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default Loading;
