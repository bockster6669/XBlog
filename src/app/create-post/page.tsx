import CreatePostForm from '@/lib/features/posts/create-post-form';
import React from 'react';

export default function page() {
  return (
    <main className="w-[1100px] mx-auto flex justify-center">
      <div>
        <CreatePostForm />
      </div>
    </main>
  );
}
