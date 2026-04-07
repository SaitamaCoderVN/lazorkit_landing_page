"use client";

import ParticleField from "./ParticleField";
import RadialBurst from "./RadialBurst";

export default function FeaturedCards() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — Constellation / "How it works" */}
        <a
          href="#terminal"
          data-glow
          className="group relative overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#262626] transition-colors"
        >
          {/* Canvas art background */}
          <div className="relative h-56 overflow-hidden">
            <ParticleField />
            {/* Fade overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1] pointer-events-none" />
          </div>
          {/* Text content */}
          <div className="relative z-10 p-6 pt-3">
            <p
              className="text-[0.7rem] text-[#666666] mb-2"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Interactive demo
            </p>
            <h3
              className="text-lg font-semibold text-white mb-2 group-hover:text-[#e0e0e0] transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              See how LazorKit intercepts
              rogue transactions in real-time
            </h3>
            <p
              className="text-sm text-[#737373] leading-relaxed"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Watch the control surface validate, approve, and block
              Solana instructions — live in your browser.
            </p>
          </div>
        </a>

        {/* Card 2 — Radial burst / "Architecture" */}
        <a
          href="#"
          data-glow
          className="group relative overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#262626] transition-colors"
        >
          {/* Canvas art background */}
          <div className="relative h-56 overflow-hidden">
            <RadialBurst />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1] pointer-events-none" />
          </div>
          {/* Text content */}
          <div className="relative z-10 p-6 pt-3">
            <p
              className="text-[0.7rem] text-[#666666] mb-2"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Architecture
            </p>
            <h3
              className="text-lg font-semibold text-white mb-2 group-hover:text-[#e0e0e0] transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              AI agents don&apos;t behave like humans.
              Your infrastructure should know that.
            </h3>
            <p
              className="text-sm text-[#737373] leading-relaxed"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Passkey session keys, scoped permissions, and Solana program-level
              enforcement — built for autonomous agents.
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
