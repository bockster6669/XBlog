'use client';

import { cn } from '@/lib/utils';
import React, {ReactNode} from 'react';
import { Button } from '../ui/button';
import { useEditModeContext } from './Comment';

export function EditModeTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setEditMode } = useEditModeContext();

  return <div onClick={()=>{setEditMode(true)}}>{children}</div>;
}

export function EditModeGroup({ className }: { className?: string }) {
  const { editMode, setEditMode } = useEditModeContext();

  return (
    editMode && (
      <div className={cn(className)}>
        <Button onClick={() => setEditMode(false)}>Cancel</Button>
        <Button>Save</Button>
      </div>
    )
  );
}
