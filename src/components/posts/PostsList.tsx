'use client';

import React from 'react';
import PostPreview from './PostPreview';
import { useGetPostsQuery } from '@/lib/features/posts/posts.slice';
import PostsListSkeleton from './PostPreviewSkeleton';

export default function PostsList() {
  const { isError, error, isLoading, data } = useGetPostsQuery();

  if (isError) {
    console.log(error);
    return <div>Error while getting posts</div>;
  }

  return isLoading ? (
    <PostsListSkeleton />
  ) : (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.posts.map((post) => {
          return <PostPreview key={post.id} post={post} />;
        })}
    </div>
  );
}
