import { getErrorMessage } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { UserRepo } from '@/repository/user.repo';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content, postId } = body;
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
    return NextResponse.json({ newComment }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
