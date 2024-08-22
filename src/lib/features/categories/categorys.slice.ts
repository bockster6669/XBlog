import { createSlice } from '@reduxjs/toolkit';
import { fetchcategories } from './categories.actions';
import { type initialState } from './types';

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
      .addCase(fetchcategories.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchcategories.fulfilled, (state, action) => {
        state.status = 'fulfield';
        state.categories = action.payload.category;
      })
      .addCase(fetchcategories.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
