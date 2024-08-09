import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import MenuLink from "./MenuLink";
import Logo from "./Logo";
import UserStatus from "./UserStatus";
import ToggleTheme from "./ToggleTheme";
import HeaderWrapper from "./HeaderWrapper";

export default function Header() {
  return (
    <HeaderWrapper>
      <Flex>
        <Flex width={100}>
          <Logo />
        </Flex>
        <Flex justifyContent={"end"} flex={1}>
          <MenuLink />
        </Flex>
        <Flex justifyContent={"end"} gap={3} width={200}>
          <ToggleTheme />
          <UserStatus />
        </Flex>
      </Flex>
    </HeaderWrapper>
  );
}
