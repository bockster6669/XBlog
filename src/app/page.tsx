'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreatePostForm from '@/lib/features/posts/create-post-form';
import { Plus } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function HomePage() {
  const [categoriesArr, setCategoriesArr] = useState<string[]>([]);
  const categoryInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <main>
      <Button
        onClick={() => {
          if (!categoryInputRef.current || !categoryInputRef.current.value) return;
          setCategoriesArr((prev) => [
            ...prev,
            categoryInputRef.current!.value
          ]);
        }}
      >
        <Plus />
        Add tag
      </Button>
      <Input placeholder="add tag" ref={categoryInputRef} />
      {categoriesArr.map((item) => (
        <Badge key={item} className='size-5'>{item}</Badge>
      ))}
    </main>
  );
}
