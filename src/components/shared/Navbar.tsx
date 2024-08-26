import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="flex box-border px-2 py-1 items-center dark:bg-[#010409]">
      <div className="mr-auto">
        <DropdownMenu>
          <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
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
