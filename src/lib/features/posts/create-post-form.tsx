'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { getErrorMessage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  CreatePostFormValues,
  CreatePostSchema,
} from '../../../resolvers/create-post-form.resolver';
import { useAppDispatch } from '@/lib/hooks';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { createPost } from './posts.slice';
import { useToastContext } from '../../../contexts/toast.context';
import ErrorMessage from '@/components/auth/error-message';
import SuccessMessage from '@/components/auth/success-message';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Delete, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGetTags } from '../tags/hooks';

export default function CreatePostForm() {
  const toast = useToastContext();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { tagsList, tagsError, tagsStatus } = useGetTags();
  const istagsListLoading = tagsStatus === 'pending';

  const form = useForm<CreatePostFormValues>({
    mode: 'onTouched',
    defaultValues: {
      tag: '',
      content: '',
      title: '',
      excerpt: '',
      tags: [],
    },
    resolver: zodResolver(CreatePostSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control: form.control,
  });

  const handleAddtag: () => void = async () => {
    const isValid = await form.trigger('tag');
    if (!isValid) return;

    const tagValue = form.getValues('tag');

    if (tagValue) {
      append({ name: tagValue });
      form.resetField('tag');
    } else {
      form.trigger('tag');
    }
  };
  const { isSubmitting } = form.formState;

  const handleSuccessSubmit: SubmitHandler<CreatePostFormValues> = async (
    formData
  ) => {
    setError(null);
    setSuccess(null);

    try {
      await dispatch(createPost(formData)).unwrap();
      setSuccess('Success created post');
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  const handleErrorSubmit = () => {
    if (fields.length === 0) {
      form.setError('tag', {
        type: 'custom',
        message: 'you should provide tag',
      });
    }
  };

  useEffect(() => {
    if (tagsError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: tagsError,
      });
    }
  }, [tagsError, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>
          Fill out the form to create a new blog post.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSuccessSubmit, handleErrorSubmit)}
            className="space-y-4 w-[400px]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="content..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Input placeholder="excerpt..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Shor summary of the content. Its used like a preview of the
                    post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="tagInput">tag</FormLabel>
                  <FormControl>
                    <div className="relative flex gap-1">
                      <Input
                        {...field}
                        id="tagInput"
                        list="tag-suggestions"
                        placeholder={
                          istagsListLoading
                            ? 'tag list is loading...'
                            : 'Select tag'
                        }
                        disabled={istagsListLoading}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault(); // предотвратява стандартното поведение на формата при Enter
                            handleAddtag();
                          }
                        }}
                      />
                      <datalist id="tag-suggestions">
                        {tagsList.map((tag) => (
                          <option value={tag.name} key={tag.id} />
                        ))}
                      </datalist>
                      <Button
                        type="button"
                        onClick={handleAddtag}
                        variant="outline"
                      >
                        <Plus width={20} height={20} className="mr-2" />
                        Add tag
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add at least one tag. You can also press Enter instead of
                    the Add tag button
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {fields.map((field, index) => (
                <Badge
                  key={field.id}
                  className="mr-2 py-2 flex items-center gap-2"
                  variant="outline"
                >
                  {field.name}
                  <Delete
                    onClick={() => remove(index)}
                    width={20}
                    height={20}
                    className="cursor-pointer text-destructive"
                  />
                </Badge>
              ))}
            </div>
            <SuccessMessage message={success} />
            <ErrorMessage message={error} />
            <Button
              type="submit"
              disabled={isSubmitting || istagsListLoading}
              className="bg-[#4070F4] w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className=""></CardFooter>
    </Card>
  );
}
