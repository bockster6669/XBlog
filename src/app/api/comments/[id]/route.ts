import { getErrorMessage, wait } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';
import { UserRepo } from '@/repository/user.repo';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;
  try {
    const replies = await CommentRepo.findMany({
      where: {
        parentId: commentId,
      },
      include: {
        author: true,
        replies: true,
      },
    });
    return NextResponse.json({ replies }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const parentId = params.id;
  const body = await req.json();
  const { content, postId } = body;

  try {
    const trimContent = content.trim();
    if (!trimContent) {
      return NextResponse.json(
        {
          error: 'Can not create comment with empty text',
        },
        { status: 400 }
      );
    }
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email)
      return NextResponse.json(
        {
          error:
            'User tried to create post, but its corresponding session was not found',
        },
        { status: 401 }
      );

    const user = await UserRepo.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log(
        'User tried to create post, but its corresponding profile was not found'
      );
      return NextResponse.json(
        {
          error:
            'User tried to create post, but its corresponding profile was not found',
        },
        { status: 404 }
      );
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
    return NextResponse.json(
      {
        newReply,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;
  const body = await req.json();

  try {
    const newComment = await CommentRepo.update({
      where: {
        id: commentId,
      },
      data: body.data,
    });
    return NextResponse.json({ newComment }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;
  try {
    const deletedComment = await CommentRepo.delete({
      where: {
        id: commentId,
      },
    });
    console.log('deleted')
    return NextResponse.json({ deletedComment }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
