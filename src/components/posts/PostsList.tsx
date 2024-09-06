import { wait } from '@/lib/utils';
import { PostRepo } from '@/repository/post.repo';
import { TagRepo } from '@/repository/tag.repo';
import React from 'react';
import PostPreview from './PostPreview';

export default async function PostsList() {
  const posts = await PostRepo.findMany({
    include: {
      author: true,
      tags: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
  await wait(10000);
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0 ? (
        posts.map((post) => {
          return <PostPreview key={post.id} post={post} />;
        })
      ) : (
        <p className="text-xl text-muted-foreground">No posts were found</p>
      )}
    </div>
  );
}
