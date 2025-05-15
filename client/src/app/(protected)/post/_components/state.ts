import { POST_STATUS } from "@/lib/constants";
import { FormError, FormStatusEnum, InitialFormState } from "@/lib/type/state";
import { PostPayload } from "./schema";

export enum POST_ACTION {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export type FormSate = InitialFormState & PostPayload & { action: string };

export const initialFormState = (
  initForm?: Partial<PostPayload>
): FormSate => ({
  formStatus: FormStatusEnum.INIT,
  title: "",
  slug: "",
  tags: initForm?.tags || "",
  status: initForm?.status || POST_STATUS.init,
  "body-marklang": initForm?.["body-marklang"] || "",
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
