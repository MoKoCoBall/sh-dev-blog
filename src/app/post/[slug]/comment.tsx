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
    <div className="mt-12 p-4 border rounded-lg shadow-lg dark:bg-white dark:text-black bg-black text-white">
      <div id="comments" />
    </div>
  );
}
