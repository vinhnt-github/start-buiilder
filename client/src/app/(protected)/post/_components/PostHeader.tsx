"use client";

import React from "react";
import { Button, Switch, Center, Text, Box, FormLabel } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import RouteBack from "@/components/RouteBack";
import { useFormContext } from "react-hook-form";
import { POST_STATUS } from "@/lib/constants";

type Props = {};

function PostHeader(props: Props) {
  const { register, setValue } = useFormContext();
  return (
    <HeaderWrapper>
      <Center justifyContent={"space-between"}>
        <RouteBack />
        <Center gap={4}>
          <Center gap={2}>
            <input type="hidden" {...register("status")} />
            <Switch
              onChange={(e) => {
                const isChecked = e.target.checked;
                setValue(
                  "status",
                  isChecked ? POST_STATUS.published : POST_STATUS.draft
                );
              }}
              colorScheme=""
              size={"lg"}
            />
            <FormLabel>Public</FormLabel>
          </Center>
          <Button variant={"primary"} type="submit">
            Save
          </Button>
        </Center>
      </Center>
    </HeaderWrapper>
  );
}

export default PostHeader;
