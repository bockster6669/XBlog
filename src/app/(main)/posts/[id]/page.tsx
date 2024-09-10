'use client'

import React from 'react';
import Post from '@/components/posts/id/Post'; 
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import { useGetPostQuery } from '@/lib/features/posts/posts.slice';
import CommentsSection from '@/components/posts/id/comment/CommentsSection';

export default function Page() {
  const params: { id: string } = useParams();

  const { data: post, isLoading } = useGetPostQuery(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!post) {
    return <div>Post not found...</div>
  }

  return (
    <main className="size-full mt-8 p-2">
      {
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

         <CommentsSection postId={post.id}/>
        </div>
      }
    </main>
  );
}
