'use client';

import { Button } from '@/components/ui/button';
import { setCursorToEnd } from '@/lib/utils';
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EllipsisVertical,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from 'lucide-react';
import { EditModeActions } from './Comment';

export const MyButtons = ({ comment }: any) => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" onClick={() => {}}>
      <ThumbsUp className="size-4 text-emerald-500" />
      <span className="ml-2 text-sm text-muted-foreground">
        {comment.likes}
      </span>
    </Button>
    <Button variant="ghost" onClick={() => {}}>
      <ThumbsDown className="size-4 text-destructive" />
      <span className="ml-2 text-sm text-muted-foreground">
        {comment.disLikes}
      </span>
    </Button>
    <Button variant="ghost">
      <span>Answer</span>
    </Button>
    <EditModeActions
      render={({ setEditMode, editMode }: any) =>
        editMode && (
          <>
            <Button
              className="ml-auto"
              size="sm"
              variant="secondary"
              onClick={() => setEditMode(false)}
            >
              <span>Cancel</span>
            </Button>
            <Button
              className="mx-1"
              size="sm"
              onClick={() => setEditMode(false)}
            >
              <span>Save</span>
            </Button>
          </>
        )
      }
    />
  </div>
);

export const Reactions = ({
  editMode,
  setEditMode,
}: any) => {
  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    !editMode && (
      <DropdownMenu>
        <DropdownMenuTrigger className="my-auto">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <Trash2 className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

export const EnterNewCommentButtons = () => {
  return (
    <Button className="ml-auto mt-2" size="sm" onClick={() => {}}>
      <span>Post</span>
    </Button>
  );
};
