import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';

import axios, { AxiosError } from 'axios';
import { AppDispatch, RootState } from '@/lib/store';

type CreatePostResponse =
  | {
      error: string;
      success: null;
    }
  | {
      success: string;
      error: null;
    };

// export const createdPost = createAsyncThunk(
//   'posts/createdPost',
//   async (body: CreatePostFormValues, { rejectWithValue }) => {
//     try {
//       const response = await axios.post<CreatePostResponse>(
//         'http://localhost:3000/api/post/',
//         body
//       );
//       return response.data;
//     } catch (err) {
//       console.log('error=', err)
//       return rejectWithValue('ne staa');
//     }
//   }
// );
type AppError = AxiosError<{ error?: string }>;
export const createdPost = createAsyncThunk(
  'posts/createdPost',
  async (body: CreatePostFormValues, {rejectWithValue}) => {
    console.log('zapochna se');
    try {
      const response = await axios.post<CreatePostResponse>(
        'http://localhost:3000/api/post',
        body
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error || 'No valid fields';
        // console.log(errorMessage)
        return rejectWithValue(errorMessage);
      } else {
        // return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

// const logAndAdd = (amount: number) => {
//   return ((dispatch: AppDispatch, getState: () => RootState)) => {
//     const stateBefore = getState();
//     console.log(`Counter before: ${stateBefore.counter}`);
//     dispatch(incrementByAmount(amount));
//     const stateAfter = getState();
//     console.log(`Counter after: ${stateAfter.counter}`);
//   };
// };
