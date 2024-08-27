'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  SignUpFormSchemaValues,
  SignUpFormSchema,
} from '../../../../resolvers/sign-up-form.resolver';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios, { isAxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { PostRegisterResponse } from '@/app/api/register/route';
import { getErrorMessage } from '@/lib/utils';

type AxiosPostRegisterResponse = Exclude<
  PostRegisterResponse,
  { error: string }
>;

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<SignUpFormSchemaValues>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(SignUpFormSchema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit: SubmitHandler<SignUpFormSchemaValues> = async (
    formData
  ) => {
    setError(null);
    setSuccess(null);
    const { email, password, username } = formData;
    try {
      const { data } = await axios.post<AxiosPostRegisterResponse>(
        '/api/register',
        {
          email,
          password,
          username,
        }
      );

      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: 'http://localhost:3000/'
      });

      setSuccess('Success created user');
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err);
        setError(err.response?.data.message);
      } else {
        setError('Unsuccess registration');
      }
    }
  };

  return (
    <main className="flex">
      <Form {...form}>
        <form
          className="w-[400px] m-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4070F4]">Username</FormLabel>
                <FormControl>
                  <Input placeholder="username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {success && <div>{success}</div>}
          {error && <div>{error}</div>}
          <Button className="mt-5" disabled={isSubmitting}>
            Sign up
          </Button>
        </form>
      </Form>
    </main>
  );
}
