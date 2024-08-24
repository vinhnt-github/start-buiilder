"use client";

import React from "react";
import { format, isDate } from "date-fns";
import { Text } from "@chakra-ui/react";
import { getDistanceTimeToNow } from "@/lib/date-time";

type Props = {
  date: string;
};

export default function TimeDistance({ date }: Props) {
  return <Text variant={"description"}>{getDistanceTimeToNow(date)}</Text>;
}
