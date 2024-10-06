'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  CommentContext,
  CommentItemProps,
  CommentWithRepliesAndAuthor,
} from './types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../../../ui/button';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquareText,
  EllipsisVertical,
  Pencil,
  Trash2,
} from 'lucide-react';
import CommentForm from './CommentForm';
import { useToastContext } from '@/contexts/toast.context';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn, getErrorMessage, setCursorToEnd } from '@/lib/utils';
import {
  CommentAnswers,
  CommentAnswersContent,
  CommentAnswersTrigger,
} from './Answers';
import useAutoResizeHeight from '@/hooks/useAutoResizeHeight';
import { toast } from '@/components/ui/use-toast';
import { formatDistance } from 'date-fns';
import {
  useAddReplieMutation,
  useDeleteCommentMutation,
  useGetRepliesQuery,
  useAddCommentLikeMutation,
  useUpdateCommentMutation,
  useDeleteCommentLikeMutation,
  useAddCommentDisLikeMutation,
  useDeleteCommentDisLikeMutation,
} from '@/lib/features/comments/comment.slice';
import { useSession } from 'next-auth/react';

const commentContext = createContext<CommentContext | null>(null);

function CommentProvider({ children }: { children: ReactNode }) {
  const [replyMode, setReplyMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <commentContext.Provider
      value={{ replyMode, setReplyMode, editMode, setEditMode }}
    >
      {children}
    </commentContext.Provider>
  );
}

function useCommentContext() {
  const context = useContext(commentContext);
  if (!context)
    throw new Error(
      'useContext(commentContext) should be used in CommentContextProvider'
    );
  return context;
}

function Comment({ children }: { children: ReactNode }) {
  return (
    <CommentProvider>
      <div>{children}</div>
    </CommentProvider>
  );
}
// Context ends

function CommentContent({ comment }: { comment: CommentWithRepliesAndAuthor }) {
  const { editMode, setEditMode } = useCommentContext();
  const [value, setValue] = useState(comment.content);
  const creationDate = formatDistance(comment.createdAt, new Date(), {
    addSuffix: true,
  });
  const textarea = useAutoResizeHeight(value);
  const [updateComment] = useUpdateCommentMutation();
  const toast = useToastContext();
  console.log('CommentContent render with comment=',comment)

  function _handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      updateComment({
        id: comment.id,
        content: value,
      }).unwrap();
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: message,
      });
    }
    setEditMode(false);
  }

  function _handleCancel() {
    setEditMode(false);
  }

  return editMode ? (
    <form className="flex flex-col flex-1" onSubmit={_handleSubmit}>
      <textarea
        ref={textarea}
        rows={1}
        className="resize-none overflow-hidden text-muted-foreground outline-none comment-placeholder border-b-2 border-slate-600 focus:border-blue-500"
        autoFocus={true}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={(e) => setCursorToEnd(e.target)}
      />
      <div className="flex mt-2">
        <Button
          className="ml-auto rounded-full px-5"
          size="sm"
          variant="secondary"
          onClick={_handleCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className="mx-2 rounded-full px-5"
          size="sm"
          disabled={!value.trim()}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  ) : (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <div className="font-medium">{comment.author.username}</div>
        <div className="text-xs text-muted-foreground">{creationDate}</div>
      </div>
      <p className="break-words">{comment.content}</p>
      <div className="flex mt-2">
        <CommentFeedbackButtons comment={comment} />
      </div>
    </div>
  );
}

function CommentOptions({
  commentId,
  commentAuthorEmail,
}: {
  commentId: string;
  commentAuthorEmail: string;
}) {
  const toast = useToastContext();
  const { setEditMode, editMode } = useCommentContext();
  const [deleteComment] = useDeleteCommentMutation();
  const handleEdit = () => {
    setEditMode(true);
  };
  const { data } = useSession();

  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: message,
      });
    }
  };

  return !editMode && data?.user?.email === commentAuthorEmail ? (
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
  ) : null;
}

