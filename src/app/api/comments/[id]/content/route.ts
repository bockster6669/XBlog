import { getErrorMessage } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { UpdateCommentSchema } from '@/resolvers/comment.resolver';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;

  if (!commentId) {
    return NextResponse.json(
      { error: 'commentId is missing in parameters.' },
      { status: 400 } // Changed to 400 Bad Request
    );
  }

  const body = await req.json();

  const validatedFields = UpdateCommentSchema.safeParse(body);
  
  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((error) => error.message)
      .join(', ');
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 } // 400 Bad Request
    );
  }

  const { content } = validatedFields.data;

  try {
    const updatedComment = await CommentRepo.update({
      where: { id: commentId },
      data: {
        content,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error updating a comment:', message); // Log error for debugging
    return NextResponse.json(
      { error: 'Failed to update comment: ' + message },
      { status: 500 }
    );
  }
}
