import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// define custom sizes
const sizes = {
  sm: defineStyle({
    maxW: "45ch",
  }),
  md: defineStyle({
    maxW: "container.sm",
  }),
  lg: defineStyle({
    maxW: "container.lg",
    width: "100%",
  }),
};

const containerTheme = {
  sizes,
};

export default defineStyleConfig({
  ...containerTheme,
  defaultProps: {
    size: "lg",
  },
});
