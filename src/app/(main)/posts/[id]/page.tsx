import React from 'react';
import { db } from '../../../../../prisma/db';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import NewComment from '@/components/posts/id/NewComment';
import { CompleteComment } from '@/components/posts/id/CompleteComment';
import { Comment } from '@prisma/client';

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
  const parseDate = (dateString: string) => new Date(dateString);

  const sortedComments = post.comments.sort((a:Comment, b: Comment) => {
    return parseDate(b.createdAt.toISOString()).getTime() - parseDate(a.createdAt.toISOString()).getTime();
  });
  
  return (
    <main className="size-full mt-8 p-2">
      {
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <section className="mt-5">
            <span className=" font-bold">{post.comments.length} Comments</span>
            <NewComment />
            <div className="space-y-6">
              {sortedComments.map((comment, index) => (
                <CompleteComment key={comment.id} comment={comment} />
              ))}
            </div>
          </section>
        </div>
      }
    </main>
  );
}
