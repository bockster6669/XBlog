'use client';

import { cn, setCursorToEnd } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  CommentContext,
  CommentProps,
  CommentContentProps,
  CommentControllerProps,
  CommentReplysSectionContextProps,
} from './types';
import { Button } from '@/components/ui/button';

const commentContext = createContext<CommentContext | null>(null);
const CommentReplysSectionContext =
  createContext<CommentReplysSectionContextProps | null>(null);

function CommentContextProvider({
  children,
  isInEditMode,
}: {
  children: ReactNode;
  isInEditMode?: boolean;
}) {
  const [editMode, setEditMode] = useState(isInEditMode || false);
  const [replyMode, setReplyMode] = useState(false);
  const descriptionFieldRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <commentContext.Provider
      value={{
        editMode,
        setEditMode,

        replyMode,
        setReplyMode,

        descriptionFieldRef,
      }}
    >
      {children}
    </commentContext.Provider>
  );
}

function CommentReplysSectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [replyMode, setReplyMode] = useState(false);

  return (
    <CommentReplysSectionContext.Provider
      value={{
        replyMode,
        setReplyMode,
      }}
    >
      {children}
    </CommentReplysSectionContext.Provider>
  );
}

export function useCommentContext() {
  const context = useContext(commentContext);
  if (!context)
    throw new Error(
      'useContext(commentContext) should be used in CommentContextProvider'
    );
  return context;
}

export function useCommentReplysSectionContext() {
  const context = useContext(CommentReplysSectionContext);
  if (!context)
    throw new Error(
      'useContext(commentContext) should be used in CommentContextProvider'
    );
  return context;
}

export function Comment({ className, children, isInEditMode }: CommentProps) {
  return (
    <CommentContextProvider isInEditMode={isInEditMode}>
      {children}
    </CommentContextProvider>
  );
}

export function CommentContent({ className, children }: CommentContentProps) {
  return <div className={cn('flex-1', className)}>{children}</div>;
}

export function CommentDescription({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { editMode, descriptionFieldRef } = useCommentContext();

  useEffect(() => {
    if (editMode) {
      setTimeout(() => {
        if (descriptionFieldRef.current) {
          descriptionFieldRef.current.focus();
          setCursorToEnd(descriptionFieldRef.current);
        }
      }, 0);
    }
  }, [editMode, descriptionFieldRef]);

  return (
    <p
      suppressContentEditableWarning={true}
      className={cn(
        'text-muted-foreground max-h-16 overflow-y-auto outline-none comment-placeholder border-slate-600 focus:border-blue-500',
        {
          'border-b': editMode,
        },
        className
      )}
      tabIndex={0}
      contentEditable={editMode}
      ref={descriptionFieldRef}
      onClick={() => {
        if (descriptionFieldRef.current) {
          setCursorToEnd(descriptionFieldRef.current);
        }
      }}
    >
      {children}
    </p>
  );
}

export function CommentController({ render }: CommentControllerProps) {
  const {
    editMode,
    setEditMode,
    descriptionFieldRef,
    replyMode,
    setReplyMode,
  } = useCommentContext();

  return render({
    setEditMode,
    editMode,
    descriptionFieldRef,
    replyMode,
    setReplyMode,
  });
}

export function CommentAnswers() {
  return <Button></Button>;
}

export const CommentReplysSection = ({ children }: { children: ReactNode }) => {
  const { replyMode } = useCommentReplysSectionContext();
  return replyMode && <div>{children}</div>;
};
