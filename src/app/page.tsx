import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home() {
  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const postFolders = fs.readdirSync(postsDirectory);

  return (
    <div className="max-w-screen-lg w-[60%] mx-auto">
      <div className="text-3xl font-bold text-center mt-10 mb-10">POSTS</div>
      <ul>
        {postFolders.map((folder) => {
          const fullPath = path.join(postsDirectory, folder, "index.md");
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data } = matter(fileContents);

          return (
            <li className="mb-10" key={folder}>
              <Link href={`/post/${folder}`}>
                <div className="flex gap-4 items-start max-w-full">
                  <div className="w-16 h-16 flex items-center justify-center text-5xl rounded-full bg-gray-100">
                    <div className="text-4xl">{data.emoji}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold">{data.title}</div>
                    <div className="text-sm text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
                      {data.preview ? (
                        data.preview
                      ) : (
                        <span className="invisible">Placeholder</span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center">
                      {data.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-200 text-gray-700 text-sm px-2 py-1 mr-2 rounded-2xl"
                        >
                          #{tag}
                        </span>
                      ))}
                      <span className="text-sm text-gray-500">{data.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
