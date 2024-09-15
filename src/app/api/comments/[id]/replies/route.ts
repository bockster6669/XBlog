import { getErrorMessage } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/options';
import { UserRepo } from '@/repository/user.repo';
import { CreateCommentSchema } from '@/resolvers/comment.resolver';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'ID parameter is missing.' },
      { status: 400 }
    );
  }

  try {
    const replies = await CommentRepo.findMany({
      where: { parentId: id },
      include: {
        author: true,
        replies: true,
      },
    });
    return NextResponse.json(replies, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error while getting replies:', message);  // Log error for debugging
    return NextResponse.json(
      { error: `Error while getting replies: ${message}` },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'ID parameter is missing.' },
      { status: 400 }
    );
  }

  const body = await req.json();
  
  const validatedFields = CreateCommentSchema.safeParse(body)

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(error => error.message).join(", ");
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 } // 400 Bad Request
    );
  }
  const { content, postId } = body;

  try {
    const trimContent = content.trim();
    if (!trimContent) {
      return NextResponse.json(
        { error: 'Cannot create a comment with empty content.' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'User is not authenticated or session is invalid' },
        { status: 401 } // 401 Unauthorized
      );
    }

    const user = await UserRepo.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.warn('User profile not found for email:', session.user.email);  // Log warning for debugging
      return NextResponse.json(
        { error: 'User profile not found.' },
        { status: 404 }
      );
    }

    const newReply = await CommentRepo.create({
      data: {
        content: trimContent,
        author: { connect: { id: user.id } },
        post: { connect: { id: postId } },
        parent: { connect: { id: id } },
      },
    });

    return NextResponse.json(newReply, { status: 201 });  // 201 Created
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error while creating reply:', message);  // Log error for debugging
    return NextResponse.json(
      { error: `Error while creating reply: ${message}` },
      { status: 500 }
    );
  }
}
