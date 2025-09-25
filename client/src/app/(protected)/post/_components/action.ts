"use server";

import { ERRORS } from "@/lib/constants";
import { transformFieldError } from "@/lib/fns";
import { FetchErr } from "@/services";
import { postNewArticle, putEditArticleBySlug } from "@/services/article";
import { postPreview } from "@/services/markdown/preview";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { postSchema } from "./schema";
import {
  FormSate,
  POST_ACTION,
  PreviewSate,
  handleError,
  handleSuccess,
} from "./state";
export async function createPostAction(
  prevState: FormSate,
  formData: FormData
) {
  try {
    const payload = postSchema.parse(Object.fromEntries(formData));
    const isEdit = prevState.action === POST_ACTION.EDIT;
    let response: unknown;
    if (isEdit) {
      if (!payload.id) return handleError(prevState, { ...ERRORS[500] });
      response = await putEditArticleBySlug({
        ...payload,
      });
      revalidateTag(`post-${payload.slug}-detail`);
    } else {
      response = await postNewArticle({ ...payload });
    }
    return handleSuccess(
      { ...prevState, ...payload },
      `Article was ${isEdit ? "updated" : "created"} successfully`
    );
  } catch (err) {
    if (err instanceof FetchErr) {
      // Handle error get from BE
      return handleError(prevState, {
        message: err.message,
        status: err.statusCode,
        fieldErrors: err.fieldErrors,
      });
    }

    if (err instanceof z.ZodError) {
      // Handle Zod validation errors in Front-end
      return handleError(prevState, {
        ...ERRORS[400],
        fieldErrors: transformFieldError(err),
      });
    }

    return handleError(prevState, {
      ...ERRORS[500],
    });
  }
}

export async function previewPostAction(
  previewState: PreviewSate,
  markdownContent: string
) {
  try {
    const { data: html } = await postPreview({ markdownContent });
    return {
      ...previewState,
      html,
    };
  } catch (err) {
    return {
      ...previewState,
      error: "Failed to preview the post",
    };
  }
}
