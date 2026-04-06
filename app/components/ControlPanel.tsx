"use client";

import { useEffect, useRef, useState } from "react";

export default function ControlPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [rowsVisible, setRowsVisible] = useState([false, false, false]);

  // Counter animation
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

  // Staggered row entrance
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

  // Magnetic spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    panel.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={containerRef} className="relative group">
      {/* Ambient glow behind panel */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-30 pointer-events-none" />

      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        className="relative glass-panel rounded-xl p-6 shadow-[0_0_40px_rgba(124,92,255,0.1)]"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/15 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error status-pulse" />
            <span
              className="text-xs text-on-surface-variant uppercase tracking-widest"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              REAL-TIME MONITOR
            </span>
          </div>
          <span
            className="text-[0.65rem] text-outline uppercase tracking-widest tabular-nums"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {count.toLocaleString()} validated
          </span>
        </div>

        {/* Transaction rows */}
        <div className="space-y-3 relative z-10">
          {/* ALLOWED row */}
          <div
            className={[
              "hero-action bg-surface-container-low p-4 rounded-lg flex items-center justify-between border-l-2 border-primary/20",
              rowsVisible[0] ? "visible" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-xl">swap_horiz</span>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-sm">
                <span className="text-on-surface-variant">EXEC:</span>{" "}
                <span className="text-on-surface">Swap 20 USDC</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-green-500/10 text-green-400 text-[0.65rem] font-bold rounded-sm uppercase tracking-tighter border border-green-500/20 pulse-glow-green">
              ALLOWED
            </div>
          </div>

          {/* PENDING row */}
          <div
            className={[
              "hero-action bg-surface-container-low/50 p-4 rounded-lg flex items-center justify-between border-l-2 border-outline-variant/30 opacity-60",
              rowsVisible[1] ? "visible" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">hourglass_empty</span>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-sm">
                <span className="text-on-surface-variant">EXEC:</span>{" "}
                <span className="text-on-surface">Swap 50 USDC</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-outline-variant/10 text-outline text-[0.65rem] font-bold rounded-sm uppercase tracking-tighter border border-outline-variant/20">
              PENDING
            </div>
          </div>

          {/* BLOCKED row */}
          <div
            className={[
              "hero-action bg-surface-container-highest p-4 rounded-lg flex items-center justify-between border-l-2 border-error",
              rowsVisible[2] ? "visible" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-error text-xl">security</span>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)" }} className="text-sm">
                <span className="text-on-surface-variant">EXEC:</span>{" "}
                <span className="text-on-surface">Swap 100 USDC</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-error/10 text-error-dim text-[0.65rem] font-bold rounded-sm uppercase tracking-tighter border border-error/20 pulse-glow-red">
              BLOCKED
            </div>
          </div>
        </div>

        {/* Policy engine terminal block */}
        <div className="mt-6 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 relative z-10">
          <div
            className="text-[0.7rem] text-primary/70 mb-2 flex items-center gap-2"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary status-pulse" />
            POLICY_ENGINE_REPORT:
          </div>
          <div
            className="text-[0.75rem] text-on-surface-variant leading-relaxed"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            &gt; Violation detected: Threshold limit exceeded
            <br />
            &gt; Action: Transaction dropped locally.
            <br />
            &gt; Status:{" "}
            <span className="text-primary">Wallet Secure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
