import { Tag } from "@/services/types";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  options: Tag[];
  defaultValue?: Tag[];
};

export default function TagPicker({ options, defaultValue }: Props) {
  const [tagSelected, setTagSlected] = useState<Tag[]>();
  return (
    <Menu>
      <MenuButton as={Button}>
        {defaultValue?.length ? `${defaultValue?.length} tags` : "0 tag"}
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}
