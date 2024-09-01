'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { disLikeComment, likeComment } from '@/lib/actions/comment.actions';
import { User, type Comment } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useToastContext } from '../../../../../contexts/toast.context';
import { useOptimistic } from 'react';

type CommentProps = Comment & {
  author: User;
};

export default function Comment({ comment }: { comment: CommentProps }) {
  const toast = useToastContext();
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
    addOptimisticLike(1)
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
    addOptimisticDisLike(1)
    const result = await disLikeComment(comment.id);
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
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="font-medium">{comment.author.username}</div>
          <div className="text-xs text-muted-foreground">{creationDate}</div>
        </div>
        <div className="text-muted-foreground">{comment.content}</div>
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
          <Button variant="ghost" onClick={handleDisLike}>
            <span>Answer</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
