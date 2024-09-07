import React from 'react';
import PostPreview from './PostPreview';
import { getPosts } from '@/lib/actions/post.actions';

export default async function PostsList() {
  const posts = await getPosts();

  if ('error' in posts) {
    return <div>Error while getting posts</div>;
  }

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
