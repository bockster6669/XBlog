import { createContext, ReactNode, useContext, useState } from 'react';
import { CommentAnswersContext, CommentWithRepiesAndAuthor } from './types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CommentItem from './CommentItem';
import { Button } from '@/components/ui/button';

const commentAnswersContext = createContext<CommentAnswersContext | null>(null);

function CommentAnswersProvider({
  children,
  postId,
}: {
  children: ReactNode;
  postId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <commentAnswersContext.Provider
      value={{
        isOpen,
        setIsOpen,
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

export function CommentAnswersTrigger({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useCommentAnswersContext();

  async function handleOnClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <Button
      className={' hover:bg-blue-500/15'}
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
export function CommentAnswersContent({ reply }: { reply: any }) {
  const { isOpen, postId } = useCommentAnswersContext();

  return (
    isOpen && (
      <div key={reply.id}>
        <CommentItem
          comment={reply}
          className="border-l pl-5 border-slate-200"
        />
      </div>
    )
  );
}
