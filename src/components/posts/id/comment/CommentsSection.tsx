'use client';

import React from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '@/lib/features/comments/comment.slice';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/shared/Spinner';
import ErrorMessage from '@/components/auth/error-message';
export default function CommentsSection({ postId }: { postId: string }) {
  const session = useSession();
  const [addComment] = useAddCommentMutation();
  const { isLoading, data } = useGetCommentsQuery(postId);

  const renderCommentsForm = () => {
    if (session.status === 'loading') {
      return <div>Loading...</div>;
    } else if (session.data?.user) {
      return (
        <CommentForm
          className="mt-5"
          handleSubmit={async (value) => {
            return addComment({ content: value, postId: postId });
          }}
        />
      );
    } else {
      return <ErrorMessage message='You can not leave a comment before signing in'/>;
    }
  };

  return (
    <section className="mt-5">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <span className="font-semibold">{`${data?.commentsCount} Comments`}</span>
          {renderCommentsForm()}
          {data?.comments && <CommentsList postId={postId} comments={data.comments} />}
        </>
      )}
    </section>
  );
}
