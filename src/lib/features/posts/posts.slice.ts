import {
  type initialState,
} from './types';
import { RootState } from '@/lib/store';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import {
  createPostAsyncFunc,
  // fetchPaginatedPostsAsyncFunc,
} from './posts-async-funcs';

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
    // fetchPaginatedPosts: create.asyncThunk(fetchPaginatedPostsAsyncFunc, {
    //   options: {
    //     condition(arg, thunkApi) {
    //       const { posts } = thunkApi.getState() as RootState;
    //       const status = posts.status;
    //       if (status !== 'idle') {
    //         return false;
    //       }
    //     },
    //   },
    //   pending: (state) => {
    //     state.status = 'pending';
    //   },
    //   fulfilled: (state, action) => {
    //     state.status = 'fulfield';
    //     if ('error' in action.payload) {
    //       return;
    //     }
    //     state.totalPosts = action.payload.totalPosts;
    //     state.posts = action.payload.posts;
    //   },
    //   rejected: (state, action) => {
    //     state.status = 'rejected';
    //     state.error = action.error.message || 'Something went wrong'
    //   },
    // }),
  }),
});

export const { createPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
