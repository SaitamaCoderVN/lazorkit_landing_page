"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: null, display: "0", label: "Private keys ever exposed", color: "text-white" },
  { value: null, display: "<100ms", label: "Validation latency", color: "text-white" },
  { value: 100, suffix: "%", label: "On-chain enforcement", color: "text-white" },
];

export default function InsightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [count100, setCount100] = useState(0);
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
            setCount100(Math.floor(eased * 100));
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
    <section ref={sectionRef} className="reveal-left max-w-screen-2xl mx-auto px-8 py-40 border-t border-white/8">
      <div className="max-w-2xl mb-20">
        <h2
          className="text-5xl font-bold tracking-tight text-white mb-8 leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The problem isn&apos;t execution —{" "}
          <span className="text-[#666666] italic">it&apos;s permission.</span>
        </h2>
        <p
          className="text-lg text-[#737373] leading-relaxed"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Most infrastructure treats bots as owners. LazorKit treats bots as
          operators. By decoupling the ability to command from the right to
          authorize, we create a fail-safe environment for the next generation
          of autonomous agents.
        </p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#1a1a1a]">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111111] p-10">
            <div
              className={`text-[3.5rem] font-bold tracking-[-0.04em] leading-none mb-3 ${stat.color}`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stat.display ?? `${count100}${stat.suffix}`}
            </div>
            <div
              className="text-[0.7rem] text-[#666666]"
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
