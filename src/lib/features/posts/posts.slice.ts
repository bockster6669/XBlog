import { Prisma } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';
import { CreatePostValues } from '@/resolvers/create-post-form.resolver';

const postsData = Prisma.validator<Prisma.PostFindManyArgs>()({
  include: {
    author: true,
    tags: true,
    comments: {
      include: {
        author: true,
      },
    },
  },
});
type PostsData = Prisma.PostGetPayload<typeof postsData>

const postData = Prisma.validator<Prisma.PostFindUniqueArgs>()({
  where: {
    id: 'a',
  },
  include: {
    author: true,
    tags: true,
    comments: {
      include: {
        author: true,
        replies: true,
      },
    },
  },
});
type PostData = Prisma.PostGetPayload<typeof postData>


export const apiSliceWithPosts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: PostsData[] }, void>({
      query: () => '/posts',
      providesTags: ['PostsList'],
    }),
    getPost: builder.query<{ post: PostData }, string>({
      query: (postId) => `/posts/${postId}`,
      // providesTags: ['PostsList'],
    }),
    addPost: builder.mutation<{ success: string }, CreatePostValues>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['PostsList'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery } =
  apiSliceWithPosts;
