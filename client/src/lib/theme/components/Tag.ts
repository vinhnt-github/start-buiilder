import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const primary = definePartsStyle({
  container: {
    py: 1,
    border: "1px solid transparent",
    bg: "linear-gradient(rgb(59 33 33), rgb(0 0 0)) padding-box, linear-gradient(135.87deg, rgb(138 71 71) 15.01%, rgb(26 104 152) 46.96%, rgb(62, 65, 230) 74.56%) border-box border-box",
    color: "blue.500",
    fontSize: "sm",
  },
});

const baseStyle = definePartsStyle({});

const tagTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    primary,
  },
  defaultProps: {
    variant: "primary",
  },
});

export default tagTheme;
