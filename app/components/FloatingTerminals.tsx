"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import GeometricSpinner from "./GeometricSpinner";
import RadarScan from "./RadarScan";
import DataStream from "./DataStream";

interface TerminalCard {
  id: string;
  title: string;
  content: string;
  canvas: ReactNode;
}

const cards: TerminalCard[] = [
  {
    id: "cli",
    title: "agent monitor",
    content: "> Watching 3 active sessions\n> 847 transactions validated\n> 12 blocked in last 24h",
    canvas: <RadarScan />,
  },
  {
    id: "agents",
    title: "harmonograph",
    content: "Parametric pendulum simulation.\nMouse shifts frequency ratios.\nHold click to accelerate.",
    canvas: <GeometricSpinner />,
  },
  {
    id: "intercept",
    title: "data flow",
    content: "Live transaction stream.\nEach bar is a validated request\npassing through the control surface.",
    canvas: <DataStream />,
  },
];

function TiltCard({ card }: { card: TerminalCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 10 });
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) setTilt({ rx: 0, ry: 0 });
  }, [isDragging]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).tagName === "CANVAS") return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
    setTilt({
      rx: Math.max(-15, Math.min(15, -dy * 0.08)),
      ry: Math.max(-15, Math.min(15, dx * 0.08)),
    });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setTilt({ rx: 0, ry: 0 });
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={[
        "select-none glow-border",
        isDragging ? "z-30 cursor-grabbing" : "z-20 cursor-grab",
      ].join(" ")}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate(${offset.x}px, ${offset.y}px) ${isDragging ? "scale(1.03)" : "scale(1)"}`,
        transition: isDragging
          ? "box-shadow 0.2s ease"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease",
        willChange: isDragging ? "transform" : "auto",
      }}
    >
      <div
        className={[
          "bg-[#0a0a0a] border rounded-xl overflow-hidden h-full",
          isDragging
            ? "border-[#8b5cf6]/30 shadow-[0_20px_60px_rgba(139,92,246,0.1)]"
            : "border-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:border-[#8b5cf6]/20",
          "transition-[border-color,box-shadow] duration-300",
        ].join(" ")}
      >
        {/* Canvas animation */}
        <div className="w-full aspect-[5/3] bg-[#050505] border-b border-[#141414] overflow-hidden">
          {card.canvas}
        </div>

        {/* Title bar */}
        <div className="px-4 py-2.5 border-b border-[#141414] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] status-pulse" />
          <span
            className="text-[0.65rem] text-[#666666]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {card.title}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <pre
            className="text-[0.8rem] text-[#737373] leading-relaxed whitespace-pre-wrap"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {card.content}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function FloatingTerminals() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 py-40">
      {/* Section header */}
      <div className="mb-16 max-w-2xl">
        <h2
          className="text-4xl font-bold tracking-tight text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Live visualizations
        </h2>
        <p
          className="text-[#777777] text-[1.0625rem] leading-[1.7]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Each card renders a real-time canvas simulation. Hover to interact
          with the geometry, click and drag to move them.
        </p>
      </div>

      {/* 3-column grid — each card has its own canvas + glow border */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <TiltCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
