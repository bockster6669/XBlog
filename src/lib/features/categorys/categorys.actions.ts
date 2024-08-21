import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';

import axios from 'axios';

type CreatePostResponse =
  | {
      category: {
        id: number;
        name: string;
      }[];
    }
  | {
      error: string;
    };

export const getCategorys = createAsyncThunk(
  'posts/createdPost',
  async () => {
    try {
      const response = await axios.get<CreatePostResponse>(
        'http://localhost:3000/api/categorys'
      );
      return response.data;
    } catch (error) {
      console.log(error);
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
