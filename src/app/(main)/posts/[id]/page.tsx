import React from 'react';
import { db } from '../../../../../prisma/db';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import {
  EnterNewCommentButton,
  FullComment,
} from '../../../../components/shared/comment/my-funcs';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Comment, CommentAvatar, CommentContent, CommentDescription } from '@/components/shared/comment/Comment';

type Props = {
  params: {
    id: string;
  };
};

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
      {
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <section className="mt-5">
            <span className=" font-bold">{post.comments.length} Comments</span>
            <Comment isInEditMode={true} className="mt-4">
              <CommentAvatar userImg="" username="bobo" />
              <CommentContent>
                <CommentDescription className="border-b border-slate-500 focus:border-blue-500" />
                <div className="flex">
                  <EnterNewCommentButton />
                </div>
              </CommentContent>
            </Comment>
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <FullComment key={comment.id} comment={comment} />
              ))}
            </div>
          </section>
        </div>
      }
    </main>
  );
}
