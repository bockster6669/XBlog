import React from 'react';
import { db } from '../../../../../prisma/db';
import { Post, User } from '@prisma/client';
import Link from 'next/link';
import PostWrapper from '@/components/posts/id/PostWrapper';
import { getErrorMessage } from '@/lib/utils';

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export type PostWithAutorAndComments =
  | string
  | (Post & {
      author: User;
    })
  | null;

const fetchPost = async (params: Params) => {
  let post;
  try {
    post = await db.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
    return post;
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
};

export default async function page({ params }: Props) {
  const post = await fetchPost(params);

  if (!post) {
    return <div>Post doens not exists</div>;
  }

  if ('error' in post) {
    return <div>Something went wrong while getting post: {post.error}</div>;
  }

  return (
    <main className="size-full mt-8 ">
      {post ? (
        (() => {
          return <PostWrapper post={post} />;
        })()
      ) : (
        <div>Post not found</div>
      )}
    </main>
  );
}
