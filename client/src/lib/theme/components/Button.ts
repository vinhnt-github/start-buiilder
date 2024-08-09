import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "20",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: "transparent",
    transition: "0.5s",
    background: "red",
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 2, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    primary: {
      background:
        "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)) padding-box padding-box, linear-gradient(135.87deg, rgb(138 71 71) 15.01%, rgb(26 104 152) 46.96%, rgb(62, 65, 230) 74.56%) border-box border-box",
      color: "white",

      _hover: {
        background:
          "linear-gradient(135.87deg, #a33110 15.01%, #00a2fd 46.96%, #3e41e6 74.56%) padding-box, linear-gradient(135.87deg, #400638 15.01%, #a21313 46.96%, #050637 74.56%) border-box",
      },
    },
    secondary: {
      background:
        "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)) padding-box padding-box, linear-gradient(135.87deg, rgb(11, 252, 165) 15.01%, rgb(0, 162, 253) 46.96%, rgb(62, 65, 230) 74.56%) border-box border-box;",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
  },
});

export default Button;
