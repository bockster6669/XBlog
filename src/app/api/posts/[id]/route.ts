import { getErrorMessage, wait } from '@/lib/utils';
import { PostRepo } from '@/repository/post.repo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;
  if (!postId) {
    return NextResponse.json(
      { error: 'Missing parameter: Post ID is required' },
      { status: 400 }
    );
  }

  try {
    const post = await PostRepo.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            email: true,
            username: true
          }
        },
        tags: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 } // 404 Not Found
      );
    }

    return NextResponse.json(post, { status: 200 }); // 200 OK
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error fetching the post:', message); 
    return NextResponse.json(
      { error: 'Internal server error: ' + message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
