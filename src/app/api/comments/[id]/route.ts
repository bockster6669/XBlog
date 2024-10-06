import { getErrorMessage } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.sub) {
    return NextResponse.json(
      { error: 'User is not authenticated or session is invalid' },
      { status: 401 } // 401 Unauthorized
    );
  }

  if (!commentId) {
    return NextResponse.json(
      { error: 'commentId is missing in parameters.' },
      { status: 400 } // Changed to 400 Bad Request
    );
  }
  try {
    const deletedComment = await CommentRepo.delete({
      where: {
        id: commentId,
        author: { id: session.user.sub },
      },
    });
    return NextResponse.json(deletedComment, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error deleting a comment:', message); // Log error for debugging
    return NextResponse.json(
      { error: 'Failed to delete comment: ' + message },
      { status: 500 }
    );
  }
}
