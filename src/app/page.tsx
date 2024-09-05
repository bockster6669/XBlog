import { Comment, CommentContent } from '@/components/experimental/Comment';
import { EditModeGroup, EditModeTrigger } from '@/components/experimental/EditModeActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function HomePage() {
  return (
    <main>
      <Comment>
        <div className="w-[500px] h-[100px] flex gap-4 bg-slate-200">
          <Avatar>
            <AvatarImage src={''} />
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
          <CommentContent />
          <div className='ml-auto'>
            <DropdownMenu>
              <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
              <DropdownMenuContent>
                <EditModeTrigger>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </EditModeTrigger>

                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <EditModeGroup/>
        </div>
      </Comment>
     
    </main>
  );
}
