import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/prisma/db';
import { getErrorMessage } from '@/lib/utils';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const validationSchema = z.object({
  commentId: z.string(),
});

// използвай транзакции, защото ако comment.likes update фейлне, но
// лайкването на коментара в таблицата CommentLikes е било успешно
// то тогава ще се води че юсера е лайкнал коментара, но всъщност
// лайковете на коментара няма да бъдат увеличени
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('body=', body);
  const validatedFields = validationSchema.safeParse(body);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((error) => error.message)
      .join(', ');
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 } // 400 Bad Request
    );
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.sub) {
    return NextResponse.json(
      { error: 'Authentication required: Please log in to post a comment' },
      { status: 401 } // 401 Unauthorized
    );
  }
  const { commentId } = validatedFields.data;

  const isThisLikeExists = await db.commentLike.findUnique({
    where: {
      authorId_commentId: {
        authorId: session.user.sub,
        commentId,
      },
    },
  });

  if (isThisLikeExists) {
    return NextResponse.json(
      { error: 'Can not like a comment more than once' },
      { status: 500 } // 500 Internal Server Error
    );
  }

  const isPrevDisLiked = await db.commentDisLike.findUnique({
    where: {
      authorId_commentId: {
        authorId: session.user.sub,
        commentId,
      },
    },
  });

  if (isPrevDisLiked) {
    try {
      await db.commentDisLike.delete({
        where: {
          authorId_commentId: {
            authorId: session.user.sub,
            commentId,
          },
        },
      });
    } catch (error) {
      console.error(error);
      const message = getErrorMessage(error);
      return NextResponse.json(
        { error: 'Unable to delete dislike: ' + message },
        { status: 500 } // 500 Internal Server Error
      );
    }
  }

  try {
    await db.commentLike.create({
      data: {
        authorId: session.user.sub,
        commentId,
      },
    });
  } catch (error) {
    console.error(error);
    const message = getErrorMessage(error);
    return NextResponse.json(
      { error: 'Unable to like comment: ' + message },
      { status: 500 } // 500 Internal Server Error
    );
  }

  try {
    const result = await db.comment.update({
      where: { id: commentId },
      data: {
        totalLikes: { increment: 1 },
        totalDisLikes: isPrevDisLiked ? { decrement: 1 } : undefined,
      },
    });
    return NextResponse.json(
      result,
      { status: 200 } // 200 OK
    );
  } catch (error) {
    console.error(error);
    const message = getErrorMessage(error);
    return NextResponse.json(
      { error: 'Unable to update comment likes: ' + message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const validatedFields = validationSchema.safeParse(body);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((error) => error.message)
      .join(', ');
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 } // 400 Bad Request
    );
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.sub) {
    return NextResponse.json(
      { error: 'Authentication required: Please log in to post a comment' },
      { status: 401 } // 401 Unauthorized
    );
  }
  const { commentId } = validatedFields.data;

  try {
    await db.commentLike.delete({
      where: {
        authorId_commentId: {
          authorId: session.user.sub,
          commentId,
        },
      },
    });
    return NextResponse.json(
      { message: 'Comment dislike delete successfully', id: commentId },
      { status: 200 } // 200 OK
    );
  } catch (error) {
    console.error(error);
    const message = getErrorMessage(error);
    return NextResponse.json(
      { error: 'Unable to like comment: ' + message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
