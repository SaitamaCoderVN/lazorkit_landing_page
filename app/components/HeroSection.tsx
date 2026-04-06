"use client";

import { useEffect, useRef } from "react";
import ControlPanel from "./ControlPanel";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>("[data-hero-item]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          items.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 150);
          });
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeStyle: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1)",
  };

  return (
    <section
      ref={sectionRef}
      className="reveal max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40"
    >
      {/* Left: copy */}
      <div className="space-y-8">
        {/* Status badge */}
        <div
          data-hero-item
          style={fadeStyle}
          className="inline-flex items-center gap-2 bg-surface-container-highest/30 px-3 py-1 rounded-sm border-l-2 border-primary"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary status-pulse" />
          <span
            className="text-[0.7rem] uppercase tracking-widest text-primary"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            System Status: Operational
          </span>
        </div>

        {/* Headline */}
        <h1
          data-hero-item
          style={{ fontFamily: "var(--font-space-grotesk)", ...fadeStyle }}
          className="text-[3.5rem] leading-[1.1] font-bold tracking-[-0.04em] text-white"
        >
          Bots can act —{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            but only within rules.
          </span>
        </h1>

        {/* Body */}
        <p
          data-hero-item
          style={{ fontFamily: "var(--font-space-grotesk)", ...fadeStyle }}
          className="text-xl text-on-surface-variant max-w-lg leading-relaxed font-light"
        >
          Give bots the power to execute — without ever risking your funds.
          LazorKit enforces intent-based constraints directly on the control
          surface.
        </p>

        {/* CTAs */}
        <div
          data-hero-item
          style={fadeStyle}
          className="flex items-center gap-6 pt-4"
        >
          <button
            className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-8 py-4 rounded-md font-bold tracking-tight hover:shadow-[0_0_25px_rgba(124,92,255,0.3)] transition-all"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            See it in action
          </button>
          <button
            className="text-on-surface border-b-2 border-transparent hover:border-primary transition-all py-2 font-medium"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Try the demo
          </button>
        </div>
      </div>

      {/* Right: animated control panel */}
      <ControlPanel />
    </section>
  );
}
