"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("github-light");

  useEffect(() => {
    const newTheme = theme === "dark" ? "github-dark" : "github-light";
    setCurrentTheme(newTheme);

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "MoKoCoBall/blog-comment");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", newTheme);
    script.setAttribute("label", "Comment");
    script.crossOrigin = "anonymous";
    script.async = true;

    const commentDiv = document.getElementById("comments");
    if (commentDiv) {
      commentDiv.innerHTML = ""; // 기존 스크립트 제거
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
