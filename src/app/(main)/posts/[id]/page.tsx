'use client';

import React from 'react';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import CommentForm from '@/components/posts/id/comment/CommentForm';
import CommentsList from '@/components/posts/id/comment/CommentsList';
import { useSession } from 'next-auth/react';
import { useAddCommentMutation } from '@/lib/features/comments/comment.slice';
import { useParams } from 'next/navigation';
import { useGetPostQuery } from '@/lib/features/posts/posts.slice';
// import { createComment } from '@/lib/actions/comment.actions';


export default function Page() {
  const params: { id: string } = useParams();
  const session = useSession();
  const [addComment] = useAddCommentMutation();
  const { data, isLoading } = useGetPostQuery(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!data) {
    return <div>Post not found...</div>
  }
  const post = data.post;

  return (
    <main className="size-full mt-8 p-2">
      {
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <section className="mt-5">
            <span className=" font-bold">{post.comments.length} Comments</span>
            {session.status === 'loading' ? (
              <div>Loading...</div>
            ) : session.data?.user ? (
              <CommentForm
                handleSubmit={async (value) => {
                  return addComment({ content: value, postId: post.id });
                }}
              />
            ) : (
              <div>You can not leave comment before signing in</div>
            )}

            <CommentsList comments={post.comments} postId={post.id} />
          </section>
        </div>
      }
    </main>
  );
}
