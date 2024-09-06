'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

type CommentFormProps = {
  autoFocus?: boolean;
  handleCancel?: () => void;
  handlePost?: (value: string) => void;
};

export default function CommentForm({
  autoFocus = false,
  handleCancel,
  handlePost,
}: CommentFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  function _handleCancel() {
    setValue('');
    if (handleCancel) {
      handleCancel();
    }
  }

  function _handlePost() {
    setValue('');
    if (handlePost) {
      handlePost(value);
    }
  }

  return (
    <div className="flex gap-4 items-start w-full">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>BC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1">
        <textarea
          ref={textareaRef}
          rows={1}
          className="resize-none overflow-hidden text-muted-foreground outline-none comment-placeholder border-b-2 border-slate-600 focus:border-blue-500"
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <Button
            className="rounded-full ml-2"
            variant="ghost"
            onClick={_handleCancel}
          >
            Cancel
          </Button>
          <Button className="rounded-full ml-2" onClick={_handlePost}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
