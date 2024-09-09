import { Tag } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';

export const apiSliceWithTags = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<{ tags: Tag[] }, void>({
      query: () => '/tags',
    }),
  }),
});

export const { useGetTagsQuery } = apiSliceWithTags;
