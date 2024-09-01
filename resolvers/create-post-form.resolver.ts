import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
  excerpt: z.string().min(5),
  tag: z
    .string()
    .max(10)
    .optional()
    .refine(
      (value) => !value || /^(?!\s*$)[a-zA-Z0-9 ]+$/.test(value),
      'tag can only contain letters (a-Z), numbers (0-9), and spaces, but cannot be empty or only spaces'
    ),

  tags: z.array(z.object({ name: z.string().min(1) })).min(1),
});
export type CreatePostFormValues = z.infer<typeof CreatePostSchema>;
