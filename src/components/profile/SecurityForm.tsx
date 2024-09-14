'use client'

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '../ui/form';
import Spinner from '../shared/Spinner';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { SecurityValues } from '@/resolvers/forms/security-form.resolver';

export default function SecurityForm() {
  const { data, status } = useSession();
  const form = useForm<SecurityValues>({
    defaultValues: {
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
    },
  });

  const user = data?.user;

  if (status === 'loading') {
    return <Spinner />;
  }

  if (!data || !user) {
    return <div>Can not find your session</div>;
  }

  const onSubmit = () => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your account security settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="currentPassword" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="newPassword" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="confirmPassword" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Security Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
