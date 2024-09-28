'use client';

import React from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { Switch } from '@/components/ui/switch';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Spinner from '../shared/spinner/Spinner';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '../ui/form';
import { NotificationsValues } from '@/resolvers/forms/notifications-form.resolver';

export default function NotificationsForm() {
  const { data, status } = useSession();
  const form = useForm<NotificationsValues>({
    defaultValues: {
      notificationsEmail: '',
      notificationsPush: '',
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="notificationsEmail"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Email Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notificationsPush"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Push Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Notification Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
