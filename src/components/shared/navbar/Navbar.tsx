import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import UserProfile from './UserProfile';
import NavMenu from './NavMenu';

export default function Navbar() {
  return (
    <div className="flex box-border w-[1100px] mx-auto px-2 py-1 items-center dark:bg-[#010409]">
      <div className="mr-auto">
        <NavMenu />
      </div>
      <Link href="/" className="justify-self-center text-2xl font-semibold">
        Blog App
      </Link>
      <div className="ml-auto flex">
        <UserProfile />
        <ModeToggle />
      </div>
    </div>
  );
}
