import { Post, Prisma } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';
import { CreatePostValues } from '@/resolvers/forms/create-post-form.resolver';
import { PostDTOProps } from '@/dto/post.dto';

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

export type GetPostsArgs = {
  search?: string;
  orderBy?: string;
};

export const apiSliceWithPosts = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Post'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query<PostsData[], PostDTOProps>({
        query: (params) => {
          const serializedParams = JSON.stringify(params);
          const encodedParams = encodeURIComponent(serializedParams);

          return `/posts?query=${encodedParams}`;
        },
        providesTags: (result, error, arg) => {
          console.log({ result, error });
          return result
            ? [
                ...result.map(({ id }) => ({
                  type: 'Post' as const,
                  id,
                })),
              ]
            : ['Post'];
        },
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
