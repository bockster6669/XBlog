import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';
import { CreatePostSchema } from '../../../../resolvers/create-post-form.resolver';

export async function POST(request: NextRequest, response: NextResponse) {
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
          connect: { id: 2 },
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
