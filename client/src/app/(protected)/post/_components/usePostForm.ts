import useToast from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { createPostAction } from "./action";
import { postSchema } from "./schema";
import { initialFormState } from "./state";

const usePostForm = () => {
  const toast = useToast();

  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startFormTransition] = useTransition();
  const [state, formAction, isPending] = useFormState(
    createPostAction,
    initialFormState()
  );
  const { error, message, updatedAt, action, ...initialForm } = state;

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialForm,
  });

  const {
    formState: { errors: formErrors },
  } = form;

  useEffect(() => {
    // Handle validation errors from the client
    if (formErrors.title) {
      toast.error({ message: formErrors.title.message as string });
    }
  }, [form, formErrors]);

  console.log("error", error);
  useEffect(() => {
    //handle API call success
    if (updatedAt && message) {
      toast.success({ message });
      if (action === "NEW") {
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
