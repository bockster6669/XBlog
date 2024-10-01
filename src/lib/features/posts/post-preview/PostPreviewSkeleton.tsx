import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function PostPreviewSkeleton() {
  return (
    <div className=" h-[400px] w-[350px] flex flex-col group relative overflow-hidden rounded-lg border bg-slate-200">
      <Skeleton className="h-60 w-full object-cover transition-opacity group-hover:opacity-80" />
      <div className="p-4 flex-1 flex flex-col gap-3 bg-slate-300">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <div className="mt-4 flex items-center gap-1"></div>
      </div>
    </div>
  );
}
