import { getErrorMessage, wait } from '@/lib/utils';
import axios from 'axios';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';
import {
  AxiosGetPostsResponse,
  AxiosPostPostsResponse,
  FetchPaginatedPosts,
} from './types';

export const createPostAsyncFunc = async (body: CreatePostFormValues) => {
  try {
    const response = await axios.post<AxiosPostPostsResponse>(
      '/api/post',
      body
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw message;
  }
};

export const fetchPaginatedPostsAsyncFunc = async ({
  postPerPage,
  currentPage,
}: FetchPaginatedPosts) => {
  await wait(3000)
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
};
