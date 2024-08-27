import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { navbarLinks } from '../../../constants/navbar-links.constants';

export default function Navbar() {
  return (
    <div className="flex box-border px-2 py-1 items-center dark:bg-[#010409]">
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-auto">
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {navbarLinks.map((link) => (
            <DropdownMenuItem asChild key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/" className="justify-self-center btn btn-ghost text-xl">
        Blog App
      </Link>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
