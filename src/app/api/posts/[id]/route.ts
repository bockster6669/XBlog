import { getErrorMessage } from '@/lib/utils';
import { PostRepo } from '@/repository/post.repo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  if (!postId) {
    return NextResponse.json(
      { message: 'No postId was found' },
      { status: 400 }
    );
  }

  try {
    const post = await PostRepo.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        tags: true,
        comments: {
          include: {
            author: true,
            replies: true,
          },
        },
      },
    });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 200 });
  }
}
