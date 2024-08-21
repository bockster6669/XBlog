import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(0),
  content: z.string().min(0),
  category: z.string()
});
export type CreatePostFormValues = z.infer<typeof CreatePostSchema>;
