import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
  category: z.string(),
});
export type CreatePostFormValues = z.infer<typeof CreatePostSchema>;
