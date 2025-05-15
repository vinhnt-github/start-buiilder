"server only";

import { auth } from "@/auth";

export const apiPath = (url: string) =>
  `${process.env.NEXT_PUBLIC_URL_API}${url}`;

export class FetchErr extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    ``;
    this.message = message;
    this.statusCode = statusCode;
  }
}
export class ValidationError extends Error {
  statusCode: number;
  message: string;
  fieldErrors: Record<string, string>;
  constructor(message: string, fieldErrors: Record<string, string>) {
    super(message);
    ``;
    this.statusCode = 400;
    this.message = message;
    this.fieldErrors = fieldErrors;
  }
}

export type FetchResponse<T> = {
  message: string; // A human-readable message describing the outcome.
  success: boolean; // A boolean indicating whether the operation was successful.
  statusCode: number;
  data: T; // The main payload of your response.
  meta: any; // Optional, e.g., for pagination metadata
};

const handleSuccess = async (res: Response) => {
  const result = await res.json();
  if (!res.ok) {
    throw new FetchErr(res.status, result.message);
  }
  return result;
};

const handleError = (err: unknown) => {
  if (err instanceof FetchErr) {
    if (err.statusCode === 401) {
      // Handle unauthorized error
    }
    if (err.statusCode === 400) {
      throw err;
      // Handle unauthorized error
    }
    throw err;
  }
  throw err;
};

export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<FetchResponse<T>> => {
  const session = await auth();
  const headers = {
    "x-api-user-id": session?.user?.id || "",
    ...options?.headers,
  };
  return fetch(apiPath(url), {
    ...options,
    headers,
  })
    .then(handleSuccess)
    .catch(handleError);
};
