import { z } from 'zod';
export const GETPostsSchema = z.object({
  where: z.object({
    title: z.object({
      search: z.string().optional(),
    }),
  }),
  orderBy: z
    .object({
      createdAt: z.enum(['desc', 'asc']),
    })
    .optional(),
  take: z.number().max(100).optional(),
});
