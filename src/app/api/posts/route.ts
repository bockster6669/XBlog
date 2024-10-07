import { NextRequest, NextResponse } from 'next/server';
import { PostRepo } from '@/repository/post.repo';
import { getErrorMessage, validateSchema } from '@/lib/utils';
import { GETPostsSchema } from '@/resolvers/post.resolver';
import { TagRepo } from '@/repository/tag.repo';
import { CreatePostSchema } from '@/resolvers/forms/create-post-form.resolver';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search') || undefined;
  const take = searchParams.get('take')
    ? parseInt(searchParams.get('take') as string, 10)
    : undefined;
  const orderBy = searchParams.get('orderBy')
    ? JSON.parse(searchParams.get('orderBy') as string)
    : undefined;

  const query = {
    search,
    take,
    orderBy,
  };

  const validatedFields = validateSchema(GETPostsSchema, query);

  if ('error' in validatedFields) {
    return NextResponse.json(
      { error: validatedFields.error },
      { status: 400 } // 400 Bad Request
    );
  }

  try {
    const posts = await PostRepo.findMany({
      where: search
        ? {
            title: {
              search,
            },
          }
        : undefined,
      take,
      orderBy,
      include: {
        author: {
          select: {
            username: true,
          },
        },
        tags: true,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error occurred while fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts: ' + message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.sub) {
    return NextResponse.json(
      { error: 'Authentication required: Please log in to create a post' },
      { status: 401 } // 401 Unauthorized
    );
  }

  const body = await request.json();

  const validatedFields = CreatePostSchema.safeParse(body);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((error) => error.message)
      .join(', ');
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 } // 400 Bad Request
    );
  }

  const { title, content, excerpt, tags } = validatedFields.data;

  try {
    const tagIds = await Promise.all(
      tags.map(async (tag) => {
        const upsertedTag = await TagRepo.upsert({
          where: { name: tag.name },
          update: { popularity: { increment: 1 } },
          create: { name: tag.name, popularity: 1 },
        });

        return upsertedTag.id;
      })
    );

    if (!tagIds || tagIds.length === 0) {
      return NextResponse.json(
        { error: 'Cannot create post without tags' },
        { status: 400 } // 400 Bad Request
      );
    }

    const newPost = await PostRepo.create({
      data: {
        title,
        content,
        excerpt,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        author: {
          connect: { id: session.user.sub },
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error occurred while processing the request:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing the request' },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
