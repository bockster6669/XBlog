'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { PersonalInfoValues } from '@/resolvers/forms/personal-info-form.resolver';
import Spinner from '@/components/shared/Spinner';
import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';
import { LANGUAGES } from '@/constants';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem, } from '../ui/command';

export default function PersonalInfoForm() {
  const { data, status } = useSession();
  const form = useForm<PersonalInfoValues>({
    defaultValues: {
      firstName: data?.user?.name ?? '',
      bio: '',
      language: 'English',
      lastName: '',
      username: '',
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
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Manage your personal information and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name ?? 'unknown user'}
            />
            <AvatarFallback>
              {user.name ? user.name[0] : 'U'}
              {user.name ? user.name[1] : 'N'}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline">Change avatar</Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'justify-between',
                          )}
                        >
                          {field.value
                            ? LANGUAGES.find(
                                (language) => language.name === field.value
                              )?.name
                            : 'Select language'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {LANGUAGES.map((language) => (
                              <CommandItem
                                value={language.name}
                                key={language.code}
                                onSelect={() => {
                                  form.setValue('language', language.name);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    language.name === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {language.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="bio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
