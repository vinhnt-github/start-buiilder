import { Tag as TagProps } from "@/services/types";
import { Tag } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Articletag({ text }: TagProps) {
  return (
    <Tag>
      <Link href={"/tags/1"}>{text}</Link>
    </Tag>
  );
}
