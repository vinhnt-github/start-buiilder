import {
  ToastOptions,
  UseToastOptions,
  useToast as useToastChakra,
} from "@chakra-ui/react";
import { useCallback } from "react";

type toatArg = {
  message: string;
};

const toastDefaultOption: UseToastOptions = {
  duration: 9000,
  isClosable: true,
};

function useToast() {
  const toast = useToastChakra();

  const success = useCallback(
    ({ message }: toatArg) =>
      toast({
        ...toastDefaultOption,
        description: message,
        status: "success",
      }),
    []
  );

  const error = useCallback(
    ({ message }: toatArg) =>
      toast({
        ...toastDefaultOption,
        description: message,
        status: "error",
      }),
    []
  );
  return {
    success,
    error,
  };
}

export default useToast;
