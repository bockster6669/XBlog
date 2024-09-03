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
} from './Comment';
import {
  likeComment,
  disLikeComment,
  deleteComment,
  saveComment,
} from '@/lib/actions/comment.actions';
import { useOptimistic, startTransition } from 'react';
import { useToastContext } from '../../../../contexts/toast.context';
import { formatDistance } from 'date-fns';
import { Comment as TComment, User } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { CommentContext } from './types';

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

export const FullComment = ({ comment }: CommentProps) => {
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
            render={({ setEditMode, editMode, descriptionFieldRef }: CommentContext) =>
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

  return (
    <>
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
    </>
  );
};

export const CommentOptions = ({
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
  const handlePost = () => {
    console.log('post');
  };
  return (
    <Button className="ml-auto mt-2" size="sm" onClick={handlePost}>
      <span>Post</span>
    </Button>
  );
};
