import axios from 'axios';
import { getErrorMessage } from '@/lib/utils';
import { createAppAsyncThunk } from '@/lib/hooks';
import { AxiosGetCategoriesResponse } from './types';

export const fetchCategories = createAppAsyncThunk(
  'posts/createdPost',
  async () => {
    try {
      const response = await axios.get<AxiosGetCategoriesResponse>(
        'http://localhost:3000/api/categories'
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      throw message;
    }
  }
);
