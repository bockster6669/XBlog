import React from 'react';
import { db } from '../../../../../prisma/db';
import { Comment, Post, User } from '@prisma/client';
import Link from 'next/link';
import PostWrapper from '@/components/post/[id]/PostWrapper';

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export type PostWithAutorAndComments =
  | (Post & {
      author: User;
      comments: Comment[]
    })
  | null;


const fetchPost = async (params: Params) => {
  return await db.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: true,
      comments: true
    },
  });
};

export default async function page({ params }: Props) {
  let post: PostWithAutorAndComments;
  try {
    post = await fetchPost(params);
  } catch (error) {
    return <div>There was an error while geting the post</div>;
  }
  return (
    <>
      {post ? (
        (() => {
          return (
           <PostWrapper post={post}/>
          );
        })()
      ) : (
        <div>Post not found</div>
      )}
    </>
  );
}
