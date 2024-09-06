import { createContext, ReactNode, useContext, useState } from 'react';
import { CommentAnswersContext, CommentWithRepiesAndAuthor } from './types';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { getCommentReplys } from '@/lib/actions/comment.actions';
import CommentItem from './CommentItem';

const commentAnswersContext = createContext<CommentAnswersContext | null>(null);

function CommentAnswersProvider({
  children,
  postId,
}: {
  children: ReactNode;
  postId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CommentWithRepiesAndAuthor[] | null>(null);

  return (
    <commentAnswersContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        data,
        setData,
        postId,
      }}
    >
      {children}
    </commentAnswersContext.Provider>
  );
}

function useCommentAnswersContext() {
  const context = useContext(commentAnswersContext);
  if (!context)
    throw new Error(
      'useContext(commentAnswersContext) should be used in commentAnswersContextProvider'
    );
  return context;
}

export function CommentAnswers({
  children,
  postId,
}: {
  children: ReactNode;
  postId: string;
}) {
  return (
    <CommentAnswersProvider postId={postId}>{children}</CommentAnswersProvider>
  );
}

export function CommentAnswersTrigger({
  children,
  commentId,
}: {
  children: ReactNode;
  commentId: string;
}) {
  const { isOpen, setIsOpen, setIsLoading, setData, data } =
    useCommentAnswersContext();

  async function handleOnClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      console.log('otvori se');
      setIsOpen(true);
      setIsLoading(true);
      const replies = await getCommentReplys(commentId);
      if ('error' in replies) return;
      setData(replies);
      setIsLoading(false);
    }
  }

  return (
    <Button
      className={'rounded-full hover:bg-blue-500/15 text-blue-500'}
      variant="ghost"
      size="sm"
      onClick={handleOnClick}
    >
      {isOpen ? (
        <ArrowUp className="size-5 mr-2" />
      ) : (
        <ArrowDown className="size-5 mr-2" />
      )}
      {children}
    </Button>
  );
}

export function CommentAnswersContent() {
  const { isOpen, data, postId, isLoading } = useCommentAnswersContext();

  if (!data) return;

  return (
    isOpen &&
    (isLoading
      ? 'Loading...'
      : data.map((reply) => (
          <div className='pl-5' key={reply.id}>
            <CommentItem
              comment={reply}
              postId={postId}
              className="border-l border-black"
            />
          </div>
        )))
  );
}
