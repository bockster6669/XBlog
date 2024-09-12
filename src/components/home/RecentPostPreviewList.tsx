'use client';

import { calcDateToNow } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { useGetPostsQuery } from '@/lib/features/posts/posts.slice';
import Link from 'next/link';

export default function RecentPostPreviewList() {
  const { data } = useGetPostsQuery({ orderBy: { createdAt: 'asc' } });

  return (
    data &&
    data.map((post) => (
      <Card key={post.id}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{calcDateToNow(post.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post.excerpt}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href={`/posts/${post.id}`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    ))
  );
}
