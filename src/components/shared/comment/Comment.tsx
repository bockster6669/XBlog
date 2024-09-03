'use client';

import { cn, setCursorToEnd } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  CommentContext,
  CommentProps,
  CommentAvatarProps,
  CommentContentProps,
  CommentControllerProps,
} from './types';

const commentContext = createContext<CommentContext | null>(null);

function CommentContextProvider({
  children,
  isInEditMode,
}: {
  children: ReactNode;
  isInEditMode?: boolean;
}) {
  const [editMode, setEditMode] = useState(isInEditMode || false);
  const descriptionFieldRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <commentContext.Provider
      value={{ editMode, setEditMode, descriptionFieldRef }}
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

export function Comment({ className, children, isInEditMode }: CommentProps) {
  return (
    <CommentContextProvider isInEditMode={isInEditMode}>
      <div className={cn('flex gap-4', className)}>{children}</div>
    </CommentContextProvider>
  );
}

export function CommentAvatar({
  className,
  username,
  userImg,
}: CommentAvatarProps) {
  return (
    <Avatar className={cn('w-10 h-10 border', className)}>
      <AvatarImage src={userImg} alt={`profile image of ${username}`} />
      <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

export function CommentContent({ className, children }: CommentContentProps) {
  return <div className={cn('flex-1', className)}>{children}</div>;
}

export function CommentDescription({ children, className }: { children?: ReactNode, className?:string  }) {
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
        'text-muted-foreground max-h-16 overflow-y-auto outline-none comment-placeholder focus:border-b focus:border-blue-500', className
      )}
      tabIndex={0}
      contentEditable={editMode}
      ref={descriptionFieldRef}
    >
      {children}
    </p>
  );
}

export function CommentController({ render }: CommentControllerProps) {
  const { editMode, setEditMode, descriptionFieldRef } = useCommentContext();

  return render({ setEditMode, editMode, descriptionFieldRef });
}
