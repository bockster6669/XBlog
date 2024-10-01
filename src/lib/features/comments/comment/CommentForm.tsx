'use client';

import React, { useState } from 'react';
import useAutoResizeHeight from '@/hooks/useAutoResizeHeight';
import { cn, getErrorMessage } from '@/lib/utils';
import { useToastContext } from '@/contexts/toast.context';
import Spinner from '@/components/shared/spinner/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type CommentFormProps = {
  autoFocus?: boolean;
  className?: string;
  handleCancel?: () => void;
  handleSubmit?: (value: string) => Promise<any>;
};

export default function CommentForm({
  autoFocus = false,
  handleCancel,
  handleSubmit,
  className,
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
    <form
      className={cn('flex gap-4 items-start w-full', className)}
      onSubmit={_handleSubmit}
    >
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
            disabled={loading || !value.trim()}
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <Spinner className="size-3" />
                Posting...
              </div>
            ) : (
              'Post'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
