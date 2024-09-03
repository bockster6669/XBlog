import { z } from "zod";

export const SignUpFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    username: z.string().min(1),
})

export type SignUpFormSchemaValues = z.infer<typeof SignUpFormSchema>;