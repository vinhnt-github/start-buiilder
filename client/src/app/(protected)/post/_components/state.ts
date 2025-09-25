import { POST_STATUS } from "@/lib/constants";
import { FormError, FormStatusEnum, InitialFormState } from "@/lib/type/state";
import { Post } from "@/services/types";
import { PostPayload } from "./schema";

export enum POST_ACTION {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export type FormSate = InitialFormState & PostPayload & { action: string };

export const initialFormState = (initForm?: Partial<Post>): FormSate => ({
  id: initForm?.id,
  formStatus: FormStatusEnum.INIT,
  title: initForm?.title || "",
  slug: initForm?.slug || "",
  tags: initForm?.tags?.map((t) => t.id).join(",") || "",
  status: initForm?.status || POST_STATUS.draft,
  bodyMarkdown: initForm?.bodyMarkdown || "",
  error: null,
  message: "", // only exits when action success
  updatedAt: "",
  action: initForm?.slug ? POST_ACTION.EDIT : POST_ACTION.CREATE,
});

export const handleError = (prevState: FormSate, error: FormError) => ({
  ...prevState,
  updatedAt: Date.now().toString(),
  formStatus: FormStatusEnum.ERROR,
  error,
});

export const handleSuccess = (prevState: FormSate, message: string) => ({
  ...prevState,
  updatedAt: Date.now().toString(),
  formStatus: FormStatusEnum.SUCCESS,
  message,
});

export type PreviewSate = {
  html: string;
  error: string;
};
