'use client';

import React from 'react';
import CommentItem from './CommentItem';
import { Comment } from '@prisma/client';
import { CommentsListProps } from './types';

export default function CommentsList({comments, postId }: CommentsListProps) {
  const mainComments = comments.filter((comment) => !comment.parentId);

  const sortedComments = mainComments.sort((a: Comment, b: Comment) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      <div className="mt-5 space-y-6">
        {sortedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
      </div>
    </>
  );
}
