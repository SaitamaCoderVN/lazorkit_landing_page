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
    <div className="flex items-center gap-3 bg-[#0a0a0a] rounded-lg px-4 py-3 w-fit">
      <span className="text-[#444444] select-none" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.75rem" }}>$</span>
      <span className="text-[#666666]" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.8rem" }}>{cmd}</span>
      <button
        onClick={copy}
        aria-label="Copy install command"
        className="ml-2 text-[#444444] hover:text-[#737373] transition-colors"
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

function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex gap-2 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-[#0a0a0a] border border-[#222222] focus:border-[#333333] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#444444] outline-none transition-colors"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      />
      <button
        type="submit"
        className="bg-[#8b5cf6] text-white rounded-lg px-5 py-3 font-medium hover:bg-[#7c3aed] transition-colors text-sm"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Subscribe
      </button>
    </div>
  );
}

export default function CTASection() {
  return (
    <section id="cta" className="reveal max-w-screen-2xl mx-auto px-8 pb-40">
      <div className="relative bg-[#1a1a1a] rounded-2xl p-16 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="relative z-10 max-w-xl">
          <h2
            className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready for kinetic control?
          </h2>
          <p
            className="text-lg text-[#737373] mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Join the developers and teams building secure automation on
            LazorKit.
          </p>
          <div className="mb-8">
            <NpmSnippet />
          </div>
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#"
              className="bg-[#8b5cf6] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#7c3aed] transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Get Early Access
            </a>
            <a
              href="#"
              className="text-[#737373] font-medium px-8 py-3.5 rounded-lg border border-[#222222] hover:border-[#333333] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Read the Whitepaper
            </a>
          </div>

          {/* Newsletter — moved here from footer */}
          <div className="pt-8 border-t border-[#1a1a1a]">
            <p
              className="text-sm text-[#666666] mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Or subscribe for early access updates.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
