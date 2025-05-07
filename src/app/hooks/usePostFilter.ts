"use client";

import { useState, useEffect } from "react";
import { Post } from "@/lib/getPosts";

export function usePostFilter(posts: Post[] = []) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const availableTags = [
    "All",
    ...new Set((posts || []).flatMap((post) => post.tags || [])),
  ];

  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredPosts(posts || []);
    } else {
      setFilteredPosts(
        (posts || []).filter((post) => post.tags?.includes(selectedTag))
      );
    }
  }, [selectedTag, posts]);

  return { filteredPosts, selectedTag, setSelectedTag, availableTags };
}
