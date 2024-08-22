import { Category, Post, User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPaginatedPosts } from './posts.actions';

type PostWithAutorAndCategory = Post & {
  category: Category;
  author: User;
};

type initialState = {
  posts: PostWithAutorAndCategory[];
  totalPosts: number;
  status: 'idle' | 'pending' | 'fulfield' | 'rejected';
  createPostStatus: 'idle' | 'pending' | 'fulfield' | 'rejected';
  error: string | null;
};

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
