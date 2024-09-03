import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export class CommentModel {
  static async update(id: string, data: Prisma.CommentUpdateInput) {
    return await db.comment.update({
      where: {
        id,
      },
      data,
    });
  }

  static async delete(id: string) {
    return await db.comment.delete({
      where: {
        id,
      },
    });
  }

  static async create(data: Prisma.CommentCreateInput) {
    return await db.comment.create({
      data,
    });
  }
}
