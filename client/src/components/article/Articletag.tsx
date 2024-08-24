"use client";

import { Tag as TagProps } from "@/services/types";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Center, Tag } from "@chakra-ui/react";
import Link from "next/link";
import React, {
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactEventHandler,
} from "react";
import styles from "./styles.module.css";

type Props = {
  onRemoveTag?: (currentTag: TagProps) => void;
  tag: TagProps;
};

export default function Articletag({ tag, onRemoveTag, ...props }: Props) {
  const handleRemoveTag = (event: MouseEvent<HTMLButtonElement>) => {
    onRemoveTag?.(tag);
    event.preventDefault();
  };
  return (
    <Tag
      as={Center}
      className={styles.tag}
      pr={onRemoveTag && "15px"}
      position={"relative"}
    >
      {onRemoveTag ? (
        <>
          {tag.displayName}
          <Button
            display={"flex"}
            justifyItems={"center"}
            alignItems={"center"}
            as={"button"}
            onClick={handleRemoveTag}
            className={styles.closeBtn}
          >
            <CloseIcon width={"6px"} />
          </Button>
        </>
      ) : (
        <Link href={"/tags/1"} className={styles.content}>
          {tag.displayName}
        </Link>
      )}
    </Tag>
  );
}
