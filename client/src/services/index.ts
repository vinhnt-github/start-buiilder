export const apiPath = (url: string) =>
  `${process.env.NEXT_PUBLIC_URL_API}${url}`;

export class FetchErr extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export type FetchResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
};

const handleSuccess = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) {
    throw new FetchErr(res.status, data.message);
  }
  return data;
};

const handleError = (err: unknown) => {
  if (err instanceof FetchErr) {
    console.log("err", err);
  }
  throw err;
};

export const fetcher = async (url: string, options?: RequestInit) => {
  return fetch(apiPath(url), { ...options })
    .then(handleSuccess)
    .catch(handleError);
};
