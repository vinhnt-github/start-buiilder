import { FetchResponse, fetcher } from "..";
import { Tag } from "../types";

const getAllTag = async (): Promise<FetchResponse<Tag[]>> => {
  return fetcher("/api/tags");
};

export { getAllTag };
