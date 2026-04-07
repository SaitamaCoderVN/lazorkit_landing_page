"use client";

import { useState } from "react";

function NpmSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm install @lazorkit/sdk";

  const copy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="inline-flex items-center gap-3 bg-[#0e0e0e] rounded-lg px-4 py-3 border border-[#1a1a1a]">
      <span className="text-[#444444] select-none" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.8rem" }}>$</span>
      <code className="text-[#888888]" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.85rem" }}>{cmd}</code>
      <button
        onClick={copy}
        aria-label="Copy install command"
        className="ml-1 text-[#444444] hover:text-white transition-colors"
      >
        {copied ? (
          <span className="material-symbols-outlined text-emerald-400 text-base">check</span>
        ) : (
          <span className="material-symbols-outlined text-base">content_copy</span>
        )}
      </button>
    </div>
  );
}

export default function CTASection() {
  return (
    <section id="cta" className="reveal max-w-screen-2xl mx-auto px-8 pb-32">
      {/* Two-column: text left, install right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2
            className="text-4xl font-bold tracking-tight text-white mb-5 leading-[1.15]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Start building with LazorKit.
          </h2>
          <p
            className="text-[1.0625rem] text-[#777777] mb-8 leading-[1.7] max-w-lg"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Install the SDK, define your rulesets, and your agents run
            with guardrails from day one. Currently in private beta.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="bg-[#8b5cf6] text-white font-medium px-7 py-3 rounded-lg hover:bg-[#7c3aed] transition-colors text-[0.9375rem]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Request access
            </a>
            <a
              href="#"
              className="text-[#666666] font-medium px-7 py-3 rounded-lg border border-[#222222] hover:border-[#333333] hover:text-white transition-colors text-[0.9375rem]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="lg:pt-2">
          <NpmSnippet />
          <div className="mt-8 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-[#8b5cf6] text-sm">&#10003;</span>
              <span className="text-[#888888] text-[0.9375rem]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                TypeScript SDK with full type coverage
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-[#8b5cf6] text-sm">&#10003;</span>
              <span className="text-[#888888] text-[0.9375rem]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Works with any Solana agent framework (ElizaOS, GOAT, etc.)
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-[#8b5cf6] text-sm">&#10003;</span>
              <span className="text-[#888888] text-[0.9375rem]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                10-minute integration, no architecture changes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
