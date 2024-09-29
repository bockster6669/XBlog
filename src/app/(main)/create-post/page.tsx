import CreatePostForm from '@/lib/features/posts/create-post-form/create-post-form';
import React from 'react';

export default function Page() {
  return (
    <main className='mt-8 flex justify-center'>
      <CreatePostForm />
    </main>
  );
}
