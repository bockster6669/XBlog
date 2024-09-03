import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

// type MyResult = Prisma.Result<
//   typeof db.post,
//   {
//     select: {
//       content: true;
//     };
//   },
//   'findMany'
// >;

export class PostModel {
  static async findMany(obj: {
    where: {
      id: string;
    };
    include: {
      author: boolean;
      tags: boolean;
      comments: {
        include: {
          author: boolean;
        };
      };
    };
  }) {
    return await db.post.findMany(obj);
  }

  static async findUnique(obj: Prisma.PostFindUniqueArgs) {
    return await db.post.findUnique(obj);
  }

  static async create(data: Prisma.PostCreateInput) {
    return await db.post.create({
      data,
    });
  }

  static async countPosts() {
    return await db.post.count();
  }

  static async getPaginatedPosts(skip: number, take: number) {
    await db.post.findMany({
      skip,
      take,
      include: {
        tags: true,
        author: true,
      },
    });
  }
}
