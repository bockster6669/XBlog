
import { GetTagsResponse } from '@/app/api/tags/route';
import { Tag } from '@prisma/client';

export type initialState = {
  tags: Tag[];
  status: 'idle' | 'pending' | 'fulfield' | 'rejected';
  error: string | null;
};

export type AxiosGetTagsResponse = Exclude<
  GetTagsResponse,
  { error: string }
>;
