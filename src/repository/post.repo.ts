import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';
export class PostRepo {
  static async findMany<T extends Prisma.PostFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.PostFindManyArgs>
  ): Promise<Array<Prisma.PostGetPayload<T>>> {
    return await db.post.findMany(args);
  }

  static async findUnique<T extends Prisma.PostFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostFindUniqueArgs>
  ): Promise<Prisma.PostGetPayload<T> | null> {
    return await db.post.findUnique(args);
  }

  static async create<T extends Prisma.PostCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostCreateArgs>
  ): Promise<Prisma.PostGetPayload<T>> {
    return await db.post.create(args);
  }

  static async countPosts() {
    return await db.post.count();
  }
}
