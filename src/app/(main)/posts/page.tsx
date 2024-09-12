import PostsList from '@/components/posts/PostsList';
import SearchBar from '@/components/posts/SearchBar';

type PostsPageProps = {
  searchParams: {
    search?: string,
    orderBy?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  console.log('searchParams', searchParams)
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
