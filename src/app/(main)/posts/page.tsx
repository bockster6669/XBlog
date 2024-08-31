import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge, SearchIcon } from 'lucide-react';
import { useGetCategories } from '@/lib/features/categories/hooks';
import { db } from '../../../../prisma/db';
import Image from 'next/image';

async function getPosts() {
  return await db.post.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getCategories() {
  return await db.category.findMany();
}

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = await getCategories();
  return (
    <main className='w-full mt-8'>
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
          {categories.map((category) => (
            <Button key={category.id} className="whitespace-nowrap">
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden rounded-lg"
          >
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View post</span>
            </Link>
            <Image
              src="/medium-thumbnail.png"
              alt={post.title}
              width={400}
              height={255}
              className="h-60 w-full object-cover transition-opacity group-hover:opacity-80"
              style={{ aspectRatio: '400/225', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-muted-foreground line-clamp-4">
                {post.content}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Badge>{post.category.name}</Badge>
                <p className="text-sm text-muted-foreground">
                  {String(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
