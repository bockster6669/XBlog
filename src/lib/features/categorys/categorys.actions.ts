import axios from 'axios';
import { getErrorMessage } from '@/lib/utils';
import { createAppAsyncThunk } from '@/lib/hooks';

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

export const fetchCategorys = createAppAsyncThunk(
  'posts/createdPost',
  async () => {
    try {
      const response = await axios.get<CreatePostResponse>(
        'http://localhost:3000/api/categorys'
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      throw message
    }
  }
);
