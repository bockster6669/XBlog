import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';

import axios from 'axios';
import { getErrorMessage } from '@/lib/utils';

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
      const message = getErrorMessage(error);
      throw message;
    }
  }
);
