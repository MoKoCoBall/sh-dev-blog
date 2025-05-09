import { getPosts, getSortedPosts } from "@/lib/getPosts";
import ClientTagSelector from "@/components/PostPage/TagSelector";

export default async function PostPage() {
  const posts = await getPosts();
  const sortedPosts = getSortedPosts(posts);

  return (
    <div className="max-w-screen-lg w-full px-4 sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-zinc-900 dark:text-zinc-100">
        Posts
      </h1>
      <h3 className="text-center mb-12  text-zinc-900 dark:text-zinc-100">
        {sortedPosts.length} posts
      </h3>
      <ClientTagSelector initialPosts={sortedPosts} />
    </div>
  );
}
