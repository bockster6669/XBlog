import { GetCategorysResponse } from '@/app/api/categorys/route';
import { Category } from '@prisma/client';

export type initialState = {
  categorys: Category[];
  status: 'idle' | 'pending' | 'fulfield' | 'rejected';
  error: string | null;
};

export type AxiosGetCategorysResponse = Exclude<
  GetCategorysResponse,
  { error: string }
>;
