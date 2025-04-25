"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();

  // Apply Utterances
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "MoKoCoBall/blog-comment");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      theme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("label", "Comment");
    script.crossOrigin = "anonymous";
    script.async = true;

    const commentDiv = document.getElementById("comments");
    if (commentDiv) {
      commentDiv.innerHTML = "";
      commentDiv.appendChild(script);
    }
  }, [theme]);

  return (
    <div
      className={`mt-12 p-4 border rounded-lg shadow-lg ${
        theme === "dark" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div id="comments" />
    </div>
  );
}
