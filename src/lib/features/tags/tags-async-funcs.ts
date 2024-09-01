import { getErrorMessage, wait } from '@/lib/utils';
import axios from 'axios';
import { AxiosGetTagsResponse } from './types';

export const fetchTagsAsyncFunc = async () => {
  try {
    const response = await axios.get<AxiosGetTagsResponse>(
      '/api/tags'
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw message;
  }
};
