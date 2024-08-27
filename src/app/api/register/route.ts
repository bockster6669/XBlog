import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/db';
import { SignUpFormSchema } from '../../../../resolvers/sign-up-form.resolver';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedFields = SignUpFormSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json(
      { message: 'invalid credentials' },
      { status: 401 }
    );
  }

  const validatedFieldsData = validatedFields.data;

  try {
    console.log({validatedFieldsData})
    const existsUser = await db.user.findUnique({
      where: {
        email: validatedFieldsData.email,
      },
    });
    console.log('rpodylvi')
    if (existsUser) {
      return NextResponse.json(
        { message: 'This user already exists' },
        { status: 401 }
      );
    }
    const hashedPass = await bcrypt.hash(validatedFieldsData.password, 10);
    console.log({
        email: validatedFieldsData.email,
        password: hashedPass,
        username: validatedFieldsData.username,
    })

    await db.user.create({
      data: {
        email: validatedFieldsData.email,
        password: hashedPass,
        username: validatedFieldsData.username,
      },
    });

    return NextResponse.json({ message: 'Success login' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error accured while creating user' },
      { status: 500 }
    );
  }
}

export type PostRegisterResponse = Awaited<
  ReturnType<typeof POST>
> extends NextResponse<infer T>
  ? T
  : never;
