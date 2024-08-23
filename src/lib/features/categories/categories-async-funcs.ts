import { getErrorMessage } from '@/lib/utils';
import axios from 'axios';
import { AxiosGetCategoriesResponse } from './types';

export const fetchCategoriesAsyncFunc = async () => {
  try {
    const response = await axios.get<AxiosGetCategoriesResponse>(
      '/api/categories'
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw message;
  }
};
