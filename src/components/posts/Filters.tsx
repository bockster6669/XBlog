'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckIcon, Command, FilterIcon } from 'lucide-react';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from 'cmdk';

export default function Filters() {
  const [filters, setFilters] = useState({
    categories: [],
    authors: [],
    tags: [],
    publishDate: '',
    popularity: '',
    postLength: '',
    contentType: [],
    rating: '',
    language: '',
  });
  const [value, setValue] = React.useState('');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
