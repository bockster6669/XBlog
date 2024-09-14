import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z
    .union([z.boolean(), z.string()])
    .transform((val) => {
      let res = false;
      if (typeof val === 'string') {
        res = val.toLowerCase() === 'true';
      }
      return res;
    })
    .default(false),
});

export type SignInFormSchemaValues = z.infer<typeof SignInFormSchema>;
