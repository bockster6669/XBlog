'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Button } from '../../../ui/button';
import useAutoResizeHeight from '@/hooks/useAutoResizeHeight';
import { getErrorMessage } from '@/lib/utils';
import { useToastContext } from '@/contexts/toast.context';

type CommentFormProps = {
  autoFocus?: boolean;
  handleCancel?: () => void;
  handleSubmit?: (value: string) => Promise<any>;
};

export default function CommentForm({
  autoFocus = false,
  handleCancel,
  handleSubmit,
}: CommentFormProps) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useAutoResizeHeight(value);
  const toast = useToastContext();

  function _handleCancel() {
    setValue('');
    if (handleCancel) {
      handleCancel();
    }
  }

  async function _handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!value.trim()) {
      return toast({
        variant: 'destructive',
        title: 'Empty input',
        description:
          'Please be sure to input actual text when writing a comment',
      });
    }

    if (handleSubmit) {
      setLoading(true);

      try {
        await handleSubmit(value);
      } catch (error) {
        const message = getErrorMessage(error);
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: message,
        });
      }

      setLoading(false);
      setValue('');
    }
  }

  return (
    <form className="flex gap-4 items-start w-full" onSubmit={_handleSubmit}>
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <Button
            className="rounded-full ml-2"
            variant="ghost"
            onClick={_handleCancel}
            disabled={loading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="rounded-full ml-2"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}{' '}
          </Button>
        </div>
      </div>
    </form>
  );
}
