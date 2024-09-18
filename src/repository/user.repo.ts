import { db } from '@/prisma/db';
import { Prisma, User } from '@prisma/client';

export class UserRepo {
  static async findUnique<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ): Promise<Prisma.UserGetPayload<T> | null> {
    return await db.user.findUnique(args);
  }

  static async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ): Promise<Prisma.UserGetPayload<T>> {
    return await db.user.update(args);
  }

  static async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
  ): Promise<Prisma.UserGetPayload<T>> {
    return await db.user.create(args);
  }

  static async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ): Promise<Prisma.UserGetPayload<T>> {
    return await db.user.delete(args);
  }
}
