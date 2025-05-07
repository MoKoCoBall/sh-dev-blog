import Link from "next/link";
import fs from "fs";
import path from "path";
import { getParsedData } from "@/lib/getParsedData";
import AnimatedTitle from "@/components/AnimatedTitle";

//
interface Post {
  slug: string;
  title: string;
  emoji: string;
  preview?: string;
  tags: string[];
  date?: string;
}

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const postFolders = fs.readdirSync(postsDirectory);

  // get all posts
  const posts: Post[] = await Promise.all(
    postFolders.map(async (folder) => {
      const { data } = await getParsedData(folder);
      return {
        slug: folder,
        title: data.title ? data.title : null,
        emoji: data.emoji ? data.emoji : null,
        tags: data.tags ? data.tags : null,
        preview: data.preview ? data.preview : null,
        date: data.date ? data.date : null,
      };
    })
  );

  return (
    <div className="max-w-screen-lg w-full px-4 sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
      <AnimatedTitle />
      <ul>
        {posts.map((post) => (
          <li className="mb-8 sm:mb-10" key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              <div className="flex gap-3 sm:gap-4 items-start max-w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-4xl sm:text-5xl rounded-full bg-gray-100">
                  <div className="text-3xl sm:text-4xl">{post.emoji}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl sm:text-2xl font-bold">
                    {post.title}
                  </div>
                  <div className="text-sm text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
                    {post.preview ? (
                      post.preview
                    ) : (
                      <span className="invisible">Placeholder</span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-200 text-gray-700 text-xs sm:text-sm px-2 py-1 mr-2 mb-1 rounded-2xl"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500">
                      {post.date ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
