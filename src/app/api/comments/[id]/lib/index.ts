import { getErrorMessage } from '@/lib/utils';
import { db } from '@/prisma/db';

export async function checkIfCommentIsLiked(
  commentId: string,
  authorId: string
) {
  try {
    const data = await db.commentLike.findUnique({
      where: {
        authorId_commentId: {
          authorId,
          commentId,
        },
      },
    });
    return {
      data,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: message,
    };
  }
}

export async function checkIfCommentIsDisLiked(
  commentId: string,
  authorId: string
) {
  try {
    const data = await db.commentDisLike.findUnique({
      where: {
        authorId_commentId: {
          authorId,
          commentId,
        },
      },
    });
    return {
      data,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: message,
    };
  }
}
