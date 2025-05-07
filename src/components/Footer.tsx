"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-screen-lg w-full px-4 sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto text-sm text-center text-zinc-600 dark:text-zinc-400">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>
            © {currentYear}{" "}
            <Link className="underline" href="https://github.com/MoKoCoBall">
              MoKoCoBall
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
