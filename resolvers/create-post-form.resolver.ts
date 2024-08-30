import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
  category: z
    .string()
    .min(1, { message: 'You have to choose category for this post' }),
});
export type CreatePostFormValues = z.infer<typeof CreatePostSchema>;
