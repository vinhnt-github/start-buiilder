import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const Switch = defineStyle({
  baseStyle: {
    track: {
      _checked: {
        background: "background.bgGradient",
      },
    },
  },
});
export default Switch;
