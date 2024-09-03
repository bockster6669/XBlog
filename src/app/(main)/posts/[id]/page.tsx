import React from 'react';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import {
  CompleteComment,
  EnterNewCommentButton,
} from '@/components/posts/id/CompleteComment';
import {
  Comment,
  CommentContent,
  CommentDescription,
} from '@/components/shared/comment/Comment';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Prisma, Comment as TComment } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PostModel } from '@/models/post.model';
import { db } from '@/prisma/db';

type PostFindUniqueResult = Prisma.Result<
  typeof db.post,
  {
    where: {
      id: string;
    };
    include: {
      author: true;
      tags: true;
      comments: {
        include: {
          author: true;
        };
      };
    };
  },
  'findUnique'
>;

const fetchPost = async (params: { id: string }) => {
  let post: PostFindUniqueResult;
  
  try {
    post = await PostModel.findUnique({
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
              <Comment isInEditMode={true} className="mt-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage
                    src={session.user.image || '/profile-not-found.jfif'}
                    alt={`profile image of ${session.user.name}`}
                  />
                  <AvatarFallback>
                    {session.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CommentContent>
                  <CommentDescription className="border-b border-slate-500 focus:border-blue-500" />
                  <div className="flex">
                    <EnterNewCommentButton />
                  </div>
                </CommentContent>
              </Comment>
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
