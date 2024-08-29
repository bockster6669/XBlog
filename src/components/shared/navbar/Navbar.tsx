import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import NavMenu from './NavMenu';
import Logging from './Logging';
import UserProfile from './UserProfile';

export default function Navbar() {
  return (
    <div className="grid grid-flow-col box-border w-[1100px] mx-auto px-2 py-1 items-center dark:bg-[#010409]">
      <div className="justify-self-start">
        <NavMenu />
      </div>
      <Link href="/" className="justify-self-center text-2xl font-semibold">
        Blog App
      </Link>
      <div className="justify-self-end flex gap-2">
        <Logging />
        <UserProfile />
        <ModeToggle />
      </div>
    </div>
  );
}
