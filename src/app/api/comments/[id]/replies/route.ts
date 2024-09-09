import { getErrorMessage } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/options';
import { UserRepo } from '@/repository/user.repo';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const replies = await CommentRepo.findMany({
      where: {
        parentId: id,
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
  const { id } = params;

  const body = await req.json();
  const { content, postId } = body;
  console.log({postId, id})
  try {
    const trimContent = content.trim();
    if (!trimContent) {
      return NextResponse.json(
        {
          error: 'You can not create a comment with empty content',
        },
        { status: 400 }
      );
    }
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email)
      return NextResponse.json(
        {
          error:
            'The user tried to create a comment, but the corresponding session was not found',
        },
        { status: 401 }
      );

    const user = await UserRepo.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log(
        'The user tried to create a comment, but the corresponding profile was not found'
      );
      return NextResponse.json(
        {
          error:
            'The user tried to create a comment, but the corresponding profile was not found',
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
            id: id,
          },
        },
      },
    });
    console.log('she go suzdade')

    console.log('Replie was created:', newReply);
    return NextResponse.json(
      {
        newReply,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    const message = getErrorMessage(error);
    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 }
    );
  }
}