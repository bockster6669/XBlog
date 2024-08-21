import { NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        category: true,
        author: true,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to retrieve posts' },
      { status: 500 }
    );
  }
}
