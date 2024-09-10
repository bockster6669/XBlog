import { Post, Prisma } from '@prisma/client';
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
type PostsData = Prisma.PostGetPayload<typeof postsData>;

const postData = Prisma.validator<Prisma.PostFindUniqueArgs>()({
  where: {
    id: 'a',
  },
  include: {
    author: true,
    tags: true,
  },
});
type PostData = Prisma.PostGetPayload<typeof postData>;

export const apiSliceWithPosts = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Post'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query<PostsData[], void>({
        query: () => '/posts',
        providesTags: ['Post'],
      }),
      getPost: builder.query<PostData, string>({
        query: (postId) => `/posts/${postId}`,
        providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
      }),
      addPost: builder.mutation<Post, CreatePostValues>({
        query: (newPost) => ({
          url: '/posts',
          method: 'POST',
          body: newPost,
        }),
        invalidatesTags: ['Post'],
      }),
    }),
  });

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery } =
  apiSliceWithPosts;
