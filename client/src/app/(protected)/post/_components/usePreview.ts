import { useTransition } from "react";
import { useFormState } from "react-dom";
import { previewPostAction } from "./action";
import { PreviewSate } from "./state";

export const usePreview = () => {
  const [pending, startTransition] = useTransition();
  // Initialize with a proper state shape
  const [state, action] = useFormState<PreviewSate, string>(previewPostAction, {
    html: "",
    error: "",
  });

  return {
    previewPending: pending,
    previewState: state,
    startPreviewTransition: startTransition,
    previewAction: action,
  };
};
