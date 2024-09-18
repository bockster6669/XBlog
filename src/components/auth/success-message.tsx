import { cn } from '@/lib/utils';
import { CircleCheckBig } from 'lucide-react';
import React from 'react';

type SuccessMessageProps = {
    message: string | null,
    className?:string
}

export default function SuccessMessage({message, className}:SuccessMessageProps) {
  return (
    <>
      {message && (
        <div className={cn("bg-emerald-500/15 text-emerald-500 p-3 rounded-md flex items-center gap-x-2 text-sm",className)}>
          <CircleCheckBig color="#3cec5f" className="size-4" />
          {message}
        </div>
      )}
    </>
  );
}
