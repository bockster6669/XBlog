import { type initialState } from './types';
import { fetchCategoriesAsyncFunc } from './categories-async-funcs';
import { createAppSlice } from '../posts/posts.slice';

const initialState: initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const categoriesSlice = createAppSlice({
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
export const { fetchCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
