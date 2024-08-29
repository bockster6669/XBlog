'use client'

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut, signIn, useSession } from 'next-auth/react';
import React from 'react';

export default function Logging() {
  const { data, status } = useSession();
  return (
    <>
      {status === 'loading' ? (
        <Skeleton className='w-16 h-10'/>
      ) : data ? (
        <Button onClick={() => signOut()}>Logout</Button>
      ) : (
        <>
          <Button onClick={() => signIn()} variant="outline">
            Sign up
          </Button>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </>
  );
}
