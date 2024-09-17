import { NextRequest, NextResponse } from 'next/server';
import { CreatePostSchema } from '../../../resolvers/forms/create-post-form.resolver';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { PostRepo } from '@/repository/post.repo';
import { TagRepo } from '@/repository/tag.repo';
import { getErrorMessage } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { GETPostsSchema } from '@/resolvers/post.resolver';

const fromSearchParamsToObj = (params: URLSearchParams) => {
  const search = params.get('search') || undefined;
  const take = params.get('take')
    ? parseInt(params.get('take') as string, 10)
    : undefined;
  const orderByStr = params.get('orderBy');

  let orderBy: Prisma.PostOrderByWithRelationInput | undefined = undefined;

  if (orderByStr) {
    orderBy = JSON.parse(orderByStr);
  }

  return {
    where: {
      title: {
        search,
      },
    },
    take,
    orderBy,
  };
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const query = fromSearchParamsToObj(searchParams);

  if (!query) {
    return NextResponse.json(
      { error: 'You have to provide query searchParams' },
      { status: 401 }
    );
  }

  const validatedFields = GETPostsSchema.safeParse(query);
  
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return NextResponse.json(
      { error: 'Search params was not in valid format' },
      { status: 401 }
    );
  }

  try {
    const posts = await PostRepo.findMany({
      include: {
        author: true,
        tags: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
      ...validatedFields.data,
    });
    return NextResponse.json(posts, { status: 200 }); // 200 OK
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

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: 'User is not authenticated or session is invalid' },
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
