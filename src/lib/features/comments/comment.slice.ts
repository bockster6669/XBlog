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
    getComments: builder.query<CommentWithRepliesAndAuthor[], string>({
      query: (postId) => `comments?postId=${postId}`,
      // providesTags: (result) =>
      //   result
      //     ? [...result.comments.map(({ id }) => ({ type: 'Comment' as const, id })), 'Comment']
      //     : ['Comment'],
      // providesTags: ()=>['Comments']
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
      // invalidatesTags: [{ type: 'Comment', id: 1 }],
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
    getReplies: builder.query<CommentWithRepliesAndAuthor[], string>({
      query: (commentId) => `/comments/${commentId}/replies`,
      providesTags: ['Replies'],
    }),
    addReplie: builder.mutation<Tag[], newReplie>({
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
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useAddCommentMutation,
  useGetRepliesQuery,
  useAddReplieMutation,
} = apiSliceWithComments;
