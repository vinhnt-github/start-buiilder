"use client";

import usePostForm from "@/app/(protected)/post/_components/usePostForm";
import { Editor } from "@/components/editor/Editor";
import TagPicker from "@/components/tag-picker/TagPicker";
import { Post, Tag } from "@/services/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";
import PostHeader from "./PostHeader";
import Preview from "./Preview";
import { usePreview } from "./usePreview";

type Props = {
  tags: Tag[];
  postData?: Post;
};

export default function PostForm({ tags, postData }: Props) {
  const [isPreview, setIsPreview] = useState(false);
  const {
    form,
    formErrors,
    pending,
    formRef,
    formState,
    startFormTransition,
    formAction,
  } = usePostForm({ postData });

  const {
    previewPending,
    previewState,
    startPreviewTransition,
    previewAction,
  } = usePreview();

  const editorChange = (value: string) => {
    console.log("value", value);
    form.setValue("bodyMarkdown", value);
  };

  const handleTagChange = useCallback(
    (tagsSelected: Tag[]) => {
      form.setValue("tags", tagsSelected.map(({ id }) => id).join(","));
    },
    [form]
  );

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
        <input type="hidden" {...form.register("bodyMarkdown")} />
        <input type="hidden" {...form.register("tags")} />
        <input type="hidden" {...form.register("slug")} />
        <input type="hidden" {...form.register("id")} />
        <PostHeader loading={pending} />
        <Container>
          <Box mt={4}>
            <FormControl isInvalid={Boolean(formErrors.title)}>
              <Input
                {...form.register("title")}
                placeholder="Enter post title!"
                isInvalid={Boolean(formErrors.title)}
              ></Input>
              <FormErrorMessage>{formErrors.title?.message}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box my={4}>
            <TagPicker
              options={tags}
              defaultValue={formState["tags"]?.split(",") ?? []}
              onChangeTagSelected={handleTagChange}
            />
          </Box>
          <Box position="relative">
            <Tabs
              index={isPreview ? 1 : 0}
              onChange={(index) => {
                if (index === 1) {
                  startPreviewTransition(async () => {
                    await previewAction(form.getValues("bodyMarkdown"));
                  });
                }
                setIsPreview(index === 1);
              }}
              size="sm"
              variant="soft-rounded"
              position="relative"
            >
              <TabList
                position="absolute"
                right={0}
                top={0}
                zIndex={1}
                background="gray.100"
                borderRadius="full"
                width="fit-content"
              >
                <Tab borderRadius="full">
                  <ViewOffIcon />
                </Tab>
                <Tab borderRadius="full">
                  <ViewIcon />
                </Tab>
              </TabList>
              <TabPanels mt={12}>
                <TabPanel p={0}>
                  <Editor
                    value={formState["bodyMarkdown"]}
                    onChange={editorChange}
                  />
                </TabPanel>
                <TabPanel p={0}>
                  <Preview htmlContent={previewState.html} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </form>
    </FormProvider>
  );
}
