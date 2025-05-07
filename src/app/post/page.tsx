import { getPosts, getSortedPosts } from "@/lib/getPosts";
import ClientTagSelector from "@/components/PostPage/TagSelector";

export default async function PostPage() {
  const posts = await getPosts();
  const sortedPosts = getSortedPosts(posts);

  return (
    <div className="max-w-screen-lg w-full px-4 sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        포스트
      </h1>
      <ClientTagSelector initialPosts={sortedPosts} />
    </div>
  );
}
