import { FetchResponse, fetcher } from "..";
import { Tag } from "../types";

const getAllTag = async (): Promise<FetchResponse<Tag[]>> => {
  return await fetcher("/tag");
};

export { getAllTag };
