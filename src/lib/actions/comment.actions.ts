'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../../../prisma/db';
import { wait } from '../utils';

export const likeComment = async (id: string) => {
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
  revalidatePath(`/posts/${id}`)
};

export const disLikeComment = async (id: string) => {
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
  revalidatePath(`/posts/${id}`)
};
