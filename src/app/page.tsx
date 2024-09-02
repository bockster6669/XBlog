'use client';

import {
  Comment,
  CommentAvatar,
  CommentContent,
  CommentDescription,
  EditModeActions,
} from '@/components/shared/comment/Comment';
import { Button } from '@/components/ui/button';
import { setCursorToEnd } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  ThumbsUp,
  ThumbsDown,
  EllipsisVertical,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function HomePage() {
  // const creationDate = formatDistance(comment.createdAt, new Date(), {
  //   addSuffix: true,
  // });
  return (
    <main>
      <Comment isInEditMode={true}>
        <CommentAvatar userImg="" username="bobo" />
        <CommentContent>
          <CommentDescription>Opisanieto mi</CommentDescription>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => {}}>
              <ThumbsUp className="size-4 text-emerald-500" />
              <span className="ml-2 text-sm text-muted-foreground">1</span>
            </Button>
            <Button variant="ghost" onClick={() => {}}>
              <ThumbsDown className="size-4 text-destructive" />
              <span className="ml-2 text-sm text-muted-foreground">2</span>
            </Button>
            <Button variant="ghost">
              <span>Answer</span>
            </Button>
            <EditModeActions
              render={({ setEditMode, editMode }) =>
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
        </CommentContent>
        <EditModeActions
          render={({ editMode, descriptionFieldRef, setEditMode }) => {
            const handleEdit = () => {
              setEditMode(true);
              setTimeout(() => {
                if (descriptionFieldRef.current) {
                  descriptionFieldRef.current.focus();
                  setCursorToEnd(descriptionFieldRef.current);
                }
              }, 0);
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
          }}
        />
      </Comment>
    </main>
  );
}
