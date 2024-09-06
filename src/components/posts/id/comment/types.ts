import { Prisma } from '@prisma/client';

const commentWithRepiesAndAuthor =
  Prisma.validator<Prisma.CommentDefaultArgs>()({
    include: {
      replies: true,
      author: true,
    },
  });
export type CommentWithRepiesAndAuthor = Prisma.CommentGetPayload<
  typeof commentWithRepiesAndAuthor
>;

export type CommentsListProps = {
  comments: CommentWithRepiesAndAuthor[];
  postId: string;
};

export type CommentItemProps = {
  comment: CommentWithRepiesAndAuthor;
  postId: string;
  className?: string
};

export type CommentContext = {
  replyMode: boolean;
  setReplyMode: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CommentAnswersContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
};
