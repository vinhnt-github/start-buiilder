"use client";

import usePostForm from "@/app/(protected)/post/_components/usePostForm";
import { Editor } from "@/components/editor/Editor";
import TagPicker from "@/components/tag-picker/TagPicker";
import { Tag } from "@/services/types";
import { Box, Container, Input } from "@chakra-ui/react";
import React from "react";
import { FormProvider } from "react-hook-form";
import PostHeader from "./PostHeader";

type Props = {
  tags: Tag[];
};

export default function PostForm({ tags }: Props) {
  const {
    form,
    formErrors,
    pending,
    formRef,
    startFormTransition,
    formAction,
  } = usePostForm();

  const editorChange = (value: string) => {
    form.setValue("body-marklang", value);
  };

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={async (event: React.FormEvent) => {
          event.preventDefault();
          form.handleSubmit((data) => {
            startFormTransition(async () => {
              await formAction(new FormData(formRef.current!));
            });
          })(event);
        }}
      >
        <input type="hidden" {...form.register("body-marklang")} />
        <input type="hidden" {...form.register("tags")} />
        <input type="hidden" {...form.register("slug")} />
        <PostHeader loading={pending} />
        <Container>
          <Box mt={4}>
            <Input
              {...form.register("title")}
              placeholder="Enter post title!"
              isInvalid={Boolean(formErrors.title)}
            ></Input>
          </Box>
          <Box my={4}>
            <TagPicker
              options={tags}
              onChangeTagSelected={(tagsSlected) => {
                form.setValue(
                  "tags",
                  tagsSlected.map(({ id }) => id).join(",")
                );
              }}
            />
          </Box>
          <Editor value="hahahah" onChange={editorChange} />
        </Container>
      </form>
    </FormProvider>
  );
}
