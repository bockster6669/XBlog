import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';
import { CreatePostSchema } from '../../../../resolvers/create-post-form.resolver';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const body = await request.json();

  const validFields = CreatePostSchema.safeParse(body);

  if (!validFields.success)
    return NextResponse.json({ error: 'Not valid fields' }, { status: 400 });

  const { content, title, category: categoryName } = validFields.data;

  const category = await db.category.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  });

  try {
    await db.post.create({
      data: {
        title,
        content,
        category: {
          connect: { id: category.id },
        },
        author: {
          connect: { email: session.user.email },
        },
      },
    });
    return NextResponse.json({ success: 'Post created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error accured while creating a post' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const skip = Number(searchParams.get('skip')) || 0;
  const take = Number(searchParams.get('take')) || 10;

  try {
    const totalPosts = await db.post.count();
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

export type GetPostsResponse = Awaited<
  ReturnType<typeof GET>
> extends NextResponse<infer T>
  ? T
  : never;
export type PostPostsResponse = Awaited<
  ReturnType<typeof POST>
> extends NextResponse<infer T>
  ? T
  : never;
