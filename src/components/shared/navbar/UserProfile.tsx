'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProfileLink = {
  href: string;
  label: string;
};

const profileLinks: ProfileLink[] = [
  {
    href: '/profile/settings',
    label: 'settings',
  },
  {
    href: '/profile/settings',
    label: 'change profile',
  },
  {
    href: '/profile/settings',
    label: 'language',
  },
];

export default function UserProfile() {
  const { data, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="/profile-not-found.jfif"
          alt="profile imgage"
          width={40}
          height={40}
          className="rounded-md border"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {profileLinks.map((link) => (
          <DropdownMenuItem asChild key={link.label} className="cursor-pointer">
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
