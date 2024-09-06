'use server';

import { PostRepo } from '@/repository/post.repo';
import { getErrorMessage } from '../utils';

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
            replies: true
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
