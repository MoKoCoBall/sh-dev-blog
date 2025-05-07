"use client";

import Link from "next/link";
import { Post } from "@/lib/getPosts";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts = [] }: PostListProps) {
  const posts = initialPosts || [];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link href={`/post/${post.slug}`} key={post.slug}>
          <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-zinc-800 dark:hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl mr-2">{post.emoji}</span>
                <h2 className="text-xl font-semibold inline">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {post.preview}
                </p>
              </div>
              <div className="text-sm text-gray-500">{post.date}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
