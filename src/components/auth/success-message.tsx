import { CircleCheckBig } from 'lucide-react';
import React from 'react';

type SuccessMessageProps = {
    message: string | null
}

export default function SuccessMessage({message}:SuccessMessageProps) {
  return (
    <>
      {message && (
        <div className="bg-emerald-500/15 text-emerald-500 p-3 rounded-md flex items-center gap-x-2 text-sm">
          <CircleCheckBig color="#3cec5f" className="size-4" />
          {message}
        </div>
      )}
    </>
  );
}
