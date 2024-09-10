import { TagRepo } from '@/repository/tag.repo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tags = await TagRepo.findMany();
    
    if (!tags || tags.length === 0) {
      return NextResponse.json(
        { message: 'No tags found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve tags:', error);
    return NextResponse.json(
      { error: 'Internal Server Error: Unable to retrieve tags.' },
      { status: 500 }
    );
  }
}
