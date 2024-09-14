import { z } from 'zod';

export const SecuritySchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});
export type SecurityValues = z.infer<typeof SecuritySchema>;
