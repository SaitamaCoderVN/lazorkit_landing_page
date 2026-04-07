"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setPct(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pct <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-px z-[100] pointer-events-none">
      <div
        className="h-full bg-white/20 transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
