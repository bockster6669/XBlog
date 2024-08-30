'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import UserDropdownMenu from './UserDropdownMenu';


export default function AuthWrapper() {
  const { data, status } = useSession();
  return (
    <>
      {status === 'loading' ? (
        <Skeleton className="w-16 h-10" />
      ) : data ? (
        <UserDropdownMenu session={data} />
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
