'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../../../prisma/db';
import { getErrorMessage, wait } from '../utils';

export const likeComment = async (id: string) => {
  try {
    await db.comment.update({
      where: {
        id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export const disLikeComment = async (id: string) => {
  try {
    await db.comment.update({
      where: {
        id,
      },
      data: {
        disLikes: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};
