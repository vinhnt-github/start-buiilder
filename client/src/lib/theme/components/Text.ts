import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
  // The styles all Text have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
    },
    md: {
      fontSize: "md",
    },
  },
  // Two variants: outline and solid
  variants: {
    description: {
      color: "text.description",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
  },
});

export default Text;
