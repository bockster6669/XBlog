import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { type Post, Prisma } from '@prisma/client';
import { formatDistance } from 'date-fns';

type PostWithAuthorAndTags = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        username: true,
        email: true
      }
    };
    tags: true;
  };
}>;

export default function Post({ post }: { post: PostWithAuthorAndTags }) {
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
          {post.author ? (
            <div className="flex items-end gap-2">
              <Avatar className="w-10 h-10 border">
                <AvatarImage
                  src={undefined} // I have to manage how to store images
                  alt={`profile image of ${post.author.username}`}
                />
                <AvatarFallback>
                  {post.author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">{post.author.username}</h3>
                <p className="text-xs text-muted-foreground">
                  {post.author.email}
                </p>
              </div>
            </div>
          ) : (
            <span className=' text-muted-foreground'>Author not found</span>
          )}

          <p className="text-sm text-muted-foreground">{creationDate}</p>
        </div>
      </div>

      <p className="mt-8">{post.content}</p>

      <div className="flex flex-wrap gap-2 mt-10">
        {post.tags.map((tag) => (
          <Badge variant="secondary" key={tag.name} className="mr-1 px-2 py-1">
            {tag.name}
          </Badge>
        ))}
      </div>
    </article>
  );
}
