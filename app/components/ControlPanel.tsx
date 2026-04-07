"use client";

import { useEffect, useRef, useState } from "react";

export default function ControlPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [rowsVisible, setRowsVisible] = useState([false, false, false]);

  useEffect(() => {
    const target = 1284;
    const duration = 2000;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          [0, 1, 2].forEach((i) => {
            setTimeout(() => {
              setRowsVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 600);
          });
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Shadow-based depth instead of border */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-pulse" />
            <span
              className="text-xs text-[#666666]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              live monitor
            </span>
          </div>
          <span
            className="text-[0.65rem] text-[#444444] tabular-nums"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {count.toLocaleString()} validated
          </span>
        </div>

        {/* Transaction rows */}
        <div className="space-y-3">
          {/* ALLOWED row */}
          <div
            className={[
              "hero-action bg-[#0a0a0a] p-4 rounded-lg flex items-center justify-between",
              rowsVisible[0] ? "visible" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#666666] text-xl">swap_horiz</span>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-sm">
                <span className="text-[#666666]">EXEC</span>{" "}
                <span className="text-[#999999]">Swap 20 USDC</span>
              </div>
            </div>
            <div className="px-2.5 py-1 text-emerald-400 text-[0.65rem] font-medium rounded">
              ALLOWED
            </div>
          </div>

          {/* PENDING row */}
          <div
            className={[
              "hero-action bg-[#0a0a0a]/50 p-4 rounded-lg flex items-center justify-between opacity-70",
              rowsVisible[1] ? "visible" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#444444] text-xl">hourglass_empty</span>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-sm">
                <span className="text-[#666666]">EXEC</span>{" "}
                <span className="text-[#999999]">Swap 50 USDC</span>
              </div>
            </div>
            <div className="px-2.5 py-1 text-amber-500/70 text-[0.65rem] font-medium rounded">
              PENDING
            </div>
          </div>

          {/* BLOCKED row */}
          <div
            className={[
              "hero-action bg-[#0a0a0a] p-4 rounded-lg flex items-center justify-between border-l-2 border-red-500/30",
              rowsVisible[2] ? "visible" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-red-400/70 text-xl">security</span>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-sm">
                <span className="text-[#666666]">EXEC</span>{" "}
                <span className="text-[#999999]">Swap 100 USDC</span>
              </div>
            </div>
            <div className="px-2.5 py-1 text-red-400 text-[0.65rem] font-medium rounded">
              BLOCKED
            </div>
          </div>
        </div>

        {/* Policy engine terminal block */}
        <div className="mt-6 p-4 bg-[#050505] rounded-lg">
          <div
            className="text-[0.7rem] text-[#444444] mb-2 flex items-center gap-2"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]/50 status-pulse" />
            policy_engine
          </div>
          <div
            className="text-[0.75rem] text-[#666666] leading-relaxed"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            &gt; Violation: Threshold limit exceeded
            <br />
            &gt; Action: Transaction dropped
            <br />
            &gt; Status:{" "}
            <span className="text-emerald-400/80">Wallet secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
