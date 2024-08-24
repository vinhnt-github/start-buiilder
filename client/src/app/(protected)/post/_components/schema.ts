import { z } from "zod";

export const postSchema = z.object({
  id: z.coerce.number().optional(),
  slug: z.string(),
  title: z.string().min(5, {
    message: "Title is required.",
  }),
  "body-marklang": z.string(),
  tags: z.string(),
  status: z.string(),
});

export type PostPayload = z.infer<typeof postSchema>;
