import { Flex } from "@chakra-ui/react";
import HeaderWrapper from "./HeaderWrapper";
import Logo from "./Logo";
import MenuLink from "./MenuLink";
import ToggleTheme from "./ToggleTheme";
import UserStatus from "./UserStatus";

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
