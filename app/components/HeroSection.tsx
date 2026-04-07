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
      className="reveal max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40"
    >
      {/* Left: copy */}
      <div className="space-y-10">
        {/* Status badge */}
        <div
          data-hero-item
          style={fadeStyle}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#222222]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-pulse" />
          <span
            className="text-[0.7rem] text-[#737373]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            System Operational
          </span>
        </div>

        {/* Headline — larger, tighter */}
        <h1
          data-hero-item
          style={{ fontFamily: "var(--font-space-grotesk)", ...fadeStyle }}
          className="text-6xl lg:text-7xl leading-[1.05] font-bold tracking-[-0.04em] text-white"
        >
          Bots can act —{" "}
          <br />
          <span className="text-primary">
            but only within rules.
          </span>
        </h1>

        {/* Body */}
        <p
          data-hero-item
          style={{ fontFamily: "var(--font-space-grotesk)", ...fadeStyle }}
          className="text-lg text-[#999999] max-w-lg leading-relaxed"
        >
          Give bots the power to execute — without ever risking your funds.
          LazorKit enforces intent-based constraints directly on the control
          surface.
        </p>

        {/* CTAs */}
        <div
          data-hero-item
          style={fadeStyle}
          className="flex items-center gap-6 pt-2"
        >
          <a
            href="#terminal"
            className="bg-[#8b5cf6] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#7c3aed] transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            See it in action
          </a>
          <a
            href="#cta"
            className="text-[#999999] hover:text-white transition-colors py-2 font-medium"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Try the demo &rarr;
          </a>
        </div>
      </div>

      {/* Right: animated control panel */}
      <ControlPanel />
    </section>
  );
}
