"use client";

import { Circle, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Circle as={"button"} onClick={toggleColorMode}>
      {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
    </Circle>
  );
}
