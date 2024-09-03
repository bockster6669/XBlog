'use server';

import { revalidatePath } from 'next/cache';
import { getErrorMessage } from '../utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { CommentModel } from '@/models/comment.model';
import { UserModel } from '@/models/user.model';

export const likeComment = async (
  id: string,
  method: 'increment' | 'decrement'
) => {
  try {
    await CommentModel.update(id, {
      likes: {
        [method]: 1,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export const disLikeComment = async (
  id: string,
  method: 'increment' | 'decrement'
) => {
  try {
    await CommentModel.update(id, {
      disLikes: {
        [method]: 1,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export const saveComment = async (id: string, content: string) => {
  try {
    await CommentModel.update(id, { content });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export const deleteComment = async (id: string) => {
  try {
    await CommentModel.delete(id);
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export async function createComment(content: string, postId: string) {
  try {
    const trimContent = content.trim();
    if (!trimContent) {
      return {
        error: 'Can not create comment with empty text',
      };
    }

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email)
      return {
        error:
          'User tried to create post, but its coresponding profile was not found',
      };

    const user = await UserModel.findUser({ email: session.user.email });

    if (!user) {
      console.log(
        'User tried to create post, but its coresponding profile was not found'
      );
      return {
        error:
          'User tried to create post, but its coresponding profile was not found',
      };
    }

    const newComment = await CommentModel.create({
      content: trimContent,
      author: {
        connect: { id: user.id },
      },
      post: {
        connect: { id: postId },
      },
    });

    console.log('Comment created:', newComment);
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${postId}`);
  }
}
