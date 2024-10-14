import { Prisma } from "@prisma/client";

export type PostWithAuthorAndTags = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        username: true;
        email: true;
      };
    };
    tags: true;
  };
}>;
