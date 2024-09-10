import { FetchResponse, fetcher } from "..";
import { Users } from "../types";

export const findUserByEmail = (email: string) => {
  return fetcher(`/user?email=${email}`, {
    method: "GET",
  });
};

type NewUserPost = Partial<Pick<Users, "email" | "givenName" | "familyName">>;
type PostNewUserResponse = FetchResponse<Users>;

export const postNewUser = (
  data: NewUserPost
): Promise<PostNewUserResponse> => {
  return fetcher(`/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};
