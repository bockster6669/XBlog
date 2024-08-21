import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { postsReducer } from './features/posts/posts.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        posts: postsReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
