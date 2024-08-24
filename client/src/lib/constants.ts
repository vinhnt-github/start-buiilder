export enum POST_STATUS {
  draft = "DRAFT",
  init = "INIT",
  published = "PUBLISHED",
  deleted = "DELETED",
}

export const ERRORS = {
  400: { message: "Bad Request", status: 400 },
  401: { message: "Unauthorized", status: 401 },
  500: { message: "Internal Server Error", status: 500 },
};
