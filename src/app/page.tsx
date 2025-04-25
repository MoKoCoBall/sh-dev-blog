import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home() {
  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const postFolders = fs.readdirSync(postsDirectory);

  return (
    <div className="max-w-screen-lg w-[60%] mx-auto">
      <div className="text-3xl font-bold">블로그 포스트 목록</div>
      <ul>
        {postFolders.map((folder) => {
          const fullPath = path.join(postsDirectory, folder, "index.md");
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data } = matter(fileContents);

          return (
            <li key={folder}>
              <Link href={`/post/${folder}`}>{data.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
