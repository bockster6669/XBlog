import { NextRequest, NextResponse } from 'next/server';
import { CreatePostSchema } from '../../../resolvers/create-post-form.resolver';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { PostRepo } from '@/repository/post.repo';
import { TagRepo } from '@/repository/tag.repo';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const body = await request.json();

  const validFields = CreatePostSchema.safeParse(body);

  if (!validFields.success)
    return NextResponse.json({ error: 'Not valid fields' }, { status: 400 });

  const { title, content, excerpt, tags } = validFields.data;

  let tagIds = null;
  try {
    tagIds = await Promise.all(
      tags.map(async (tag) => {
        const upsertedTag = await await TagRepo.upsert({
          where: { name: tag.name },
          update: {},
          create: { name: tag.name },
        });

        return upsertedTag.id;
      })
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error accured while adding tags' },
      { status: 400 }
    );
  }

  if (!tagIds) {
    return NextResponse.json(
      { error: 'Can not create post without tags tags' },
      { status: 400 }
    );
  }

  try {
    await PostRepo.create({
      data: {
        title,
        content,
        excerpt,
        tags: {
          connect: tagIds.map((id) => ({ id })), // Свързване на категориите
        },
        author: {
          connect: { email: session.user.email },
        },
      },
    });
    return NextResponse.json({ success: 'Post created' }, { status: 200 });
  } catch (error) {
    console.log('Error accured while creating a post', error);
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
    const totalPosts = await PostRepo.countPosts();
    const posts = await PostRepo.findMany({
      skip,
      take,
      include: {
        tags: true,
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
