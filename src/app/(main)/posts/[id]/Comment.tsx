'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { disLikeComment, likeComment } from '@/lib/actions/comment.actions';
import { getErrorMessage } from '@/lib/utils';
import { User, type Comment } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToastContext } from '../../../../../contexts/toast.context';

type CommentProps = Comment & {
  author: User;
};

export default function Comment({ comment }: { comment: CommentProps }) {
  const toast = useToastContext();
  const creationDate = formatDistance(comment.createdAt, new Date(), {
    addSuffix: true,
  });
  const [reactionError, setReactionError] = useState<string | null>(null);

  const handleLike = async () => {
    try {
      await likeComment(comment.id);
    } catch (error) {
      setReactionError(getErrorMessage(error));
    }
  };
  const handleDisLike = async () => {
    try {
      await disLikeComment(comment.id);
    } catch (error) {
      setReactionError(getErrorMessage(error));
    }
  };

  useEffect(() => {
    console.log('use effect = ', reactionError);
    if (reactionError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: reactionError,
      });
    }
  }, [reactionError, toast]);

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
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="font-medium">{comment.author.username}</div>
          <div className="text-xs text-muted-foreground">{creationDate}</div>
        </div>
        <div className="text-muted-foreground">{comment.content}</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleLike}>
            <ThumbsUp className="size-4 text-emerald-500" />
            <span className="ml-2 text-sm text-muted-foreground">
              {comment.likes}
            </span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDisLike}>
            <ThumbsDown className="size-4 text-destructive" />
            <span className="ml-2 text-sm text-muted-foreground">
              {comment.disLikes}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
