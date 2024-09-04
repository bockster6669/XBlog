import React from 'react';
import {
  Comment,
  CommentContent,
  CommentDescription,
} from '@/components/shared/comment/Comment';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { EnterNewCommentButton } from './CompleteComment';

type NewComment = {
  image: string | null | undefined,
  name: string | null | undefined,
  handleCancel?: any
}

export default function NewComment({image, name}:NewComment) {
  return (
    <Comment isInEditMode={true} className="mt-4">
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage
            src={image || '/profile-not-found.jfif'}
            alt={`profile image of ${name}`}
          />
          <AvatarFallback>
            {name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CommentContent>
          <CommentDescription className="border-b border-slate-500 focus:border-blue-500" />
          <div className="flex">
            <EnterNewCommentButton />
          </div>
        </CommentContent>
      </div>
    </Comment>
  );
}
