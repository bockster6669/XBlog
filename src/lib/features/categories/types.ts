import { GetCategoriesResponse } from '@/app/api/categories/route';
import { Category } from '@prisma/client';

export type initialState = {
  categories: Category[];
  status: 'idle' | 'pending' | 'fulfield' | 'rejected';
  error: string | null;
};

export type AxiosGetCategoriesResponse = Exclude<
  GetCategoriesResponse,
  { error: string }
>;
