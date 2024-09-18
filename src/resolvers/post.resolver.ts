import { z } from 'zod';
export const GETPostsSchema = z.object({
  search: z.string().optional().optional(),
  orderBy: z
    .object({
      createdAt: z.enum(['desc', 'asc']),
    })
    .optional(),
  take: z.number().max(100).optional(),
});
