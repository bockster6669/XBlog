import { Action, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesReducer } from './features/categories/categories.slice';
import { postsReducer } from './features/posts/posts.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      categories: categoriesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
