import { getErrorMessage, wait } from '@/lib/utils';
import axios from 'axios';
import { AxiosGetCategoriesResponse } from './types';

export const fetchCategoriesAsyncFunc = async () => {
  await wait(6000)
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
