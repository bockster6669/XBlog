import { TagModel } from '@/models/tag.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const tag = await TagModel.findMany();
    return NextResponse.json({ tag }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error accured while getting tags' },
      { status: 400 }
    );
  }
}
export type GetTagsResponse = Awaited<
  ReturnType<typeof GET>
> extends NextResponse<infer T>
  ? T
  : never;
