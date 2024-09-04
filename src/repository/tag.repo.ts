import { db } from '@/prisma/db';
import { Prisma, Tag } from '@prisma/client';

export class TagRepo {
  static async findMany<T extends Prisma.TagFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.TagFindManyArgs>
  ): Promise<Array<Prisma.TagGetPayload<T>>> {
    return await db.tag.findMany(args);
  }

  static async upsert<T extends Prisma.TagUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.TagUpsertArgs>
  ): Promise<Tag> {
    return await db.tag.upsert(args);
  }
}
