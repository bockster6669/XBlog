import { Prisma } from '@prisma/client';

export type CommentWithRelations = Prisma.CommentGetPayload<{
  include: {
    replies: true;
    author: true;
  };
}>;

export type CommentContext = {
  replyMode: boolean;
  setReplyMode: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CommentItemProps = {
  comment: CommentWithRelations;
};

export type CommentAnswersContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
