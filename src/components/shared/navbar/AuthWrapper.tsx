'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import UserDropdownMenu from './UserDropdownMenu';
import { useRouter } from 'next/navigation';

export default function AuthWrapper() {
  const { data, status } = useSession();
  const router = useRouter();
  return (
    <>
      {status === 'loading' ? (
        <Skeleton className="w-16 h-10" />
      ) : data ? (
        <UserDropdownMenu />
      ) : (
        <>
          <Button onClick={() => router.push('/signup')} variant="outline">
            Sign up
          </Button>
          <Button onClick={() => router.push('/signin')}>Sign in</Button>
        </>
      )}
    </>
  );
}
