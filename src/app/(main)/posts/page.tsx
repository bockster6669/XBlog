'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from 'lucide-react';

export default function Component() {
 
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategories.includes(category) ? 'solid' : 'outline'
              }
              onClick={() => handleCategoryChange(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden rounded-lg"
          >
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View post</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt={post.title}
              width={400}
              height={225}
              className="h-60 w-full object-cover transition-opacity group-hover:opacity-80"
              style={{ aspectRatio: '400/225', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="outline">{post.category}</Badge>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
