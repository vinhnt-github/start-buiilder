import useToast from "@/lib/hooks/useToast";
import { Post } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { createPostAction } from "./action";
import { postSchema } from "./schema";
import { initialFormState, POST_ACTION } from "./state";

/**
 * Custom hook for managing post form state and submissions
 * @returns {Object} Form utilities and state
 * @property {UseFormReturn} form - React Hook Form instance
 * @property {Object} formState - Current form state including errors and messages
 * @property {Object} formErrors - Form validation errors
 * @property {React.RefObject<HTMLFormElement>} formRef - Reference to form element
 * @property {boolean} pending - Indicates if form submission is in progress
 * @property {Function} startFormTransition - Function to start form transition
 * @property {Function} formAction - Server action for form submission
 */

type UsePostFormProps = {
  postData?: Post;
};

const usePostForm = ({ postData }: UsePostFormProps) => {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  /** Transition state for managing UI updates during form submission */
  const [pending, startFormTransition] = useTransition();

  /** Form state management with server actions */
  const [state, formAction, isPending] = useFormState(
    createPostAction,
    initialFormState(postData)
  );
  console.log("state", state);

  const {
    error: formStateError,
    message,
    updatedAt,
    action,
    ...initialForm
  } = state;

  /** Initialize form with Zod validation */
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialForm,
  });

  /** Extract form errors from form state */
  const {
    formState: { errors: formErrors },
  } = form;

  /** Handle server-side errors */

  useEffect(() => {
    if (formStateError) {
      toast.success({ message: formStateError.message });
    }
  }, [formStateError]);

  /** Handle successful form submission */
  useEffect(() => {
    if (updatedAt && message) {
      toast.success({ message });
      if (action === POST_ACTION.CREATE) {
        redirect("/");
      }
    }
  }, [updatedAt, message, action]);

  return {
    form,
    formState: state,
    formErrors,
    formRef,
    pending,
    startFormTransition,
    formAction,
  };
};

export default usePostForm;
