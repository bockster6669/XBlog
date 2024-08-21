import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const skip = Number(searchParams.get('skip')) || 0;
  const take = Number(searchParams.get('take')) || 10;

  try {
    const totalPosts = await db.post.count();
    console.log({ totalPosts });
    const posts = await db.post.findMany({
      skip,
      take,
      include: {
        category: true,
        author: true,
      },
    });

    return NextResponse.json(
      {
        posts,
        totalPosts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to retrieve posts' },
      { status: 500 }
    );
  }
}
// export type GetPostsResponse = Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never;
