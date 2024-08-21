import { Category } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { getCategorys } from './categorys.actions';

type initialState = {
  categorys: Category[];
  status: 'idle' | 'pending' | 'fulfield' | 'rejected';
  error: string | null;
};

const initialState: initialState = {
  categorys: [],
  status: 'idle',
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorys.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getCategorys.fulfilled, (state, action) => {
        state.status = 'fulfield';
        // state.posts.push(...action.payload)
      })
      .addCase(getCategorys.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error'
      });
  },
});

export const postsReducer = postsSlice.reducer;
