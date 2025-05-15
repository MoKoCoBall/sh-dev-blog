import Link from "next/link";
import { getPosts, getSortedPosts } from "@/lib/getPosts";

export default async function RecentPosts() {
  const posts = await getPosts();
  const sortedPosts = getSortedPosts(posts);

  // Exclude posts with the "Algorithm" tag
  const filteredPosts = sortedPosts.filter(
    (post) => !post.tags?.includes("algorithm")
  );

  return (
    <>
      <div className="mt-2 mb-10 ml-1">
        <span className="border bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 p-2 px-4 font-bold text-zinc-800 dark:text-zinc-100 text-base">
          Recent Post
        </span>
      </div>
      <ul className="space-y-6">
        {filteredPosts.map((post, index) => (
          <li
            className={`pb-6 ${
              index !== filteredPosts.length - 1
                ? "border-b border-gray-200 dark:border-zinc-800"
                : ""
            }`}
            key={post.slug}
          >
            <Link
              href={`/post/${post.slug}`}
              className="block hover:opacity-90 transition-opacity"
            >
              <div className="flex gap-4 sm:gap-5 items-center max-w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 shadow-sm overflow-hidden flex-shrink-0">
                  <div className="text-3xl sm:text-4xl flex items-center justify-center w-full h-full">
                    {post.emoji}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mr-3 truncate">
                      {post.title}
                    </div>
                    <div className="text-xs whitespace-nowrap text-gray-500 dark:text-zinc-400 flex-shrink-0">
                      {post.date ?? ""}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis mb-1.5">
                    {post.preview ? (
                      post.preview
                    ) : (
                      <span className="invisible">Placeholder</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-6"></div>
    </>
  );
}
