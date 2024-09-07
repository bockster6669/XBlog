import { GetPostsResponse, PostPostsResponse } from '@/app/api/posts/route';
import { Tag, Post, User } from '@prisma/client';

// export type FetchPaginatedPosts = { postPerPage: number; currentPage: number };

export type AxiosGetPostsResponse = Exclude<
  GetPostsResponse,
  { error: string }
>;

export type AxiosPostPostsResponse = Exclude<
  PostPostsResponse,
  { error: string }
>;

export type PostWithAutorAndTags = Post & {
  tags: Tag[];
  author: User;
};

export type initialState = {
  posts: PostWithAutorAndTags[];
  totalPosts: number;
  status: 'idle' | 'pending' | 'fulfield' | 'rejected';
  createPostStatus: 'idle' | 'pending' | 'fulfield' | 'rejected';
  error: string | null;
};
