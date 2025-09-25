"use client";

import HeaderWrapper from "@/components/header/HeaderWrapper";
import RouteBack from "@/components/RouteBack";
import { POST_STATUS } from "@/lib/constants";
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
  loading: boolean;
};

function PostHeader(props: Props) {
  const { register, setValue } = useFormContext();
  return (
    <HeaderWrapper>
      <Flex
        py={2}
        px={4}
        position="sticky"
        top={0}
        zIndex={1}
        bg={useColorModeValue("white", "gray.800")}
        borderBottomWidth="1px"
        justify="space-between"
        align="center"
      >
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
            {props.loading ? "Saving" : "Save"}
          </Button>
        </Center>
      </Flex>
    </HeaderWrapper>
  );
}

export default PostHeader;
