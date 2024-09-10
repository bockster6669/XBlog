import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z.string().trim().min(1, 'Content cannot be empty or only spaces'),
  postId: z.string().min(1, 'postId cannot be empty or only spaces'),
});

export const UpdateCommentSchema = z.object({
  data: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Content cannot be empty or only spaces')
      .optional(),
    likes: z
      .number()
      .optional()
      .refine((val) => val === 1, {
        message: 'Comment can not be updated with more than one like',
      }),
    disLikes: z
      .number()
      .optional()
      .refine((val) => val === 1, {
        message: 'Comment can not be updated with more than one disLike',
      }),
  }),
});
