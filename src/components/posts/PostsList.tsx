'use client';

import React from 'react';
import PostPreview from './PostPreview';
import { useGetPostsQuery } from '@/lib/features/posts/posts.slice';
import PostsListSkeleton from './PostPreviewSkeleton';
import { useSearchParams } from 'next/navigation';

export default function PostsList() {
  console.log('PostsList rerun');
  const searchParams = useSearchParams();
  const searchInput = searchParams.get('search');
  const { isError, error, isLoading, data, isFetching } = useGetPostsQuery(
    searchInput || ''
  );

  if (isError) {
    console.log(error);
    return <div>Error while getting posts</div>;
  }
  


  return isLoading || isFetching ? (
    <PostsListSkeleton />
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
