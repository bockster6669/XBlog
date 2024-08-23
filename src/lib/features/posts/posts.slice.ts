import {
  AxiosGetPostsResponse,
  AxiosPostPostsResponse,
  FetchPaginatedPosts,
  type initialState,
} from './types';
import { RootState } from '@/lib/store';
import { getErrorMessage } from '@/lib/utils';
import axios from 'axios';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import {
  createPostAsyncFunc,
  fetchPaginatedPostsAsyncFunc,
} from './posts-async-fynctions';

const initialState: initialState = {
  posts: [],
  totalPosts: 0,
  status: 'idle',
  createPostStatus: 'idle',
  error: null,
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const postsSlice = createAppSlice({
  name: 'posts',
  initialState,
  reducers: (create) => ({
    createPost: create.asyncThunk(createPostAsyncFunc, {
      options: {
        condition(arg, thunkApi) {
          const { posts } = thunkApi.getState() as RootState;
          const status = posts.createPostStatus;
          if (status !== 'idle') {
            return false;
          }
        },
      },
    }),
    fetchPaginatedPosts: create.asyncThunk(fetchPaginatedPostsAsyncFunc, {
      options: {
        condition(arg, thunkApi) {
          const { posts } = thunkApi.getState() as RootState;
          const status = posts.status;
          if (status !== 'idle') {
            return false;
          }
        },
      },
      pending: (state) => {
        state.status = 'pending';
      },
      fulfilled: (state, action) => {
        state.status = 'fulfield';
        if ('error' in action.payload) {
          return;
        }
        state.totalPosts = action.payload.totalPosts;
        state.posts = action.payload.posts;
      },
      rejected: (state) => {
        state.status = 'rejected';
      },
    }),
  }),
});

export const { createPost, fetchPaginatedPosts } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
