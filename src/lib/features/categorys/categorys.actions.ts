import axios from 'axios';
import { getErrorMessage } from '@/lib/utils';
import { createAppAsyncThunk } from '@/lib/hooks';
import { AxiosGetCategorysResponse } from './types';

export const fetchCategorys = createAppAsyncThunk(
  'posts/createdPost',
  async () => {
    try {
      const response = await axios.get<AxiosGetCategorysResponse>(
        'http://localhost:3000/api/categorys'
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      throw message;
    }
  }
);
