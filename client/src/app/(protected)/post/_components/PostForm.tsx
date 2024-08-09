"use client";

import Articletag from "@/components/article/Articletag";
import { Editor } from "@/components/editor/Editor";
import { Box, Container, Flex, Input, Wrap } from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import PostHeader from "./PostHeader";
import TagPicker from "@/components/tag-picker/TagPicker";

export default function PostForm() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
  };
  const editorChange = (value: string) => {
    methods.setValue("body-marklang", value);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input type="hidden" {...methods.register("body-marklang")} />
        <PostHeader />
        <Container>
          <Box mt={4}>
            <Input placeholder="Enter post title!"></Input>
          </Box>
          <Flex>
            <TagPicker />
          </Flex>
          <Wrap my={4} justify={"flex-end"}>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
            <Articletag text="hahah"></Articletag>
          </Wrap>
          <Editor value="hahahah" onChange={editorChange} />
        </Container>
      </form>
    </FormProvider>
  );
}
