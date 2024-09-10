import { Tag } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';

export const apiSliceWithTags = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => '/tags',
    }),
  }),
});

export const { useGetTagsQuery } = apiSliceWithTags;
