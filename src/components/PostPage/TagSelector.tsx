"use client";

import { useState, useEffect, useMemo } from "react";
import { Post } from "@/lib/getPosts";
import Link from "next/link";

interface TagSelectorProps {
  initialPosts?: Post[];
}

// define tags
const PREDEFINED_TAGS = ["All", "React", "Next"];

export default function TagSelector({ initialPosts = [] }: TagSelectorProps) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: initialPosts.length,
    };

    PREDEFINED_TAGS.forEach((tag) => {
      if (tag === "All") return;

      const count = initialPosts.filter((post) =>
        post.tags?.some(
          (postTag) => postTag.toLowerCase() === tag.toLowerCase()
        )
      ).length;

      counts[tag] = count;
    });

    return counts;
  }, [initialPosts]);

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
      <div className="flex justify-center space-x-16 mb-10">
        {PREDEFINED_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`text-lg font-medium transition-all relative w-24 text-center border-b-2 pb-1 ${
              selectedTag === tag
                ? "text-zinc-900 dark:text-white border-zinc-800 dark:border-white"
                : "text-gray-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-gray-200 border-transparent"
            }`}
          >
            {tag === "All"
              ? `전체 ${tagCounts.All}`
              : `${tag} ${tagCounts[tag] || 0}`}
          </button>
        ))}
      </div>

      <ul className="space-y-6">
        {(filteredPosts || []).map((post, index) => (
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
                  <div className="mt-1.5 flex flex-wrap items-center">
                    {(post.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs px-2 py-0.5 mr-1.5 mb-1.5 rounded-xl border border-gray-200 dark:border-zinc-700"
                      >
                        #{tag}
                      </span>
                    ))}
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
