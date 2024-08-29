'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import {
  SignInFormSchemaValues,
  SignInFormSchema,
} from '../../../../resolvers/sign-in-form.resolver';
export const dynamic = 'force-dynamic'

export default function SignInPage() {
  const { data, status } = useSession();
  const form = useForm<SignInFormSchemaValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(SignInFormSchema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit: SubmitHandler<SignInFormSchemaValues> = (formData) => {
    signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-[400px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4070F4]">Email</FormLabel>
                <FormControl>
                  <Input placeholder="email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4070F4]">Password</FormLabel>
                <FormControl>
                  <Input placeholder="password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting}>Log in</Button>
        </form>
      </Form>
    </>
  );
}
