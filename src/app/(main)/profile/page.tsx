import { getServerSession } from 'next-auth';
import React from 'react';
import { db } from '../../../../prisma/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Image from 'next/image';
import ListPosts from '@/lib/features/posts/list-posts';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>NO</div>;
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user?.email,
    },
    include: {
      comments: true,
      posts: true,
    },
  });

  if (!user) {
    return <>Profile not found</>;
  }

  return (
    <>
      <section className="flex flex-col gap-2">
        <Image
          src="/profile-not-found.jfif"
          width={60}
          height={60}
          alt="profile img"
          className="bg-black object-cover"
        />
        <span>{user.username}</span>
        <span>{user.email}</span>
        <span>{`${user.firstName} ${user.lastName}`}</span>
        <span>{`Account created at: ${user.createdAt}`}</span>

        <span>my posts:</span>
        {user.posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
        
      </section>
    </>
  );
}