function CommentFeedbackButtons({
  comment,
}: {
  comment: CommentWithRepliesAndAuthor;
}) {
  console.log('CommentFeedbackButtons render with comment=',comment);

  const [userReaction, setUserReaction] = useState<'none' | 'like' | 'dislike'>(
    'none'
  );
  const [addCommentLike, { isLoading: addCommentLikeLoading }] =
    useAddCommentLikeMutation();
  const [deleteCommentLike, { isLoading: deleteCommentLikeLoading }] =
    useDeleteCommentLikeMutation();
  const [addCommentDisLike, { isLoading: addCommentDisLikeLoading }] =
    useAddCommentDisLikeMutation();
  const [deleteCommentDisLike, { isLoading: deleteCommentDisLikeLoading }] =
    useDeleteCommentDisLikeMutation();
  const [likes, setLikes] = useState(comment.totalLikes);
  const [disLikes, setDisLikes] = useState(comment.totalDisLikes);
  const { setReplyMode, editMode } = useCommentContext();
  const isLoading =
    addCommentLikeLoading ||
    deleteCommentLikeLoading ||
    addCommentDisLikeLoading ||
    deleteCommentDisLikeLoading;
  console.log('Ands likes/dislikes=',likes,disLikes);

  const handleLike = async () => {
    if (userReaction === 'like') return;

    if (userReaction === 'dislike') {
      setDisLikes((prev) => prev - 1);

      try {
        await deleteCommentDisLike(comment.id).unwrap();
        // setUserReaction('like');
        // setLikes((prev) => prev + 1);
      } catch (error) {
        console.log(error);
        const message = getErrorMessage(error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong with reactions.',
          description: message,
        });
      }
    }

    try {
      await addCommentLike(comment.id).unwrap();
      // setUserReaction('like');
      // setLikes((prev) => prev + 1);
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: message,
      });
    }
  };

  const handleDisLike = async () => {
    if (userReaction === 'dislike') return;

    if (userReaction === 'like') {
      // setLikes((prev) => prev - 1);
      try {
        await deleteCommentLike(comment.id).unwrap();
        setDisLikes((prev) => prev + 1);
        setUserReaction('dislike');
      } catch (error) {
        const message = getErrorMessage(error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong with reactions.',
          description: message,
        });
      }
    }

    try {
      await addCommentDisLike(comment.id).unwrap();
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong with reactions.',
        description: message,
      });
    }
  };

  return (
    !editMode && (
      <div className="flex items-center">
        <Button
          variant={comment.likes.length > 0 ? 'secondary' : 'ghost'}
          onClick={handleLike}
          disabled={isLoading || comment.likes.length > 0}
        >
          <ThumbsUp className="size-4" />
          <span className="ml-2 text-sm text-muted-foreground">{comment.totalLikes}</span>
        </Button>
        <Button
          variant={comment.disLikes.length > 0 ? 'secondary' : 'ghost'}
          onClick={handleDisLike}
          disabled={isLoading || comment.disLikes.length > 0}
        >
          <ThumbsDown className="size-4" />
          <span className="ml-2 text-sm text-muted-foreground">{comment.totalDisLikes}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setReplyMode(true)}
          disabled={isLoading}
        >
          <span className="max-sm:hidden">Answer</span>
          <MessageSquareText className="hidden max-sm:block size-5" />
        </Button>
      </div>
    )
  );
}

function ReplyForm({ parentId, postId }: { parentId: string; postId: string }) {
  const { replyMode, setReplyMode } = useCommentContext();
  const [createReplie] = useAddReplieMutation();
  return (
    replyMode && (
      <div className="border-l box-border pl-4">
        <CommentForm
          handleCancel={() => setReplyMode(false)}
          autoFocus={true}
          handleSubmit={async (value) => {
            await createReplie({ parentId, postId, content: value });
            setReplyMode(false);
          }}
        />
      </div>
    )
  );
}
//micro-components ends

export default function CommentItem({
  comment,
  postId,
  className,
}: CommentItemProps) {
  const { data: replies } = useGetRepliesQuery(comment.id);
  console.log('CommentItem render with comment=',comment)
  return (
    <Comment>
      <div className={cn(' box-border py-1 flex gap-4 items-start', className)}>
        <Avatar>
          <AvatarImage src={comment.author?.image || undefined} />
          <AvatarFallback>BC</AvatarFallback>
        </Avatar>

        <CommentContent comment={comment} />

        <div>
          <CommentOptions
            commentId={comment.id}
            commentAuthorEmail={comment.author.email}
          />
        </div>
      </div>
      <ReplyForm parentId={comment.id} postId={postId} />
      {replies && replies.length > 0 && (
        <CommentAnswers postId={postId}>
          <CommentAnswersTrigger>
            {replies.length} Answers
          </CommentAnswersTrigger>
          <div className="pl-5">
            {replies.map((reply) => (
              <CommentAnswersContent key={reply.id} reply={reply} />
            ))}
          </div>
        </CommentAnswers>
      )}
    </Comment>
  );
}
