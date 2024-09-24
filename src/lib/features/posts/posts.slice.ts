import { Post, Prisma } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';
import { CreatePostValues } from '@/resolvers/forms/create-post-form.resolver';

const postData = Prisma.validator<Prisma.PostFindManyArgs>()({
  include: {
    author: {
      select: {
        username: true,
      },
    },
    tags: true,
  },
});
export type PostData = Prisma.PostGetPayload<typeof postData>;

const postById = Prisma.validator<Prisma.PostFindUniqueArgs>()({
  where: {
    id: 'a',
  },
  include: {
    author: true,
    tags: true,
  },
});

type PostById = Prisma.PostGetPayload<typeof postById>;

type GETPostsSearchParams = {
  search?: string;
  take?: number;
  orderBy?: Prisma.PostOrderByWithRelationInput;
};

export type GetPostsArgs = {
  search?: string;
  orderBy?: string;
};

export const apiSliceWithPosts = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Post'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query<PostData[], GETPostsSearchParams>({
        query: (params) => {
          function toQueryString({
            search,
            take,
            orderBy,
          }: GETPostsSearchParams) {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (take) params.append('take', take.toString());
            if (orderBy) params.append('orderBy', JSON.stringify(orderBy));

            return params.toString();
          }
          return `/posts?${toQueryString({
            search: params.search,
            orderBy: params.orderBy,
            take: params.take,
          })}`;
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
      getPostById: builder.query<PostById, string>({
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

export const { useGetPostsQuery, useAddPostMutation, useGetPostByIdQuery } =
  apiSliceWithPosts;
