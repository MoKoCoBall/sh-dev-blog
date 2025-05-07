"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <>
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
            <span className="hidden lg:hidden ml-3 custom-hover-effect">
              sang-hee-dev
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/" className="px-2 py-2">
            <span className="custom-hover-effect">Home</span>
          </Link>
          <Link href="/post" className="px-2 py-2">
            <span className="custom-hover-effect">Post</span>
          </Link>
          <Link href="/project" className="px-2 py-2">
            <span className="custom-hover-effect">Project</span>
          </Link>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 shadow-md ${
            theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
          }`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#FF4D4D"
              stroke="#FF4D4D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#FFC93E"
              stroke="#212121"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </Button>
      </div>
    </>
  );
}
