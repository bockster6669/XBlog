import { NextRequest, NextResponse } from 'next/server';
import { CreatePostSchema } from '../../../resolvers/create-post-form.resolver';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { PostRepo } from '@/repository/post.repo';
import { TagRepo } from '@/repository/tag.repo';
import { formatSearchQuery, getErrorMessage, wait } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchInputParam = searchParams.get('search');
  const paramsParam = searchParams.get('params');

  let orderByParam = searchParams.get('orderBy') as
    | 'asc'
    | 'desc'
  const formattedQuery = formatSearchQuery(searchInputParam);
  console.log('searchInputParam=',searchInputParam)
  console.log('searchInputParam type=',typeof searchInputParam)
  console.log('orderByParam=',orderByParam)
  console.log('orderByParam type=',typeof orderByParam)

  try {
    const posts = await PostRepo.findMany({
      where: {
        title: {
          search: formattedQuery,
        },
      },
      include: {
        author: true,
        tags: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: orderByParam ?? undefined,
      },
    });
    return NextResponse.json(posts, { status: 200 }); // 200 OK
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error occurred while fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts: ' + message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'User authentication required' },
      { status: 401 }
    ); // 401 Unauthorized
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
    // Прехвърляне на логиката за добавяне на тагове и създаване на пост в един try блок
    const tagIds = await Promise.all(
      tags.map(async (tag) => {
        const upsertedTag = await TagRepo.upsert({
          where: { name: tag.name },
          update: {},
          create: { name: tag.name },
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
          connect: { email: session.user.email },
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
