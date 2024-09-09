'use server';

import { POST } from '@/app/api/posts/route';
import { UserRepo } from '@/repository/user.repo';
import { SignUpSchema, SignUpValues } from '@/resolvers/sign-up-form.resolver';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function registerUser(body: SignUpValues) {
  const validatedFields = SignUpSchema.safeParse(body);

  if (!validatedFields.success) {
    return {
      error: 'invalid credentials',
    };
  }

  const validatedFieldsData = validatedFields.data;

  try {
    const existsUser = await UserRepo.findUnique({
      where: {
        email: validatedFieldsData.email,
      },
    });

    if (existsUser) {
      return { error: 'This user already exists' };
    }
    const hashedPass = await bcrypt.hash(validatedFieldsData.password, 10);

    await UserRepo.create({
      data: {
        email: validatedFieldsData.email,
        password: hashedPass,
        username: validatedFieldsData.username,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Error accured while creating user' };
  }
}