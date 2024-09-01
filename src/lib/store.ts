import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './features/posts/posts.slice';
import { tagsReducer } from './features/tags/tags.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      tags: tagsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
