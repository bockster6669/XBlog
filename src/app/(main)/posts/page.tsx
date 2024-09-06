import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import PostPreview from '@/components/posts/PostPreview';
import { PostRepo } from '@/repository/post.repo';
import { TagRepo } from '@/repository/tag.repo';
import { wait } from '@/lib/utils';
import PostsList from '@/components/posts/PostsList';
import { Suspense } from 'react';
import PostsListSkeleton from '@/components/posts/PostPreviewSkeleton';

export default async function PostsPage() {
  const tags = await TagRepo.findMany();

  return (
    <main className="2-full mt-8">
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
      <Suspense fallback={<PostsListSkeleton />}>
        <PostsList />
      </Suspense>
    </main>
  );
}
