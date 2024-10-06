import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z.string().trim().min(1, 'Content cannot be empty or only spaces'),
  postId: z.string().min(1, 'postId cannot be empty or only spaces'),
});

const likesSchema = z.union([
  z.object({
    increment: z
      .number()
      .optional()
      .refine((val) => val === 1, {
        message: 'Like increment value must be exactly 1',
      }),
  }),
  z.object({
    decrement: z
      .number()
      .optional()
      .refine((val) => val === 1, {
        message: 'Like decrement value must be exactly 1',
      }),
  }),
]);

const disLikesSchema = z.union([
  z.object({
    increment: z
      .number()
      .optional()
      .refine((val) => val === 1, {
        message: 'Dislike increment value must be exactly 1',
      })
      .superRefine((data, ctx) => {}),
  }),
  z.object({
    decrement: z
      .number()
      .optional()
      .refine((val) => val === 1, {
        message: 'Dislike decrement value must be exactly 1',
      }),
  }),
]);

export const UpdateCommentSchema = z.object({
  content: z.string().trim().min(1, 'Content cannot be empty or only spaces'),
});
// z.object({
//   data: z.object({
//     likes: likesSchema,
//   }),
// }),
// z.object({
//   data: z.object({
//     disLikes: disLikesSchema,
//   }),
// }),
