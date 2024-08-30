import { getErrorMessage, wait } from '@/lib/utils';
import axios from 'axios';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';
import {
  AxiosGetPostsResponse,
  AxiosPostPostsResponse,
  FetchPaginatedPosts,
} from './types';

export const createPostAsyncFunc = async (body: CreatePostFormValues) => {
 await wait(3000);
  try {
    const response = await axios.post<AxiosPostPostsResponse>(
      '/api/posts',
      body
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const message = getErrorMessage(error);
    throw message;
  }
};

export const fetchPaginatedPostsAsyncFunc = async ({
  postPerPage,
  currentPage,
}: FetchPaginatedPosts) => {
  await wait(3000);
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
