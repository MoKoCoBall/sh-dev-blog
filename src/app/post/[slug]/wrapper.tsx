import React from "react";

export default function wrapper({ children }: { children: React.ReactNode }) {
  return <div className="prose dark:prose-invert prose-h1">{children}</div>;
}
