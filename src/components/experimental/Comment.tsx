'use client';

import { cn, setCursorToEnd } from '@/lib/utils';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '../ui/button';
import { useFielsContext } from './CommentBody';

type EditModeContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const editModeContext = createContext<EditModeContext | null>(null);

export function useEditModeContext() {
  const context = useContext(editModeContext);
  if (!context)
    throw new Error(
      'useContext(commentContext) should be used in CommentContextProvider'
    );
  return context;
}

function EditModeProvider({
  children,
  initialEditModeState = true,
}: {
  children: ReactNode;
  initialEditModeState?: boolean;
}) {
  const [editMode, setEditMode] = useState(initialEditModeState);

  return (
    <editModeContext.Provider
      value={{
        editMode,
        setEditMode,
      }}
    >
      {children}
    </editModeContext.Provider>
  );
}

export function Comment({
  children,
  initialEditModeState,
}: {
  children: ReactNode;
  initialEditModeState?: boolean;
}) {
  return (
    <EditModeProvider initialEditModeState={initialEditModeState}>
      {children}
    </EditModeProvider>
  );
}

export function CommentContent({ className }: { className?: string }) {
  const { editMode } = useEditModeContext();
  const pTagRef = useRef<HTMLParagraphElement | null>(null);
  const textAreaTagRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editMode) {
      setTimeout(() => {
        if (editMode && textAreaTagRef.current) {
          textAreaTagRef.current.focus();
        }
      }, 0);
    }
  }, [editMode]);

  return editMode ? (
    <textarea
      ref={textAreaTagRef}
      className={cn(' resize-none border p-0', className)}
      defaultValue={pTagRef.current?.textContent || undefined}
      
    />
  ) : (
    <p ref={pTagRef} className={cn(className)}>
      My Comment
    </p>
  );
}

export function CommentFeedback() {}

// export function NewCommentActions({ className }: { className?: string }) {
//   const { textAreaTagRef } = useFielsContext();
//   return (
//     <div className={cn(' flex gap-1', className)}>
//       <Button onClick={()=>textAreaTagRef.current?.textContent = ''}>Cancel</Button>
//       <Button>Post</Button>
//     </div>
//   );
// }
