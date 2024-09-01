import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { db } from '../../../../prisma/db';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from "date-fns";

async function getPosts() {
  return await db.post.findMany({
    include: {
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getTags() {
  return await db.tag.findMany();
}

export default async function PostsPage() {
  const posts = await getPosts();
  const tags = await getTags();

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
            const creationDate = formatDistance(post.createdAt, new Date(), {
              addSuffix: true,
            });
            return (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <div
                  key={post.id}
                  className="group relative overflow-hidden rounded-lg border"
                >
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
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag.name} className="bg-[#FABC3F]">
                          {tag.name}
                        </Badge>
                      ))}
                      <p className="text-sm text-muted-foreground">
                        {creationDate}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-xl text-muted-foreground">No posts were found</p>
        )}
      </div>
    </main>
  );
}
