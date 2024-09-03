import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export class UserModel {
  static async findUser(where: Prisma.UserWhereUniqueInput) {
    return await db.user.findUnique({
      where,
    });
  }

  static async create(data: Prisma.UserCreateInput) {
    return await db.user.create({
      data,
    });
  }
}
