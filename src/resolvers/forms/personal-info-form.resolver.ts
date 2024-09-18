import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().trim().min(1),
  language: z.string().trim().min(1).optional(),
  bio: z.string()
});
export type PersonalInfoValues = z.infer<typeof PersonalInfoSchema>;
