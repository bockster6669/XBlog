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

export const apiSliceWithComments = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateComment: builder.mutation<
      Comment,
      { id: string; data: Prisma.CommentUpdateInput }
    >({
      query: (obj) => ({
        url: `/comments/${obj.id}`,
        method: 'PATCH',
        body: obj,
      }),
      //   invalidatesTags: ['Replies']
    }),
    deleteComment: builder.mutation<Comment, string>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      //   invalidatesTags: ['Replies']
    }),
    addComment: builder.mutation<Comment, { content: string; postId: string }>({
      query: (body) => ({
        url: `/comments`,
        method: 'POST',
        body,
      }),
      //   invalidatesTags: ['Replies']
    }),
    getReplies: builder.query<
      { replies: CommentWithRepliesAndAuthor[] },
      string
    >({
      query: (commentId) => `/comments/${commentId}/replies`,
      providesTags: ['Replies'],
    }),
    addReplie: builder.mutation<{ tags: Tag[] }, newReplie>({
      query: (newReplie) => ({
        url: `/comments/${newReplie.parentId}/replies`,
        method: 'POST',
        body: newReplie,
      }),
      invalidatesTags: ['Replies'],
    }),
  }),
});

export const {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useAddCommentMutation,
  useGetRepliesQuery,
  useAddReplieMutation,
} = apiSliceWithComments;
