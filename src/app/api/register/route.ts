import { NextRequest, NextResponse } from 'next/server';
import { SignUpFormSchema } from '../../../resolvers/sign-up-form.resolver';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/models/user.model';

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
    const existsUser = await UserModel.findUser({
      email: validatedFieldsData.email,
    });

    if (existsUser) {
      return NextResponse.json(
        { message: 'This user already exists' },
        { status: 401 }
      );
    }
    const hashedPass = await bcrypt.hash(validatedFieldsData.password, 10);

    await UserModel.create({
      email: validatedFieldsData.email,
      password: hashedPass,
      username: validatedFieldsData.username,
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
