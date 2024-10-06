import { Prisma } from '@prisma/client';

const CommentWithRepliesAndAuthor =
  Prisma.validator<Prisma.CommentDefaultArgs>()({
    include: {
      author: true,
      replies: true,
      likes: true,
      disLikes: true,
    },
  });
export type CommentWithRepliesAndAuthor = Prisma.CommentGetPayload<
  typeof CommentWithRepliesAndAuthor
>;

export type CommentsListProps = {
  comments: CommentWithRepliesAndAuthor[];
  postId: string;
};

export type CommentItemProps = {
  comment: CommentWithRepliesAndAuthor;
  postId: string;
  className?: string;
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
