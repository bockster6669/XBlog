'use client'

import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function UserProfile() {
  const { data, status } = useSession();
  return (
    <div className='mr-4'>
      {' '}
      {status === 'loading' ? (
        <span>Loading</span>
      ) : data ? (
        <Button onClick={() => signOut()}>Logout</Button>
      ) : (
        <>
        <Button onClick={() => signIn()} variant='outline'>Sign up</Button>
        <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </div>
  );
}
