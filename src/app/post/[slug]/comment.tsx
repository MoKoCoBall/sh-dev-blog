"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // prevent when DOM element does not exist
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !resolvedTheme) return;

    const commentDiv = document.getElementById("comments");
    if (!commentDiv) return;

    commentDiv.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "MoKoCoBall/blog-comment");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      resolvedTheme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("label", "Comment");
    script.crossOrigin = "anonymous";
    script.async = true;

    commentDiv.appendChild(script);
  }, [resolvedTheme, isClient]);

  return (
    <div className="mt-8 rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900">
      <div className="p-6">
        <div id="comments" className="transition-all duration-300" />
      </div>
    </div>
  );
}
