import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';
import { z } from 'zod';
import { db } from '@/prisma/db';
import { getErrorMessage } from '@/lib/utils';

const validationSchema = z.object({
  commentId: z.string(),
});

// използвай транзакции, защото ако comment.likes update фейлне, но
// лайкването на коментара в таблицата commentDisLikes е било успешно
// то тогава ще се води че юсера е лайкнал коментара, но всъщност
// лайковете на коментара няма да бъдат увеличени
export async function POST(req: NextRequest) {
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

  const isThisDisLikeExists = await db.commentDisLike.findUnique({
    where: {
      authorId_commentId: {
        authorId: session.user.sub,
        commentId,
      },
    },
  });

  if (isThisDisLikeExists) {
    return NextResponse.json(
      { error: 'Can not dislike a comment more than once' },
      { status: 500 } // 500 Internal Server Error
    );
  }

  try {
    await db.commentDisLike.create({
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
    await db.comment.update({
      where: { id: commentId },
      data: {
        totalDisLikes: {
          increment: 1,
        },
        totalLikes: {
          decrement: 1,
        },
      },
    });
    return NextResponse.json(
      { message: 'Comment liked successfully' },
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
    await db.commentDisLike.delete({
      where: {
        authorId_commentId: {
          authorId: session.user.sub,
          commentId,
        },
      },
    });
    return NextResponse.json(
      { message: 'Comment liked successfully' },
      { status: 200 } // 200 OK
    );
  } catch (error) {
    console.error(error);
    const message = getErrorMessage(error);
    return NextResponse.json(
      { error: 'Unable to dislike comment: ' + message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
