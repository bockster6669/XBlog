import { createSlice } from '@reduxjs/toolkit';
import { type initialState } from './types';
import { fetchCategories } from './categorys.actions';

const initialState: initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'fulfield';
        state.categories = action.payload.category;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
