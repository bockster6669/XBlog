import SearchBar from '@/components/posts/search-bar/SearchBar';
import PostsList from '@/lib/features/posts/PostsList';

type PostsPageProps = {
  searchParams: {
    search?: string,
    orderBy?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  return (
    <main className="2-full mt-8">
      <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-[1fr_auto]">
        <SearchBar/>
        {/* <Filters /> */}
      </div>
      <PostsList search={searchParams.search} orderBy={searchParams.orderBy}/>
    </main>
  );
}
