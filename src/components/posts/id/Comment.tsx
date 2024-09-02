'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  deleteComment,
  disLikeComment,
  likeComment,
  saveComment,
} from '@/lib/actions/comment.actions';
import { User, type Comment } from '@prisma/client';
import { formatDistance } from 'date-fns';
import {
  EllipsisVertical,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from 'lucide-react';
import { useToastContext } from '../../../../contexts/toast.context';
import { startTransition, useOptimistic, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type CommentProps = Comment & {
  author: User;
};

export default function Comment({ comment }: { comment: CommentProps }) {
  const toast = useToastContext();
  const [isContentEditable, setIsContentEditable] = useState(false);
  const contentFieldRef = useRef<HTMLParagraphElement | null>(null);
  const creationDate = formatDistance(comment.createdAt, new Date(), {
    addSuffix: true,
  });
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    comment.likes,
    (state, newLike: number) => (state! += newLike)
  );
  const [optimisticDisLikes, addOptimisticDisLike] = useOptimistic(
    comment.disLikes,
    (state, disLike: number) => (state! += disLike)
  );

  const handleLike = async () => {
    startTransition(() => {
      addOptimisticLike(1);
    });
    const result = await likeComment(comment.id);
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  const handleDisLike = async () => {
    startTransition(() => {
      addOptimisticDisLike(1);
    });
    const result = await disLikeComment(comment.id);
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  const setCursorToEnd = (element: HTMLParagraphElement) => {
    const range = document.createRange();
    const selection = window.getSelection();

    if (selection && element) {
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleEdit = () => {
    setIsContentEditable(true);
    setTimeout(() => {
      if (contentFieldRef.current) {
        contentFieldRef.current.focus();
        setCursorToEnd(contentFieldRef.current);
      }
    }, 0);
  };

  const handleDelete = async () => {
    const result = await deleteComment(comment.id);
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  const handleCancel = () => {
    setIsContentEditable(false);
  };

  const handleSave = async () => {
    setIsContentEditable(false);
    if (!contentFieldRef.current?.textContent) return;
    const result = await saveComment(
      comment.id,
      contentFieldRef.current.textContent
    );
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage
          src="/placeholder-user.jpg"
          alt={`profile image of ${comment.author.username}`}
        />
        <AvatarFallback>
          {comment.author.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{comment.author.username}</div>
          <div className="text-xs text-muted-foreground">{creationDate}</div>
        </div>
        <p
          suppressContentEditableWarning={true} // Избягва предупреждения на React за contentEditable
          className={cn(
            'text-muted-foreground max-h-16 overflow-y-auto outline-none',
            {
              ' border-blue-500 border-b-2': isContentEditable,
            }
          )}
          tabIndex={0}
          contentEditable={isContentEditable}
          ref={contentFieldRef}
        >
          {comment.content}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleLike}>
            <ThumbsUp className="size-4 text-emerald-500" />
            <span className="ml-2 text-sm text-muted-foreground">
              {optimisticLikes}
            </span>
          </Button>
          <Button variant="ghost" onClick={handleDisLike}>
            <ThumbsDown className="size-4 text-destructive" />
            <span className="ml-2 text-sm text-muted-foreground">
              {optimisticDisLikes}
            </span>
          </Button>
          <Button variant="ghost">
            <span>Answer</span>
          </Button>
          {isContentEditable && (
            <>
              <Button
                className="ml-auto"
                size="sm"
                variant="secondary"
                onClick={handleCancel}
              >
                <span>Cancel</span>
              </Button>
              <Button className="mx-1" size="sm" onClick={handleSave}>
                <span>Save</span>
              </Button>
            </>
          )}
        </div>
      </div>
      {!isContentEditable && (
        <DropdownMenu>
          <DropdownMenuTrigger className="my-auto">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
