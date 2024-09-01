import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PostWithAutorAndTags } from '@/lib/features/posts/types';
import { formatDistance } from 'date-fns';

export default function Post({ post }: { post: PostWithAutorAndTags }) {
  const creationDate = formatDistance(post.createdAt, new Date(), {
    addSuffix: true,
  });
  return (
    <article className="mx-auto">
      <div className="space-y-4 not-prose">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
          Technology
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
          {post.title}
        </h1>
        <div className="flex items-end gap-4">
          <div className="flex items-end gap-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage
                src={post.author.image ?? undefined}
                alt={`profile image of ${post.author.username}`}
              />
              <AvatarFallback>{post.author.username.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-medium">{post.author.username}</h3>
              <p className="text-xs text-muted-foreground">
                {post.author.email}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{creationDate}</p>
        </div>
      </div>

      <p className="mt-8">{post.content}</p>

      <div className="flex flex-wrap gap-2 mt-10 mb-20">
        {post.tags.map((tag) => (
          <Badge
            variant="secondary"
            key={tag.name}
            className="mr-2 py-2 flex items-center gap-2"
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </article>
  );
}
