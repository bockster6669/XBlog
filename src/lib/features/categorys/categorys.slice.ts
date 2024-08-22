import { Category } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategorys } from './categorys.actions';

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

export const categorysSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorys.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.status = 'fulfield';
        // state.posts.push(...action.payload)
      })
      .addCase(fetchCategorys.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const categorysReducer = categorysSlice.reducer;
