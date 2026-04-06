"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const terminalLines = [
  {
    entries: [
      { time: "14:02:01", level: "INFO", levelColor: "text-primary", text: "Initializing control surface layer..." },
      { time: "14:02:02", level: "INFO", levelColor: "text-primary", text: "Listening for agent signals on Port 8080..." },
    ],
  },
  {
    entries: [
      { time: "14:05:12", level: "AGENT", levelColor: "text-secondary", text: "REQUEST swap(0xUSDC, 50.00, 0xWALLET_B)", textClass: "text-white" },
      { time: "14:05:12", level: "LAZOR", levelColor: "text-primary", text: 'Validating ruleset "Standard_Limits"...' },
      { time: "14:05:13", level: "PASSED", levelColor: "text-green-400", text: "50 USDC <= Max Daily Limit (100 USDC)" },
      {
        time: "14:05:13",
        level: "STATUS",
        levelColor: "text-green-400",
        text: "",
        badge: { text: "TRANSACTION_BROADCASTED", className: "bg-green-400/10 text-green-400 px-1" },
      },
    ],
  },
  {
    entries: [
      { time: "14:08:44", level: "AGENT", levelColor: "text-secondary", text: "REQUEST transfer(0xALL, 0xUNKNOWN_ADDR)", textClass: "text-white" },
      { time: "14:08:44", level: "LAZOR", levelColor: "text-primary", text: 'Validating ruleset "Standard_Limits"...' },
      { time: "14:08:44", level: "FAILED", levelColor: "text-error-dim", text: "Action 'Transfer' not on Allowlist for this session." },
      { time: "14:08:45", level: "FAILED", levelColor: "text-error-dim", text: "'0xUNKNOWN_ADDR' is not a registered counterparty." },
      {
        time: "14:08:45",
        level: "STATUS",
        levelColor: "text-error-dim",
        text: "",
        badge: { text: "INTERCEPTED_AND_DROPPED", className: "bg-error/10 text-error-dim px-1 font-bold" },
      },
    ],
  },
  {
    entries: [
      { time: "14:12:01", level: "AGENT", levelColor: "text-secondary", text: "RULE_UPDATE: Set daily_limit = 200 USDC", textClass: "text-white" },
      { time: "14:12:01", level: "LAZOR", levelColor: "text-primary", text: "Validating rule update against owner policy..." },
      { time: "14:12:02", level: "PASSED", levelColor: "text-green-400", text: "Owner passkey confirmed. Rule update authorized." },
      {
        time: "14:12:02",
        level: "STATUS",
        levelColor: "text-primary",
        text: "",
        badge: { text: "RULESET_UPDATED", className: "bg-primary/10 text-primary px-1" },
      },
    ],
  },
];

export default function TerminalSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const runSequence = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    const blocks = content.querySelectorAll<HTMLElement>(".terminal-entry");
    blocks.forEach((block) => block.classList.remove("visible"));
    blocks.forEach((block, i) => {
      setTimeout(() => {
        block.classList.add("visible");
        content.scrollTo({ top: content.scrollHeight, behavior: "smooth" });
      }, i * 900);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          runSequence();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [hasPlayed, runSequence]);

  return (
    <section ref={containerRef} className="reveal max-w-4xl mx-auto px-8 py-32">
      <div className="text-center mb-12">
        <h2
          className="text-3xl font-bold tracking-tight text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          What happens when a bot misbehaves?
        </h2>
        <p className="text-on-surface-variant" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Watch how LazorKit sanitizes bot commands in real-time.
        </p>
      </div>

      {/* Terminal window */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-[0_0_40px_rgba(124,92,255,0.08)] overflow-hidden">
        {/* Title bar */}
        <div className="bg-surface-container-low px-4 py-2 flex items-center justify-between border-b border-outline-variant/15">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-outline/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-outline/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-outline/40" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-pulse" />
            <span
              className="text-[0.65rem] text-outline"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              lazorkit_cli --listening
            </span>
          </div>
          <button
            onClick={() => runSequence()}
            className="text-[0.65rem] text-outline hover:text-primary transition-colors flex items-center gap-1"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            title="Replay"
          >
            <span className="material-symbols-outlined text-sm">replay</span>
            REPLAY
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={contentRef}
          className="p-8 text-sm leading-relaxed terminal-scroll max-h-[400px] overflow-y-auto"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {terminalLines.map((block, bi) => (
            <div key={bi} className="terminal-entry mb-4">
              {block.entries.map((entry, ei) => (
                <div key={ei}>
                  <span className="text-outline">[{entry.time}]</span>{" "}
                  <span className={entry.levelColor}>{entry.level}:</span>{" "}
                  {entry.badge ? (
                    <span className={entry.badge.className}>{entry.badge.text}</span>
                  ) : (
                    <span className={entry.textClass ?? "text-on-surface-variant"}>{entry.text}</span>
                  )}
                  <br />
                </div>
              ))}
            </div>
          ))}
          <span className="terminal-cursor" />
        </div>
      </div>
    </section>
  );
}
