'use server';

import { PostRepo } from '@/repository/post.repo';
import { getErrorMessage } from '../utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import {
  CreatePostValues,
  CreatePostSchema,
} from '@/resolvers/create-post-form.resolver';
import { TagRepo } from '@/repository/tag.repo';

export const getPost = async (id: string) => {
  try {
    return await PostRepo.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            author: true,
            replies: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    const message = getErrorMessage(error);
    return { error: message };
  }
};

export async function getPaginatedPosts(skip: number, take: number) {
  try {
    const totalPosts = await PostRepo.countPosts();
    const posts = await PostRepo.findMany({
      skip,
      take,
      include: {
        tags: true,
        author: true,
      },
    });

    return {
      posts,
      totalPosts,
    };
  } catch (error) {
    console.log(error);
    return { error: 'Failed to retrieve posts' };
  }
}

export async function getPosts() {
  try {
    const posts = await PostRepo.findMany({
      include: {
        author: true,
        tags: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: 'Can not get posts' + message };
  }
}
export async function createPost(
  body: CreatePostValues
): Promise<{ error: string } | { success: string }> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { error: 'User not found' };
  }

  const validFields = CreatePostSchema.safeParse(body);

  if (!validFields.success) {
    return { error: 'Not valid fields' };
  }

  const { title, content, excerpt, tags } = validFields.data;

  let tagIds = null;
  try {
    tagIds = await Promise.all(
      tags.map(async (tag) => {
        const upsertedTag = await TagRepo.upsert({
          where: { name: tag.name },
          update: {},
          create: { name: tag.name },
        });

        return upsertedTag.id;
      })
    );
  } catch (error) {
    return { error: 'Error occurred while adding tags' };
  }

  if (!tagIds) {
    return { error: 'Cannot create post without tags' };
  }

  try {
    await PostRepo.create({
      data: {
        title,
        content,
        excerpt,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        author: {
          connect: { email: session.user.email },
        },
      },
    });
    return { success: 'Post created' };
  } catch (error) {
    console.log('Error occurred while creating a post', error);
    return { error: 'Error occurred while creating a post' };
  }
}
