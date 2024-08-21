import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get('skip') || '0', 10);
  const take = parseInt(searchParams.get('take') || '10', 10);

  try {
    // Get the total count of posts
    const totalPosts = await db.post.count();

    // Fetch the posts with pagination
    const posts = await db.post.findMany({
      skip: skip,
      take: take,
      include: {
        category: true,
        author: true,
      },
    });

    // Return the posts along with pagination info
    return NextResponse.json({
      posts: posts,
      totalPosts: totalPosts,
      currentPage: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(totalPosts / take),
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to retrieve posts' },
      { status: 500 }
    );
  }
}
