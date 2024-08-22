import { Action, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { categorysReducer} from './features/categorys/categorys.slice';
import { postsReducer } from './features/posts/posts.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      categorys: categorysReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
