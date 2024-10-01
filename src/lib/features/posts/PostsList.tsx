'use client';
import { formatSearchQuery } from '@/lib/utils';

import React from 'react';
import PostPreview from './post-preview/PostPreview';
import {
  GetPostsArgs,
  useGetPostsQuery,
} from '@/lib/features/posts/posts.slice';
import PostPreviewSkeleton from './post-preview/PostPreviewSkeleton';

export default function PostsList({ search, orderBy }: GetPostsArgs) {
  const { isError, error, isLoading, data, isFetching } = useGetPostsQuery({
    search: formatSearchQuery(search),
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (isError) {
    console.log(error);
    return <div>Error while getting posts</div>;
  }

  return isLoading || isFetching ? (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((item, index) => (
        <PostPreviewSkeleton key={index} />
      ))}
    </div>
  ) : (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data &&
        (data?.length > 0 ? (
          data.map((post) => {
            return <PostPreview key={post.id} post={post} />;
          })
        ) : (
          <div>No posts were found</div>
        ))}
    </div>
  );
}
