"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* 헤더 컨텐츠 */}
      <div className="max-w-screen-lg w-full px-4 sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-between py-5">
        <div className="flex items-center">
          <Link href={`/`} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                theme === "dark"
                  ? "bg-zinc-800 text-zinc-100"
                  : "bg-zinc-200 text-zinc-800"
              }`}
            >
              <span className="flex items-center justify-center w-full h-full text-center text-lg">
                &lt;/&gt;
              </span>
            </div>
            <span className="hidden sm:block ml-3">sang-hee-dev</span>
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/" className="px-4 py-2 sm:hover:underline">
            Home
          </Link>
          <Link href="/post" className="px-4 py-2 sm:hover:underline">
            Post
          </Link>
          <Link href="/project" className="px-4 py-2 sm:hover:underline">
            Project
          </Link>
        </div>
      </div>

      {/* 다크모드 버튼 - 항상 우측 하단에 고정 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
            theme === "dark"
              ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-yellow-200"
              : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 hover:text-indigo-600"
          }`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {theme === "dark" ? (
            <Sun size={20} className="transition-all duration-300" />
          ) : (
            <Moon size={20} className="transition-all duration-300" />
          )}
        </Button>
      </div>
    </>
  );
}
