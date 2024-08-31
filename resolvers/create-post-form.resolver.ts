import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
  excerpt: z.string().min(5),
  category: z
    .string()
    .min(1, { message: 'You have to choose a category for this post' }),
  categories: z.array(z.object({ name: z.string() })).min(1),
});
export type CreatePostFormValues = z.infer<typeof CreatePostSchema>;
