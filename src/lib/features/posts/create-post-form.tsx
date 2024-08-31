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
} from '../../../../resolvers/create-post-form.resolver';
import { useAppDispatch } from '@/lib/hooks';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { createPost } from './posts.slice';
import { useToastContext } from '../../../../contexts/toast.context';
import { useGetCategories } from '../categories/hooks';
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

type Category = { name: string };

export default function CreatePostForm() {
  const toast = useToastContext();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { categoryList, categoriesError, categoriesStatus } =
    useGetCategories();
  const isCategoryListLoading = categoriesStatus === 'pending';

  const form = useForm<CreatePostFormValues>({
    mode: 'onTouched',
    defaultValues: {
      category: '',
      content: '',
      title: '',
      excerpt: '',
      categories: [],
    },
    resolver: zodResolver(CreatePostSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'categories',
    control: form.control,
  });

  const handleAddCategory = () => {
    const categoryValue = form.getValues('category');

    if (categoryValue) {
      append({ name: categoryValue });
      form.resetField('category');
    } else {
      form.trigger('category');
    }
  };
  const { isSubmitting } = form.formState;
  console.log(form.formState);

  const handleSubmit: SubmitHandler<CreatePostFormValues> = async (
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

  useEffect(() => {
    if (categoriesError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: categoriesError,
      });
    }
  }, [categoriesError, toast]);

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
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 w-[400px]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#4070F4]">Title</FormLabel>
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
                  <FormLabel className="text-[#4070F4]">Content</FormLabel>
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
                  <FormLabel className="text-[#4070F4]">Excerpt</FormLabel>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#4070F4]">Category</FormLabel>
                  <FormControl>
                    <div className="relative flex gap-1">
                      <Input
                        {...field}
                        list="category-suggestions"
                        placeholder={
                          isCategoryListLoading
                            ? 'Category list is loading...'
                            : 'Select category'
                        }
                        disabled={isCategoryListLoading}
                      />
                      <datalist id="category-suggestions">
                        {categoryList.map((category) => (
                          <option value={category.name} key={category.id} />
                        ))}
                      </datalist>
                      <Button type="button" onClick={handleAddCategory}>
                        <Plus />
                        Add tag
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {fields.map((field, index) => (
                <Badge
                  key={field.id}
                  className="mr-2 py-2 px-3 flex items-center gap-2"
                >
                  {field.name}
                  <Delete onClick={() => remove(index)} />
                </Badge>
              ))}
            </div>
            <SuccessMessage message={success} />
            <ErrorMessage message={error} />
            <Button
              type="submit"
              disabled={isSubmitting || isCategoryListLoading}
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
