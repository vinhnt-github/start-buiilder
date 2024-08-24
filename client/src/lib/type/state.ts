export enum FormStatusEnum {
  INIT,
  SUCCESS,
  ERROR,
}

export type FieldErrors = Record<string, { message: string }>;

export type FormError = {
  message: string;
  status: number;
  fieldErrors?: FieldErrors;
};

export type InitialFormState = {
  formStatus: FormStatusEnum;
  message: string;
  updatedAt: string;
  error: FormError | null;
};
