"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TerminalEntry {
  time: string;
  level: string;
  levelColor: string;
  text: string;
  textClass?: string;
  badge?: { text: string; className: string };
}

interface TerminalBlock {
  entries: TerminalEntry[];
}

const terminalLines: TerminalBlock[] = [
  {
    entries: [
      { time: "14:02:01", level: "INFO", levelColor: "text-[#666666]", text: "Initializing control surface layer..." },
      { time: "14:02:02", level: "INFO", levelColor: "text-[#666666]", text: "Listening for agent signals on Port 8080..." },
    ],
  },
  {
    entries: [
      { time: "14:05:12", level: "AGENT", levelColor: "text-primary", text: "REQUEST swap(0xUSDC, 50.00, 0xWALLET_B)", textClass: "text-[#999999]" },
      { time: "14:05:12", level: "LAZOR", levelColor: "text-[#737373]", text: 'Validating ruleset "Standard_Limits"...' },
      { time: "14:05:13", level: "PASSED", levelColor: "text-emerald-400", text: "50 USDC <= Max Daily Limit (100 USDC)" },
      {
        time: "14:05:13",
        level: "STATUS",
        levelColor: "text-emerald-400",
        text: "",
        badge: { text: "TRANSACTION_BROADCASTED", className: "text-emerald-400" },
      },
    ],
  },
  {
    entries: [
      { time: "14:08:44", level: "AGENT", levelColor: "text-primary", text: "REQUEST transfer(0xALL, 0xUNKNOWN_ADDR)", textClass: "text-[#999999]" },
      { time: "14:08:44", level: "LAZOR", levelColor: "text-[#737373]", text: 'Validating ruleset "Standard_Limits"...' },
      { time: "14:08:44", level: "FAILED", levelColor: "text-red-400", text: "Action 'Transfer' not on Allowlist for this session." },
      { time: "14:08:45", level: "FAILED", levelColor: "text-red-400", text: "'0xUNKNOWN_ADDR' is not a registered counterparty." },
      {
        time: "14:08:45",
        level: "STATUS",
        levelColor: "text-red-400",
        text: "",
        badge: { text: "INTERCEPTED_AND_DROPPED", className: "text-red-400 font-bold" },
      },
    ],
  },
  {
    entries: [
      { time: "14:12:01", level: "AGENT", levelColor: "text-primary", text: "RULE_UPDATE: Set daily_limit = 200 USDC", textClass: "text-[#999999]" },
      { time: "14:12:01", level: "LAZOR", levelColor: "text-[#737373]", text: "Validating rule update against owner policy..." },
      { time: "14:12:02", level: "PASSED", levelColor: "text-emerald-400", text: "Owner passkey confirmed. Rule update authorized." },
      {
        time: "14:12:02",
        level: "STATUS",
        levelColor: "text-[#737373]",
        text: "",
        badge: { text: "RULESET_UPDATED", className: "text-[#737373]" },
      },
    ],
  },
];

function TypedText({ text, delay, onDone }: { text: string; delay: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDoneRef.current?.();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {!done && <span className="terminal-cursor inline-cursor" />}
    </span>
  );
}

function TerminalLine({
  entry,
  animate,
  charDelay,
  onDone,
}: {
  entry: TerminalEntry;
  animate: boolean;
  charDelay: number;
  onDone?: () => void;
}) {
  if (!animate) return null;

  const fullPrefix = `[${entry.time}] ${entry.level}: `;
  const content = entry.badge ? entry.badge.text : entry.text;
  const fullText = fullPrefix + content;

  return (
    <div className="terminal-line">
      <TypedText text={fullText} delay={charDelay} onDone={onDone} />
    </div>
  );
}

function TerminalLineRendered({ entry }: { entry: TerminalEntry }) {
  return (
    <div>
      <span className="text-[#444444]">[{entry.time}]</span>{" "}
      <span className={entry.levelColor}>{entry.level}:</span>{" "}
      {entry.badge ? (
        <span className={entry.badge.className}>{entry.badge.text}</span>
      ) : (
        <span className={entry.textClass ?? "text-[#666666]"}>{entry.text}</span>
      )}
    </div>
  );
}

export default function TerminalSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [completedLines, setCompletedLines] = useState<boolean[][]>([]);
  const [currentLine, setCurrentLine] = useState<{ block: number; entry: number } | null>(null);
  const [sequenceKey, setSequenceKey] = useState(0);

  const startSequence = useCallback(() => {
    setCompletedLines([]);
    setCurrentLine({ block: 0, entry: 0 });
    setSequenceKey((k) => k + 1);
  }, []);

  const advanceLine = useCallback(() => {
    setCurrentLine((prev) => {
      if (!prev) return null;
      const { block, entry } = prev;
      setCompletedLines((cl) => {
        const next = [...cl];
        if (!next[block]) next[block] = [];
        next[block][entry] = true;
        return next;
      });

      const currentBlock = terminalLines[block];
      if (entry + 1 < currentBlock.entries.length) {
        return { block, entry: entry + 1 };
      } else if (block + 1 < terminalLines.length) {
        return { block: block + 1, entry: 0 };
      }
      return null;
    });
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.scrollTo({ top: content.scrollHeight, behavior: "smooth" });
    }
  }, [currentLine, completedLines]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          startSequence();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [hasPlayed, startSequence]);

  return (
    <section ref={containerRef} id="terminal" className="reveal max-w-4xl mx-auto px-8 py-40">
      <div className="text-center mb-16">
        <h2
          className="text-3xl font-bold tracking-tight text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          What happens when a bot misbehaves?
        </h2>
        <p className="text-[#666666]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Watch how LazorKit sanitizes bot commands in real-time.
        </p>
      </div>

      {/* Terminal window — shadow-based depth, clean header */}
      <div className="bg-[#0a0a0a] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden border border-[#161616]">
        {/* Title bar — clean, no macOS dots */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-[#161616]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-pulse" />
            <span
              className="text-[0.65rem] text-[#444444]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              lazorkit_cli --listening
            </span>
          </div>
          <button
            onClick={() => startSequence()}
            className="text-[0.65rem] text-[#444444] hover:text-[#737373] transition-colors flex items-center gap-1"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            title="Replay"
          >
            <span className="material-symbols-outlined text-sm">replay</span>
            replay
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={contentRef}
          key={sequenceKey}
          className="p-8 text-sm leading-relaxed terminal-scroll max-h-[420px] overflow-y-auto"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {terminalLines.map((block, bi) => (
            <div key={bi} className="mb-4">
              {block.entries.map((entry, ei) => {
                const isCompleted = completedLines[bi]?.[ei];
                const isCurrent =
                  currentLine?.block === bi && currentLine?.entry === ei;

                if (isCompleted) {
                  return <TerminalLineRendered key={ei} entry={entry} />;
                }
                if (isCurrent) {
                  return (
                    <TerminalLine
                      key={`${ei}-${sequenceKey}`}
                      entry={entry}
                      animate={true}
                      charDelay={10}
                      onDone={advanceLine}
                    />
                  );
                }
                return null;
              })}
            </div>
          ))}
          {currentLine && <span className="terminal-cursor" />}
        </div>
      </div>
    </section>
  );
}
