import ListPosts from '@/lib/features/posts/list-posts';
import React from 'react';

export default function page() {
  return (
    <main className="w-[1100px] mx-auto flex justify-center">
      <div>
        <ListPosts />
      </div>
    </main>
  );
}
