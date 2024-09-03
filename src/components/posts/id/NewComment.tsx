import {
  Comment,
  CommentAvatar,
  CommentContent,
  CommentDescription,
} from '@/components/shared/comment/Comment';
import React from 'react';
import { EnterNewCommentButton } from './CompleteComment';

export default function NewComment() {
  return (
    <Comment isInEditMode={true} className="mt-4">
      <CommentAvatar userImg="" username="bobo" />
      <CommentContent>
        <CommentDescription className="border-b border-slate-500 focus:border-blue-500" />
        <div className="flex">
          <EnterNewCommentButton />
        </div>
      </CommentContent>
    </Comment>
  );
}
