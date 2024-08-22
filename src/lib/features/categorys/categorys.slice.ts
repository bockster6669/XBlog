import { createSlice } from '@reduxjs/toolkit';
import { fetchCategorys } from './categorys.actions';
import { type initialState } from './types';

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
        state.categorys = action.payload.category
      })
      .addCase(fetchCategorys.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const categorysReducer = categorysSlice.reducer;
