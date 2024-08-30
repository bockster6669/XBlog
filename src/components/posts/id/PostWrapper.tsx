import { PostWithAutorAndComments } from '@/app/(main)/posts/[id]/page';
import Link from 'next/link';
import React from 'react';
import { Comment } from './Comment';

type PostWrapperProps = {
  post: Exclude<PostWithAutorAndComments, null | string>;
};

export default function PostWrapper({ post }: PostWrapperProps) {
  return (
    <div>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>

        <p className="leading-7 [&:not(:first-child)]:mt-6">{post.content}</p>

        <div className="text-sm text-muted-foreground mt-5">
          Posted by
          <Link href={`/user/${post.author.id}`} className="underline">
            {post.author.username}
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <span className="text-xl text-muted-foreground">Comments</span>
        <div className='space-y-4 mt-5'>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
