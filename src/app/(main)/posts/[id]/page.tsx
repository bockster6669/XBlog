import React from 'react';
import { db } from '../../../../../prisma/db';
import { Post as PrismaPost, User } from '@prisma/client';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import {
  Comment,
  CommentAvatar,
  CommentContent,
  CommentDescription,
  EditModeActions,
} from '@/components/shared/comment/Comment';
import { formatDistance } from 'date-fns';
import {
  EnterNewCommentButtons,
  MyButtons,
  Reactions,
} from '../../../../components/shared/comment/my-funcs';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

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
            <Comment isInEditMode={true} className='mt-4'>
              <CommentAvatar userImg="" username="bobo" />
              <CommentContent>
                <CommentDescription />
                <div className="flex">
                  <EnterNewCommentButtons />
                </div>
              </CommentContent>
            </Comment>
            <div className="space-y-6">
              {post.comments.map((comment) => {
                const creationDate = formatDistance(
                  comment.createdAt,
                  new Date(),
                  {
                    addSuffix: true,
                  }
                );
                return (
                  <Comment key={comment.id}>
                    <CommentAvatar userImg="" username="bobo" />
                    <CommentContent>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">
                          {comment.author.username}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {creationDate}
                        </div>
                      </div>
                      <CommentDescription>{comment.content}</CommentDescription>
                      <MyButtons comment={comment} />
                    </CommentContent>
                    <EditModeActions render={Reactions} />
                  </Comment>
                );
              })}
            </div>
          </section>
        </div>
      }
    </main>
  );
}
