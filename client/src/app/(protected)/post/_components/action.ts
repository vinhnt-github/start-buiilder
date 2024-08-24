"use server";

import { z } from "zod";
import { postNewArticle, putEditArticleBySlug } from "@/services/article";
import { PostPayload, postSchema } from "./schema";
import { FormSate, POST_ACTION, handleError, handleSuccess } from "./state";
import { transformFieldError } from "@/lib/fns";
import { ERRORS } from "@/lib/constants";
import { FetchErr } from "@/services";
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
    } else {
      response = await postNewArticle({ ...payload });
    }
    if (response instanceof FetchErr) {
      return handleError(prevState, {
        message: response.message,
        status: response.statusCode,
      });
    }
    return handleSuccess(
      prevState,
      `Article was ${isEdit ? "updated" : "created"} successfully`
    );
  } catch (err) {
    if (err instanceof FetchErr) {
      handleError(prevState, {
        message: err.message,
        status: err.statusCode,
      });
    }

    if (err instanceof z.ZodError) {
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
