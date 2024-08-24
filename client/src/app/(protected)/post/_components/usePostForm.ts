import { createPostAction } from "./action";
import {
  RefObject,
  useActionState,
  useEffect,
  useRef,
  useTransition,
} from "react";
import { useFormState } from "react-dom";
import { initialFormState } from "./state";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostPayload, postSchema } from "./schema";
import useToast from "@/lib/hooks/useToast";
import { redirect } from "next/navigation";

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
    //handle validate from client
    if (formErrors.title) {
      toast.error({ message: formErrors.title.message as string });
    }
  }, [form, formErrors]);

  useEffect(() => {
    //handle when call api success
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
