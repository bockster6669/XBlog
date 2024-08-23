import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './features/posts/posts.slice';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { categoriesReducer } from './features/categories/categorys.slice';


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
