import { ReactNode } from 'react';

export type CommentProps = {
  className?: string;
  children: ReactNode;
  isInEditMode?: boolean;
};

export type CommentContentProps = {
  className?: string;
  children: ReactNode;
};

export type CommentContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  descriptionFieldRef: React.MutableRefObject<HTMLParagraphElement | null>;
  replyMode: boolean;
  setReplyMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CommentControllerProps = {
  render: ({
    setEditMode,
    descriptionFieldRef,
    editMode,
  }: CommentContext) => ReactNode;
};

export type CommentReplysSectionContextProps = {
  replyMode: boolean,
  setReplyMode: React.Dispatch<React.SetStateAction<boolean>>
}