import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';

type FieldsContext = {
  textAreaTagRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  pTagRef: React.MutableRefObject<HTMLParagraphElement | null>;
};

const fieldsContext = createContext<FieldsContext | null>(null);

export function useFielsContext() {
  const context = useContext(fieldsContext);
  if (!context)
    throw new Error(
      'useContext(commentContext) should be used in CommentContextProvider'
    );
  return context;
}

function FiledsContextProvider({ children }: { children: ReactNode }) {
  const textAreaTagRef = useRef<HTMLTextAreaElement | null>(null);
  const pTagRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <fieldsContext.Provider
      value={{
        textAreaTagRef,
        pTagRef,
      }}
    >
      {children}
    </fieldsContext.Provider>
  );
}
export default function CommentBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <FiledsContextProvider>{children}</FiledsContextProvider>
    </div>
  );
}
