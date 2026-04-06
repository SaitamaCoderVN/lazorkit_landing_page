"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 0, suffix: "", label: "Private keys ever exposed", color: "text-primary glow-text-primary" },
  { value: null, display: "<100ms", label: "Validation latency", color: "text-secondary" },
  { value: 100, suffix: "%", label: "On-chain enforcement", color: "text-on-surface" },
];

export default function InsightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState([0, 0, 100]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          setTriggered(true);
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts([
              Math.floor(eased * 0),
              0,
              Math.floor(eased * 100),
            ]);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="reveal max-w-screen-2xl mx-auto px-8 py-32 border-t border-outline-variant/10">
      <div className="max-w-2xl">
        <h2
          className="text-5xl font-bold tracking-tight text-white mb-8 leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The problem isn&apos;t execution —{" "}
          <span className="text-primary italic">it&apos;s permission.</span>
        </h2>
        <p
          className="text-xl text-on-surface-variant leading-relaxed"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Most infrastructure treats bots as owners. LazorKit treats bots as
          operators. By decoupling the ability to command from the right to
          authorize, we create a fail-safe environment for the next generation
          of autonomous agents.
        </p>
      </div>

      {/* Metrics row */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container-low rounded-xl p-8">
            <div
              className={`text-[3.5rem] font-bold tracking-[-0.04em] leading-none mb-3 ${stat.color}`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stat.display ?? `${counts[i]}${stat.suffix}`}
            </div>
            <div
              className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
