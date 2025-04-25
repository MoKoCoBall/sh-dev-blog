"use client";

import { useEffect } from "react";

export default function Comments() {
  useEffect(() => {
    const theme = document.documentElement.classList.contains("dark")
      ? "github-dark"
      : "github-light";
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "MoKoCoBall/blog-comment");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme);
    script.setAttribute("label", "Comment");
    script.crossOrigin = "anonymous";
    script.async = true;

    const commentDiv = document.getElementById("comments");
    if (commentDiv && commentDiv.childNodes.length === 0) {
      commentDiv.appendChild(script);
    }
  }, []);

  return <div id="comments" className="mt-12" />;
}
