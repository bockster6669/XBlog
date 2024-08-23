import React from 'react';
import { db } from '../../../../../prisma/db';
import { Post, Prisma } from '@prisma/client';

type Params = {
  id: string;
};
type Props = {
  params: Params;
};

export default async function page({ params }: Props) {
  let post: Post | null;
  try {
    post = await db.post.findUnique({
      where: {
        id: params.id,
      },
    });
  } catch (error) {
    return <div>There was an error while geting the post</div>;
  }

  return (
    <>
      {post ? (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {post.title}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{post.content}</p>
        </>
      ) : (
        <div>Post not found</div>
      )}
    </>
  );
}
