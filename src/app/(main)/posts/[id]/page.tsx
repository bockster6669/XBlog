import React from 'react';
import { db } from '../../../../../prisma/db';
import { Post as PrismaPost, User } from '@prisma/client';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import Comment from '../../../../components/posts/id/Comment';
import { Separator } from '@/components/ui/separator';

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export type PostWithAuthorAndComments =
  | string
  | (PrismaPost & {
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
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    const message = getErrorMessage(error);
    return { error: message };
  }
};

export default async function page({ params }: Props) {
  const post = await fetchPost(params);

  if (!post) {
    return <div>Post does not exist</div>;
  }

  if ('error' in post) {
    return <div>Something went wrong while getting post: {post.error}</div>;
  }

  return (
    <main className="size-full mt-8 p-2">
      {post ? (
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <section className="mt-5">
            <span className=' font-bold'>{post.comments.length} Comments</span>
            {/* <Comment type='new' /> */}
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div>Post not found</div>
      )}
    </main>
  );
}
