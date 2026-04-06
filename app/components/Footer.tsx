"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/15">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-16 w-full max-w-screen-2xl mx-auto text-[0.75rem] uppercase tracking-[0.05em]"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-primary font-black text-xl tracking-tighter">LAZORKIT</div>
          <p className="text-outline max-w-xs leading-relaxed">
            © 2025 LAZORKIT // KINETIC CONTROL SURFACE
            <br />
            BUILT FOR THE AGENTIC ERA.
          </p>
          {/* Social icons */}
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter/X" className="text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">open_in_new</span>
            </a>
            <a href="#" aria-label="Github" className="text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">code</span>
            </a>
            <a href="#" aria-label="Discord" className="text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">forum</span>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-outline hover:text-primary underline underline-offset-4 transition-colors">
              Network Status
            </a>
            <a href="#" className="text-outline hover:text-primary underline underline-offset-4 transition-colors">
              Security Audit
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-outline hover:text-primary underline underline-offset-4 transition-colors">
              Github
            </a>
            <a href="#" className="text-outline hover:text-primary underline underline-offset-4 transition-colors">
              Twitter
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <div className="text-on-surface-variant">Stay Updated</div>
          <p className="text-outline leading-relaxed normal-case tracking-normal text-[0.7rem]">
            Get early access updates and developer announcements.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-surface-container-highest border-0 border-b-2 border-outline-variant focus:border-primary rounded-sm px-3 py-2 text-sm text-on-surface placeholder:text-outline outline-none transition-colors normal-case tracking-normal"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            />
            <button
              type="submit"
              className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed rounded-md px-4 py-2 font-bold hover:shadow-[0_0_15px_rgba(177,161,255,0.4)] transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
