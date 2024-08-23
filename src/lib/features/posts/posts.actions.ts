import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';
import axios from 'axios';
import { GetPostsResponse, PostPostsResponse } from '@/app/api/posts/route';
import { getErrorMessage } from '@/lib/utils';
import { createAppAsyncThunk } from '@/lib/hooks';
import {
  AxiosGetPostsResponse,
  AxiosPostPostsResponse,
  FetchPaginatedPosts,
} from './types';

export const createdPost = createAppAsyncThunk(
  'posts/createdPost',
  async (body: CreatePostFormValues) => {
    try {
      const response = await axios.post<AxiosPostPostsResponse>(
        'http://localhost:3000/api/post',
        body
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      throw message;
    }
  },
  {
    condition(arg, { getState }) {
      const status = getState().posts.createPostStatus;
      if (status !== 'idle') {
        return false;
      }
    },
  }
);

export const fetchPaginatedPosts = createAppAsyncThunk(
  'posts/createdPost',
  async ({ postPerPage, currentPage }: FetchPaginatedPosts) => {
    try {
      const skip = (currentPage - 1) * postPerPage;
      const response = await axios.get<AxiosGetPostsResponse>(
        `/api/posts?skip=${skip}&take=${postPerPage}`
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      throw message;
    }
  },
  {
    condition(arg, { getState }) {
      const status = getState().posts.status;
      if (status !== 'idle') {
        return false;
      }
    },
  }
);
