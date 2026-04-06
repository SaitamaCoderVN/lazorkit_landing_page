"use client";

import { useEffect } from "react";

export default function MouseGlowProvider() {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const panels = document.querySelectorAll<HTMLElement>(".glass-panel");
      panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        panel.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        panel.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return null;
}
