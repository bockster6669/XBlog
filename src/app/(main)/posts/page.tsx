import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { db } from '../../../../prisma/db';
import PostPreview from '@/components/posts/PostPreview';

export default async function PostsPage() {
  const posts = await db.post.findMany({
    include: {
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  const tags = await db.tag.findMany();

  return (
    <main className="2-full mt-8 ">
      <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <SearchIcon
            className="absolute left-2.5 top-2.5 text-muted-foreground"
            width={18}
            height={18}
          />
          <Input
            type="search"
            placeholder="Search blog posts..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Button key={tag.id} className="whitespace-nowrap">
              {tag.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => {
            return <PostPreview key={post.id} post={post} />;
          })
        ) : (
          <p className="text-xl text-muted-foreground">No posts were found</p>
        )}
      </div>
    </main>
  );
}
