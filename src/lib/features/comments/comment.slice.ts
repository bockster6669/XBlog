import { Comment, Prisma, Tag } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';

const commentReplies = Prisma.validator<Prisma.CommentFindManyArgs>()({
  include: {
    author: true,
    replies: true,
  },
});

type CommentWithRepliesAndAuthor = Prisma.CommentGetPayload<
  typeof commentReplies
>;

type newReplie = {
  content: string;
  postId: string;
  parentId: string;
};

export const apiSliceWithComments = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Replies', 'Comment'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getComments: builder.query<
        { comments: CommentWithRepliesAndAuthor[]; commentsCount: number },
        string
      >({
        query: (postId) => `comments?postId=${postId}`,
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.comments.map(({ id }) => ({
                  type: 'Comment' as const,
                  id,
                })),
                { type: 'Comment', id: arg },
              ]
            : [{ type: 'Comment', id: arg }],
      }),
      updateComment: builder.mutation<
        Comment,
        { id: string; data: Prisma.CommentUpdateInput }
      >({
        query: (obj) => ({
          url: `/comments/${obj.id}`,
          method: 'PATCH',
          body: obj,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: 'Comment', id: result?.id },
        ],
      }),
      deleteComment: builder.mutation<Comment, string>({
        query: (commentId) => ({
          url: `/comments/${commentId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, arg) => [
          { type: 'Comment', id: result?.postId },
        ],
      }),
      addComment: builder.mutation<
        Comment,
        { content: string; postId: string }
      >({
        query: (body) => ({
          url: `/comments`,
          method: 'POST',
          body,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: 'Comment', id: result?.postId },
        ],
      }),
      getReplies: builder.query<CommentWithRepliesAndAuthor[], string>({
        query: (commentId) => `/comments/${commentId}/replies`,
        providesTags: (result, error, arg) => [
          {
            type: 'Replies',
            id: arg,
          },
        ],
      }),
      addReplie: builder.mutation<Comment, newReplie>({
        query: (newReplie) => ({
          url: `/comments/${newReplie.parentId}/replies`,
          method: 'POST',
          body: newReplie,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: 'Replies', id: result!.parentId! },
        ],
      }),
    }),
  });

export const {
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useAddCommentMutation,
  useGetRepliesQuery,
  useAddReplieMutation,
} = apiSliceWithComments;
