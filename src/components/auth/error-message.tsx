import { TriangleAlert } from 'lucide-react';
import React from 'react';

type ErrorMessageProps = {
  message: string | null;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <>
      {message && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-x-2 text-sm">
          <TriangleAlert className="size-4 " color="#ec3c3c" />
          {message}
        </div>
      )}
    </>
  );
}
