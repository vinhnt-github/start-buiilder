"use client";

import { Tag } from "@/services/types";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  FocusLock,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import {} from "cmdk";
import Articletag from "../article/Articletag";
type Props = {
  options: Tag[];
  defaultValue?: number[];
  onChangeTagSelected?: (tagsSlected: Tag[]) => void;
};

export default function TagPicker({
  options = [],
  defaultValue,
  ...props
}: Props) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [tagSelected, setTagSlected] = useState<Tag[]>([]);
  const commandRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTagSlected(options.filter((t) => defaultValue?.includes(t.id)) || []);
  }, [defaultValue, options]);

  const toggleOption = (currentTag: Tag) => {
    const _tagSelected = [...tagSelected];
    const currentIndex = _tagSelected.findIndex((t) => t.id === currentTag.id);
    if (currentIndex > -1) {
      _tagSelected.splice(currentIndex, 1);
    } else _tagSelected.push(currentTag);
    setTagSlected(_tagSelected);
    props.onChangeTagSelected?.(_tagSelected);
  };

  const handleUnSelectTag = (currentTag: Tag) => {
    const _tagSelected = [...tagSelected];
    const currentIndex = _tagSelected.findIndex((t) => t.id === currentTag.id);
    if (currentIndex > -1) {
      _tagSelected.splice(currentIndex, 1);
    } else _tagSelected.push(currentTag);
    setTagSlected(_tagSelected);
    props.onChangeTagSelected?.(_tagSelected);
  };

  return (
    <Center gap={4} justifyContent={"flex-start"} flexDirection={"row-reverse"}>
      <Popover
        isOpen={isOpen}
        initialFocusRef={commandRef}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent p={3} style={{ width: "fit-content" }}>
          <PopoverBody>
            <Command label="Command Menu">
              <FocusLock persistentFocus={true}>
                <CommandInput ref={commandRef} />
              </FocusLock>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((tag) => {
                    const isActive = tagSelected?.some((t) => t.id === tag.id);
                    return (
                      <CommandItem
                        key={tag.id}
                        onSelect={() => toggleOption(tag)}
                      >
                        <Center width={"100%"} gap={3}>
                          <CheckIcon
                            width={"20px"}
                            opacity={isActive ? "1" : 0}
                          />
                          <Box flex={"1"}>{tag.displayName ?? tag.name}</Box>
                          <Circle size={"3"} bg={"red"}></Circle>
                        </Center>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>

                <CommandItem>Apple</CommandItem>
              </CommandList>
            </Command>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Wrap my={4} justify={"flex-end"}>
        {tagSelected.map((t) => (
          <Articletag key={t.id} tag={t} onRemoveTag={handleUnSelectTag} />
        ))}
      </Wrap>
    </Center>
  );
}
