import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  language: z.string(),
  bio: z.string()
});
export type PersonalInfoValues = z.infer<typeof PersonalInfoSchema>;
