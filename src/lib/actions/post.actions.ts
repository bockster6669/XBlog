'use server';

import { db } from '../../../prisma/db';
import {
  CreatePostFormValues,
  CreatePostSchema,
} from '../../../resolvers/create-post-form.resolver';
import { wait } from '../utils';

export const serverActionGetCategorys = async () => {
  await wait(2000);
  const category = await db.category.findMany();
  return category;
};

export const serverActionCreatePost = async (
  postData: CreatePostFormValues
) => {
  const validFields = CreatePostSchema.safeParse(postData);

  if (!validFields.success) return { error: 'Not valid fields', success: null };

  const { content, title, category: categoryName } = validFields.data;

  const category = await db.category.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  });

  try {
    await db.post.create({
      data: {
        title,
        content,
        category: {
          connect: { id: category.id },
        },
        author: {
          connect: { id: 1 },
        },
      },
    });
    return { success: 'Post created', error: null };
  } catch (error) {
    console.log(error);
    return { error: 'Error accured', success: null };
  }
};
