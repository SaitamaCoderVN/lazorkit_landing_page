"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Usecases", href: "#" },
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
        "fixed top-0 w-full z-50 backdrop-blur-xl shadow-[0_0_40px_rgba(124,92,255,0.06)] transition-colors duration-300",
        scrolled ? "bg-[#14052b]/95" : "bg-[#14052b]/80",
      ].join(" ")}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
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
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-on-surface transition-colors"
              }
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-bold px-6 py-2 rounded-md hover:shadow-[0_0_15px_rgba(177,161,255,0.5)] transition-all scale-95 hover:scale-100"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Connect Wallet
          </button>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={[
                "block h-0.5 bg-on-surface transition-all duration-300 origin-center",
                isMenuOpen ? "rotate-45 translate-y-2" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 bg-on-surface transition-all duration-300",
                isMenuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 bg-on-surface transition-all duration-300 origin-center",
                isMenuOpen ? "-rotate-45 -translate-y-2" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t border-outline-variant/15 px-8 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "block text-primary font-bold"
                  : "block text-on-surface-variant hover:text-on-surface transition-colors"
              }
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
