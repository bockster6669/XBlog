import React from 'react';
import { db } from '../../../../../prisma/db';
import { Comment, Post, User } from '@prisma/client';
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
      comments: Comment[];
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
        comments: true,
      },
    });
    return post;
  } catch (error) {
    const message = getErrorMessage(error);
    return {error: message};
  }
};

export default async function page({ params }: Props) {
  const post = await fetchPost(params);

  if(!post) {
    return <div>Post doens not exists</div>
  }

  if('error' in post) {
    return <div>Something went wrong while getting post: {post.error}</div>
  }

  console.log(post);
  return (
    <main>
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
