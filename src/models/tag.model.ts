import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export class TagModel {
  static async findMany() {
    return await db.tag.findMany();
  }

  static async upsert(obj: Prisma.TagUpsertArgs) {
    return await db.tag.upsert(obj);
  }
}
