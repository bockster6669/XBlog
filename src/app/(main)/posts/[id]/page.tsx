import React from 'react';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import {
  CompleteComment,
} from '@/components/posts/id/CompleteComment';

import { Comment as TComment } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PostRepo } from '@/repository/post.repo';
import NewComment from '@/components/posts/id/NewComment';

const fetchPost = async (params: { id: string }) => {
  let post;

  try {
    post = await PostRepo.findUnique({
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

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await fetchPost(params);
  const session = await getServerSession(authOptions);

  if (!post) {
    return <div>Post does not exist</div>;
  }

  if ('error' in post) {
    return <div>Something went wrong while getting post: {post.error}</div>;
  }

  const parseDate = (dateString: string) => new Date(dateString);

  const sortedComments = post.comments.sort((a: TComment, b: TComment) => {
    return (
      parseDate(b.createdAt.toISOString()).getTime() -
      parseDate(a.createdAt.toISOString()).getTime()
    );
  });

  return (
    <main className="size-full mt-8 p-2">
      {
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <section className="mt-5">
            <span className=" font-bold">{post.comments.length} Comments</span>
            {session && session.user ? (
             <NewComment image={session.user.image} name={session.user.name}/>
            ) : (
              <div>You can not leave comment before signing in</div>
            )}

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
