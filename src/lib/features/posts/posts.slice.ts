import { createSlice } from '@reduxjs/toolkit';
import { fetchPaginatedPosts } from './posts.actions';
import { type initialState } from './types';

const initialState: initialState = {
  posts: [],
  totalPosts: 0,
  status: 'idle',
  createPostStatus: 'idle',
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedPosts.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchPaginatedPosts.fulfilled, (state, action) => {
        state.status = 'fulfield';
        if ('error' in action.payload) {
          return;
        }
        state.totalPosts = action.payload.totalPosts
        state.posts = action.payload.posts;
      })
      .addCase(fetchPaginatedPosts.rejected, (state, action) => {
        state.status = 'rejected';
      });
  },
});

export const postsReducer = postsSlice.reducer;
