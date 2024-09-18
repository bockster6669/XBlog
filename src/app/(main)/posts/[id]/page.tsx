'use client';

import React from 'react';
import Post from '@/components/posts/id/Post';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import { useGetPostByIdQuery } from '@/lib/features/posts/posts.slice';
import CommentsSection from '@/components/posts/id/comment/CommentsSection';
import Spinner from '@/components/shared/Spinner';

export default function Page() {
  const params: { id: string } = useParams();

  const { data: post, isLoading } = useGetPostByIdQuery(params.id);

  return (
    <main className="size-full mt-8 p-2">
      {isLoading ? (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : post ? (
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <CommentsSection postId={post.id} />
        </div>
      ) : (
        <div>Post not found...</div>
      )}
    </main>
  );
}
