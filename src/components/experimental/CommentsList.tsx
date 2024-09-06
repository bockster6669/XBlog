'use client';

import { parseDate } from '@/lib/utils';
import React from 'react';
import CommentItem from './CommentItem';
import { Comment } from '@prisma/client';
import { CommentWithRepiesAndAuthor } from './types';

type CommentsListProps = {
  comments: CommentWithRepiesAndAuthor[];
  postId: string;
};

export default function CommentsList({ comments, postId }: CommentsListProps) {
  console.log(comments);
  const sortedComments = comments.sort((a: Comment, b: Comment) => {
    return (
      parseDate(b.createdAt.toISOString()).getTime() -
      parseDate(a.createdAt.toISOString()).getTime()
    );
  });

  return (
    <div className="mt-5 space-y-6">
      {sortedComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
}
