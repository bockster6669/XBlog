'use client'

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { type Comment } from '@prisma/client';
import React from 'react';

type CommentProps = {
    comment: Comment
}

export function Comment({comment}:CommentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sm'>{comment.authorId}</CardTitle>
        <CardDescription>Posted this at 2.02.2024</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{comment.content}</p>
      </CardContent>
      <CardFooter>
        <Button>Like it</Button>
      </CardFooter>
    </Card>
  );
}
