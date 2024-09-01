import { type initialState } from './types';
import { createAppSlice } from '../posts/posts.slice';
import { RootState } from '@/lib/store';
import { fetchTagsAsyncFunc } from './tags-async-funcs';

const initialState: initialState = {
  tags: [],
  status: 'idle',
  error: null,
};

export const tagsSlice = createAppSlice({
  name: 'tags',
  initialState,
  reducers: (create) => ({
    fetchTags: create.asyncThunk(fetchTagsAsyncFunc, {
      options: {
        condition(arg, thunkApi) {
          const { tags } = thunkApi.getState() as RootState;
          const status = tags.status;
          if (status !== 'idle') {
            return false;
          }
        },
      },
      pending: (state) => {
        state.status = 'pending';
      },
      fulfilled: (state, action) => {
        state.status = 'fulfield';
        state.tags = action.payload.tag;
      },
      rejected: (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      },
    }),
  }),
});
export const { fetchTags } = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer;
