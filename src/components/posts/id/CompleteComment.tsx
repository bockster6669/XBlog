'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EllipsisVertical,
  MessageSquareText,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from 'lucide-react';
import {
  Comment,
  CommentAvatar,
  CommentContent,
  CommentDescription,
  CommentController,
  useCommentContext,
} from '../../shared/comment/Comment';
import {
  likeComment,
  disLikeComment,
  deleteComment,
  saveComment,
  createComment,
} from '@/lib/actions/comment.actions';
import { useCallback, useEffect, useState } from 'react';
import { useToastContext } from '../../../../contexts/toast.context';
import { formatDistance } from 'date-fns';
import { Comment as TComment, User } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { CommentContext } from '../../shared/comment/types';
import { useParams } from 'next/navigation';

type CommentProps = {
  comment: TComment & {
    author: User;
  };
};
type CommentOptionsProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
};

export const CompleteComment = ({ comment }: CommentProps) => {
  const creationDate = formatDistance(comment.createdAt, new Date(), {
    addSuffix: true,
  });
  const toast = useToastContext();

  const handleSave = async (
    contentFieldRef: React.MutableRefObject<HTMLParagraphElement | null>
  ) => {
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
    <Comment>
      <CommentAvatar userImg="" username="bobo" />
      <CommentContent>
        <div className="flex items-center gap-2">
          <div className="font-medium">{comment.author.username}</div>
          <div className="text-xs text-muted-foreground">{creationDate}</div>
        </div>
        <CommentDescription>{comment.content}</CommentDescription>
        <div className="flex items-center gap-2">
          <CommentFeedbackButtons comment={comment} />
          <CommentController
            render={({
              setEditMode,
              editMode,
              descriptionFieldRef,
            }: CommentContext) =>
              editMode && (
                <>
                  <Button
                    className="ml-auto"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditMode(false);
                    }}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    className="mx-1"
                    size="sm"
                    onClick={() => {
                      setEditMode(false);
                      handleSave(descriptionFieldRef);
                    }}
                  >
                    <span>Save</span>
                  </Button>
                </>
              )
            }
          />
        </div>
      </CommentContent>
      <CommentController
        render={({ editMode, setEditMode }) => (
          <CommentOptions
            editMode={editMode}
            setEditMode={setEditMode}
            commentId={comment.id}
          />
        )}
      />
    </Comment>
  );
};
const CommentFeedbackButtons = ({ comment }: { comment: TComment }) => {
  const [userReaction, setUserReaction] = useState<'none' | 'like' | 'dislike'>(
    'none'
  );
  const [likes, setLikes] = useState(comment.likes);
  const [disLikes, setDisLikes] = useState(comment.disLikes);

  const handleLike = async () => {
    if (userReaction === 'like') return;

    if (userReaction === 'dislike') {
      setDisLikes((prev) => prev - 1);
      await disLikeComment(comment.id, 'decrement');
    }

    setLikes((prev) => prev + 1);
    setUserReaction('like');
    const result = await likeComment(comment.id, 'increment');
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  const handleDisLike = async () => {
    if (userReaction === 'dislike') return;

    if (userReaction === 'like') {
      setLikes((prev) => prev - 1);
      await likeComment(comment.id, 'decrement');
    }

    setDisLikes((prev) => prev + 1);
    setUserReaction('dislike');
    const result = await disLikeComment(comment.id, 'increment');
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  return (
    <>
      <Button
        variant={userReaction === 'like' ? 'secondary' : 'ghost'}
        onClick={handleLike}
      >
        <ThumbsUp className="size-4" />
        <span className="ml-2 text-sm text-muted-foreground">{likes}</span>
      </Button>
      <Button
        variant={userReaction === 'dislike' ? 'secondary' : 'ghost'}
        onClick={handleDisLike}
      >
        <ThumbsDown className="size-4" />
        <span className="ml-2 text-sm text-muted-foreground">{disLikes}</span>
      </Button>
      <Button variant="ghost">
        <span className="max-sm:hidden">Answer</span>
        <MessageSquareText className="hidden max-sm:block size-5" />
      </Button>
    </>
  );
};

const CommentOptions = ({
  editMode,
  setEditMode,
  commentId,
}: CommentOptionsProps) => {
  const toast = useToastContext();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    const result = await deleteComment(commentId);
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };
  return (
    !editMode && (
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
    )
  );
};

export const EnterNewCommentButton = () => {
  const params = useParams<{ id: string }>();
  const { descriptionFieldRef, editMode } = useCommentContext();
  const [canPost, setCanPost] = useState(false);

  const handlePost = async () => {
    if (!descriptionFieldRef.current?.textContent) return;

    const result = await createComment(
      descriptionFieldRef.current.textContent,
      params.id
    );

    descriptionFieldRef.current.textContent = '';

    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: result.error,
      });
    }
  };

  const handleCancel = () => {
    if (descriptionFieldRef.current?.textContent) {
      descriptionFieldRef.current.textContent = '';
      setCanPost(false);
    }
  };

  const checkCanPost = useCallback(() => {
    const textContent = descriptionFieldRef.current?.textContent ?? '';
    setCanPost(textContent.trim().length > 0);
  }, [descriptionFieldRef]);

  useEffect(() => {
    checkCanPost();
    const handleInput = () => checkCanPost();
    const currentRef = descriptionFieldRef.current;

    if (currentRef) {
      currentRef.addEventListener('input', handleInput);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('input', handleInput);
      }
    };
  }, [checkCanPost, descriptionFieldRef]);

  return (
    editMode && (
      <div className="ml-auto flex gap-2">
        <Button
          className="ml-auto mt-2 w-20 rounded-full"
          size="sm"
          onClick={handleCancel}
          variant="ghost"
        >
          <span>Cancel</span>
        </Button>
        <Button
          className="mt-2 w-20 rounded-full"
          size="sm"
          onClick={handlePost}
          variant={canPost ? 'default' : 'secondary'}
          disabled={!canPost}
        >
          <span>Post</span>
        </Button>
      </div>
    )
  );
};
