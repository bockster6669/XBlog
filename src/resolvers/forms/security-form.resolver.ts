import { z } from 'zod';

export const SecuritySchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'New password and confirm password must match',
  path: ['confirmPassword'],
});
export type SecurityValues = z.infer<typeof SecuritySchema>;
