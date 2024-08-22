import {NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';


export async function GET(
  request: NextRequest,
  response: NextResponse
) {
  try {
    const category = await db.category.findMany();
    return NextResponse.json({ category }, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error accured while getting categorys'},
      { status: 400 }
    );
  }
}
export type GetCategorysResponse = Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never;
