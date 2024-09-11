import PostsList from '@/components/posts/PostsList';
import Filters from '@/components/posts/Filters';
import SearchBar from '@/components/posts/SearchBar';

export default async function PostsPage() {
  return (
    <main className="2-full mt-8">
      <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-[1fr_auto]">
        <SearchBar/>
        <Filters />
      </div>
      <PostsList />
    </main>
  );
}
