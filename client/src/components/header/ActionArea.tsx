"use client";

import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Session, User } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {
  user: User;
};

export default function ActionArea({ user }: Props) {
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton>
          <Avatar size={"sm"} name={user.name || "User"} />
        </MenuButton>
        <MenuList>
          <MenuItem>Dashboard</MenuItem>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
