import { createContext, ReactNode, useContext, useState } from 'react';
import { CommentAnswersContext } from './types';

const commentAnswersContext = createContext<CommentAnswersContext | null>(null);

function CommentAnswersProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <commentAnswersContext.Provider value={{ isOpen, setIsOpen }}>
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

export function CommentAnswers({ children }: { children: ReactNode }) {
  return (
    <CommentAnswersProvider>
      <div>{children}</div>
    </CommentAnswersProvider>
  );
}

export function CommentAnswersTrigger({ children }: { children: ReactNode }) {
  const { setIsOpen } = useCommentAnswersContext();
  return <button onClick={() => setIsOpen((prev) => !prev)}>{children}</button>;
}

export function CommentAnswersContent({ children }: { children: ReactNode }) {
  const { isOpen } = useCommentAnswersContext();

  return isOpen && <div>{children}</div>;
}
