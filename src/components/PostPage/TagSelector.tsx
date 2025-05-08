"use client";

import { useState, useEffect } from "react";
import { Post } from "@/lib/getPosts";
import Link from "next/link";

interface TagSelectorProps {
  initialPosts?: Post[];
}

const TAGS = ["All", "Algorithm", "React", "Next"];

export default function TagSelector({ initialPosts = [] }: TagSelectorProps) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) return;

    if (selectedTag === "All") {
      setFilteredPosts(initialPosts);
    } else {
      const lowerSelectedTag = selectedTag.toLowerCase();
      setFilteredPosts(
        initialPosts.filter((post) =>
          post.tags?.some((tag) => tag.toLowerCase() === lowerSelectedTag)
        )
      );
    }
  }, [selectedTag, initialPosts]);

  return (
    <>
      <div className="flex justify-center space-x-24 mb-12">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`cursor-pointer text-base font-medium transition-all relative w-32 text-center border-b-2 pb-2 ${
              selectedTag === tag
                ? "text-zinc-900 dark:text-white border-zinc-800 dark:border-white"
                : "text-gray-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-gray-200 border-transparent"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="space-y-8">
        {(filteredPosts || []).map((post, index) => (
          <li
            className={`pb-8 ${
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
              <div className="flex gap-5 sm:gap-6 items-center max-w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 shadow-sm overflow-hidden flex-shrink-0">
                  <div className="text-3xl sm:text-4xl flex items-center justify-center w-full h-full">
                    {post.emoji}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-2">
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
