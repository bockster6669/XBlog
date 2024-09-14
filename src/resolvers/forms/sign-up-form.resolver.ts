import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  username: z.string().min(1),
});

export type SignUpValues = z.infer<typeof SignUpSchema>;
