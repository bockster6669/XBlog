import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
  excerpt: z.string().min(5),
  category: z
    .string()
    .regex(
      /^[a-zA-Z0-9 ]*$/,
      'Category can only contain letters (a-Z), numbers (0-9), and spaces'
    )
    .optional(),
  categories: z.array(z.object({ name: z.string() })).min(1),
});
export type CreatePostFormValues = z.infer<typeof CreatePostSchema>;
