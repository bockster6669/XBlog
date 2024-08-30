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

type PostWithAutor =
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
  let post: PostWithAutor;
  try {
    post = await fetchPost(params);
  } catch (error) {
    return <div>There was an error while geting the post</div>;
  }
  return (
    <>
      {post ? (
        (() => {
          const fullName = post.author.firstName + ' ' + post.author.lastName;

          return (
            <>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {post.title}
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {post.content}
              </p>
              <p className="text-sm text-muted-foreground">
                Posted by{' '}
                <Link href={`/user/${post.author.id}`} className=" underline">
                  {fullName}
                </Link>
              </p>
                {post.comments.map(comment => <p key={comment.id}>{comment.content}</p>)}
            </>
          );
        })()
      ) : (
        <div>Post not found</div>
      )}
    </>
  );
}
