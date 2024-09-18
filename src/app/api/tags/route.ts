import { Tag } from '@/types/tag';
import { TagRepo } from '@/repository/tag.repo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tags: Tag[] = await TagRepo.findMany();

    if (!tags) {
      return NextResponse.json(
        { error: 'No tags found in the database' },
        { status: 404 }
      );
    }

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve tags:', error);
    return NextResponse.json(
      {
        error:
          'Internal Server Error: Unable to retrieve tags. Please try again later.',
      },
      { status: 500 }
    );
  }
}
