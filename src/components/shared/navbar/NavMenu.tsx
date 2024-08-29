'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import React from 'react';
import { navbarLinks } from '../../../../constants/navbar-links.constants';
import Link from 'next/link';

export default function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="size-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navbarLinks.map((link) => (
          <DropdownMenuItem
            asChild
            key={link.label}
            className="cursor-pointer"
          >
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
