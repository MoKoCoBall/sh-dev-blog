import fs from "fs";
import path from "path";
import { getParsedData } from "./getParsedData";

export interface Post {
  slug: string;
  title: string;
  date: string;
  preview: string;
  emoji?: string;
  tags?: string[];
  series?: string;
  content: string;
}

export async function getPosts(): Promise<Post[]> {
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
        series: data.series ? data.series : null,
        content: data.content ? data.content : null,
      };
    })
  );

  return posts;
}

export function getSortedPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
