"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: null, display: "0", label: "Private keys exposed", color: "text-white" },
  { value: null, display: "<100ms", label: "Validation overhead", color: "text-white" },
  { value: 100, suffix: "%", label: "On-chain enforced", color: "text-white" },
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
    <section ref={sectionRef} className="reveal-left max-w-screen-2xl mx-auto px-8 py-32 border-t border-white/8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: text */}
        <div>
          <h2
            className="text-4xl font-bold tracking-tight text-white mb-6 leading-[1.15]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The problem isn&apos;t what bots do.
            <br />
            <span className="text-[#666666]">It&apos;s what they&apos;re allowed to do.</span>
          </h2>
          <p
            className="text-[1.0625rem] text-[#777777] leading-[1.7]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Most agent infrastructure gives bots the same access as their owner.
            LazorKit separates the ability to execute from the right to authorize —
            so a compromised agent can never exceed its mandate.
          </p>
        </div>

        {/* Right: metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="py-6">
              <div
                className={`text-[2.75rem] font-bold tracking-[-0.03em] leading-none mb-2 ${stat.color}`}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {stat.display ?? `${count100}${stat.suffix}`}
              </div>
              <div
                className="text-[0.8rem] text-[#666666]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
