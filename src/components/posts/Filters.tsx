'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FilterIcon } from 'lucide-react';

import React from 'react';
import { Button } from '../ui/button';

export default function Filters() {
    
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
