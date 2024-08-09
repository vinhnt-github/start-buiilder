// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { ColorModeScriptProps, extendTheme } from "@chakra-ui/react";
import * as components from "./components";

const theme = extendTheme({
  useSystemColorMode: false,
  components: {
    ...components,
  },
  semanticTokens: {
    colors: {
      text: {
        description: "gray.500",
      },
      background: {
        bgGradient:
          "linear-gradient(90deg, rgb(11 0 253 / 42%) .7%, rgb(0 185 253 / 44%) 48.28%, rgb(253 0 0 / 60%) 100.01%)",
        borderGradient: {
          default:
            "linear-gradient(90deg, rgba(0, 162, 253, 0) .7%, rgba(0, 162, 253, .48) 48.28%, rgba(0, 162, 253, 0) 100.01%);",
        },
      },
    },
  },
});

export const colorMode: ColorModeScriptProps = {
  initialColorMode: "dark",
};

export default theme;
