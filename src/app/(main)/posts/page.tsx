import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ListPosts from '@/lib/features/posts/list-posts';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';

export default async function Page() {
  // const session = await getServerSession(authOptions);

  // if (!session) return <div>Unothorized</div>;
  return (
    <>
      <ListPosts />
    </>
  );
}
