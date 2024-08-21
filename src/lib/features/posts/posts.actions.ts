import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';

import axios from 'axios';
import { PostPostsResponse } from '@/app/api/posts/route';

export const createdPost = createAsyncThunk(
  'posts/createdPost',
  async (body: CreatePostFormValues, { rejectWithValue }) => {
    console.log('zapochna se');
    try {
      const response = await axios.post<PostPostsResponse>(
        'http://localhost:3000/api/post',
        body
      );
      return response.data;
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError<{ error: string }>(error)) {
        throw new Error(error.response?.data.error || 'Something went wrong');
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(JSON.stringify(error));
      }
    }
  }
);
