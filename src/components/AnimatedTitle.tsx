"use client";

import { useEffect, useState } from "react";

const roles = ["FrontEnd", "React", "Next.js", "TypeScript"];
const typingSpeed = 150;
const pauseTime = 3000;

export default function IntroBlock() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // 커서 깜빡임 효과
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const current = roles[loopIndex % roles.length];
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (isDeleting) {
        setText(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setText(current.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }
    };

    if (!isDeleting && charIndex === current.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLoopIndex((prev) => prev + 1);
    } else {
      timer = setTimeout(
        handleTyping,
        isDeleting ? typingSpeed / 1.5 : typingSpeed
      );
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loopIndex]);

  return (
    <section className="relative w-full max-w-3xl mx-auto px-6 py-16 font-['JetBrains_Mono','ui-monospace','SFMono-Regular'] text-lg sm:text-xl md:text-2xl leading-[1.8] bg-transparent">
      <div className="absolute top-6 right-6 flex gap-4">
        <a
          href="https://github.com/MoKoCoBall"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </div>

      <div className="text-zinc-800 dark:text-zinc-200">&lt;html&gt;</div>
      <div className="ml-4 text-zinc-800 dark:text-zinc-200">&lt;body&gt;</div>

      <div className="ml-8">
        <div>
          <span className="text-zinc-800 dark:text-zinc-200">&lt;h1&gt;</span>
          <span className="ml-2 font-bold text-zinc-800 dark:text-zinc-200">
            개발자
          </span>
          <span className="ml-1 text-zinc-800 dark:text-zinc-200">
            &lt;/h1&gt;
          </span>
        </div>

        <div className="mt-2 whitespace-nowrap">
          <span className="text-zinc-800 dark:text-zinc-200">&lt;p&gt;</span>
          <span className="ml-2 text-zinc-800 dark:text-zinc-200">
            저는{" "}
            <span className="inline-block font-bold">
              <span className="text-black dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                {text}
                <span
                  className={`inline-block w-[2px] h-[1em] align-middle bg-black dark:bg-white ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </span>
            </span>{" "}
            개발자입니다.
          </span>
          <span className="ml-1 text-zinc-800 dark:text-zinc-200">
            &lt;/p&gt;
          </span>
        </div>
      </div>

      <div className="ml-4 text-zinc-800 dark:text-zinc-200">&lt;/body&gt;</div>
      <div className="text-zinc-800 dark:text-zinc-200">&lt;/html&gt;</div>
    </section>
  );
}
