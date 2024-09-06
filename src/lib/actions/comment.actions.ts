'use server';

import { revalidatePath } from 'next/cache';
import { getErrorMessage } from '../utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { CommentRepo } from '@/repository/comment.repo';
import { UserRepo } from '@/repository/user.repo';

export const likeComment = async (
  id: string,
  method: 'increment' | 'decrement'
) => {
  try {
    await CommentRepo.update({
      where: {
        id,
      },
      data: {
        likes: {
          [method]: 1,
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

export const disLikeComment = async (
  id: string,
  method: 'increment' | 'decrement'
) => {
  try {
    await CommentRepo.update({
      where: {
        id,
      },
      data: {
        disLikes: {
          [method]: 1,
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

export const saveComment = async (id: string, content: string) => {
  try {
    await CommentRepo.update({
      where: { id },
      data: { content },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export const deleteComment = async (id: string) => {
  try {
    await CommentRepo.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${id}`);
  }
};

export async function createReplyOnComment(
  parentId: string,
  postId: string,
  content: string
) {
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

    const user = await UserRepo.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log(
        'User tried to create post, but its coresponding profile was not found'
      );
      return {
        error:
          'User tried to create post, but its coresponding profile was not found',
      };
    }

    const newReply = await CommentRepo.create({
      data: {
        content: trimContent,
        author: {
          connect: { id: user.id },
        },
        post: {
          connect: { id: postId },
        },
        parent: {
          connect: {
            id: parentId,
          },
        },
      },
    });

    console.log('Comment created:', newReply);
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  } finally {
    revalidatePath(`/posts/${postId}`);
  }
}

export async function getCommentReplys(commentId: string) {
  try {
    const replies = await CommentRepo.findMany({
      where: {
        parentId: commentId,
      },
      include: {
        author: true,
        replies: true
      }
    });
    return replies;
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
}

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

    const user = await UserRepo.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log(
        'User tried to create post, but its coresponding profile was not found'
      );
      return {
        error:
          'User tried to create post, but its coresponding profile was not found',
      };
    }

    const newComment = await CommentRepo.create({
      data: {
        content: trimContent,
        author: {
          connect: { id: user.id },
        },
        post: {
          connect: { id: postId },
        },
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
