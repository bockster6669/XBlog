import { createSlice } from '@reduxjs/toolkit';
import { type initialState } from './types';
import { fetchCategoriesAsyncFunc } from './categories-async-funcs';

const initialState: initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: (create) => ({
    fetchCategories: create.asyncThunk(fetchCategoriesAsyncFunc, {
      pending: (state) => {
        state.status = 'pending';
      },
      fulfilled: (state, action) => {
        state.status = 'fulfield';
        state.categories = action.payload.category;
      },
      rejected: (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      },
    }),
  }),
});

export const categoriesReducer = categoriesSlice.reducer;
