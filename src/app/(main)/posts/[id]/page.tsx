import React from 'react';
import { getErrorMessage } from '@/lib/utils';
import Post from '@/components/posts/id/Post'; // Преименувайте компонента
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PostRepo } from '@/repository/post.repo';
import CommentForm from '@/components/experimental/CommentForm';
import CommentsList from '@/components/experimental/CommentsList';

const fetchPost = async (params: { id: string }) => {
  try {
    return await PostRepo.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: true,
        tags: true,
        comments: {
          include: {
            replies: true,
            author: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    const message = getErrorMessage(error);
    return { error: message };
  }
};

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await fetchPost(params);
  const session = await getServerSession(authOptions);

  if (!post) {
    return <div>Post does not exist</div>;
  }

  if ('error' in post) {
    return <div>Something went wrong while getting post: {post.error}</div>;
  }

  return (
    <main className="size-full mt-8 p-2">
      {
        <div className="h-full">
          <Post post={post} />

          <Separator className="mt-5" />

          <section className="mt-5">
            <span className=" font-bold">{post.comments.length} Comments</span>
            {session && session.user ? (
              <CommentForm />
            ) : (
              <div>You can not leave comment before signing in</div>
            )}

            <CommentsList comments={post.comments} postId={post.id}/>
          </section>
        </div>
      }
    </main>
  );
}
