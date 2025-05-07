"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-screen-lg w-[60%] mx-auto text-2xl font-bold flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="mr-8">
          <Link href={`/`} className="custom-hover-effect">
            sang-hee-dev
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="custom-hover-effect">Home</div>
        <div className="custom-hover-effect">Post</div>
        <div className="custom-hover-effect">Project</div>
        <Button
          className={`flex gap-4 rounded-full ${
            theme === "dark"
              ? "border-black bg-black text-white shadow-xl/20 shadow-white"
              : "border-white bg-white text-black shadow-xl/20 shadow-gray-500"
          } transition-all duration-300`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </div>
  );
}
