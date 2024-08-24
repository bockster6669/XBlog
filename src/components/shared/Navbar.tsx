import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';

export default function Navbar() {
  return (
    <div className="flex box-border px-2 py-1">
      <div className="mr-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Homepage</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/create-post">Create Post</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/list-posts">All Posts</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" justify-self-center">
        <Link href="/" className="btn btn-ghost text-xl">
          Blog App
        </Link>
      </div>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
