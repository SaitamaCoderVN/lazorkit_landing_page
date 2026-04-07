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
            }, i * 120);
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
    transform: "translateY(16px)",
    transition: "opacity 0.6s cubic-bezier(0.2,0.8,0.2,1), transform 0.6s cubic-bezier(0.2,0.8,0.2,1)",
  };

  return (
    <section
      ref={sectionRef}
      className="reveal max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32"
    >
      <div>
        {/* Eyebrow — specific, not generic */}
        <p
          data-hero-item
          style={{ ...fadeStyle, fontFamily: "var(--font-jetbrains-mono)" }}
          className="text-[0.75rem] text-[#8b5cf6] mb-6 tracking-wide"
        >
          Solana agent infrastructure
        </p>

        {/* Headline — conversational, not buzzwordy */}
        <h1
          data-hero-item
          style={{ fontFamily: "var(--font-space-grotesk)", ...fadeStyle }}
          className="text-5xl lg:text-[4.25rem] leading-[1.08] font-bold tracking-[-0.035em] text-white mb-8"
        >
          Your bot trades.
          <br />
          <span className="text-[#8b5cf6]">It can&apos;t drain your wallet.</span>
        </h1>

        {/* Body — concrete benefit, plain language */}
        <p
          data-hero-item
          style={{ fontFamily: "var(--font-space-grotesk)", ...fadeStyle }}
          className="text-[1.125rem] text-[#999999] max-w-[28rem] leading-[1.7] mb-10"
        >
          LazorKit sits between your agent and your keys.
          Define what it&apos;s allowed to do — amount, action, counterparty —
          and every instruction gets validated before it hits Solana.
        </p>

        {/* CTAs — one primary, one text */}
        <div
          data-hero-item
          style={fadeStyle}
          className="flex items-center gap-5"
        >
          <a
            href="#terminal"
            className="bg-[#8b5cf6] text-white px-7 py-3 rounded-lg font-medium hover:bg-[#7c3aed] transition-colors text-[0.9375rem]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Watch the demo
          </a>
          <a
            href="#cta"
            className="text-[#666666] hover:text-white transition-colors font-medium text-[0.9375rem]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Read the docs &rarr;
          </a>
        </div>
      </div>

      <ControlPanel />
    </section>
  );
}
