import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';
import React from 'react';

type ErrorMessageProps = {
  message: string | null;
  className?: string;
};

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return (
    message && (
      <div
        className={cn(
          'bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-x-2 text-sm',
          className
        )}
      >
        <TriangleAlert className="size-4 " color="#ec3c3c" />
        {message}
      </div>
    )
  );
}
