import { useState, useEffect } from "react";

interface TypingEffectOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

interface TypingEffectResult {
  text: string;
  isDeleting: boolean;
  loopIndex: number;
  showCursor: boolean;
}

export default function useTypingEffect({
  words,
  typingSpeed = 150,
  deletingSpeed,
  pauseTime = 3000,
}: TypingEffectOptions): TypingEffectResult {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Implement cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Implement typing
  useEffect(() => {
    const current = words[loopIndex % words.length];
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
      const speed = isDeleting
        ? deletingSpeed || typingSpeed / 1.5
        : typingSpeed;
      timer = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    loopIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return { text, isDeleting, loopIndex, showCursor };
}
