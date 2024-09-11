import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Post, Tag } from '@prisma/client';

import { formatDistance } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PostWithTags = Post & {
  tags: Omit<Tag, 'id'>[];
};

export default function PostPreview({ post }: { post: PostWithTags }) {
  const creationDate = formatDistance(post.createdAt, new Date(), {
    addSuffix: true,
  });

  return (
    <Link href={`/posts/${post.id}`}>
      <div
        key={post.id}
        className=" h-[400px] flex flex-col group relative overflow-hidden rounded-lg border"
      >
        <div className="relative w-full min-h-60 overflow-hidden">
          <Image
            src="/medium-thumbnail.png"
            alt={post.title}
            layout="fill"
            className="object-cover w-full h-full transition-opacity group-hover:opacity-80"
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-muted-foreground line-clamp-4">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.name} className="bg-[#FABC3F]">
                {tag.name}
              </Badge>
            ))}
            {post.tags.length >= 3 && (
              <HoverCard>
                <HoverCardTrigger>
                  <Badge variant="secondary" className="hover:bg-slate-300">
                    more
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="">
                  <div className="flex justify-between space-x-4">
                    <div className="">
                      <h4 className="text-sm font-semibold">Remaining tags</h4>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags.slice(3).map((tag) => (
                          <Badge key={tag.name} className="bg-[#FABC3F]">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground absolute bottom-2 right-2">
          {creationDate}
        </p>
      </div>
    </Link>
  );
}
