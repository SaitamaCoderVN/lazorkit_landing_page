"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Docs", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0a]/90 border-b border-white/8 shadow-[0_1px_12px_rgba(255,255,255,0.02)]"
          : "bg-[#0a0a0a]/60 border-b border-transparent",
      ].join(" ")}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <Image
            src="https://pbs.twimg.com/profile_images/1915714297780723714/6bsBMrxd_400x400.jpg"
            alt="LazorKit Logo"
            width={32}
            height={32}
            className="rounded-full"
            unoptimized
          />
          <span
            className="text-2xl font-bold tracking-tighter text-white uppercase"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            LazorKit
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#737373] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="#cta"
            className="bg-[#8b5cf6] text-white font-medium px-5 py-2 rounded-md hover:bg-[#7c3aed] transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            More details
          </a>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={[
                "block h-0.5 bg-white transition-all duration-300 origin-center",
                isMenuOpen ? "rotate-45 translate-y-2" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 bg-white transition-all duration-300",
                isMenuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 bg-white transition-all duration-300 origin-center",
                isMenuOpen ? "-rotate-45 -translate-y-2" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/5 px-8 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-[#737373] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
