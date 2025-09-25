import { fetcher, FetchResponse } from "..";

export const postPreview = async (
  data: any
): Promise<FetchResponse<string>> => {
  return await fetcher("/markdown/preview", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
