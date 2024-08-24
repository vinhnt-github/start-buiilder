import { ZodError } from "zod";
import { FieldErrors } from "./type/state";

export const transformFieldError = (err: ZodError): FieldErrors => {
  return Object.fromEntries(
    err.errors.map(({ path, message }) => [path[0], { message }])
  );
};
