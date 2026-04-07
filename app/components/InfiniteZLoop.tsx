"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Infinite stacking "LAZORKIT" text footer.
 * As the user scrolls down into this section, layers of text stack
 * with perspective depth, creating an infinite tunnel effect.
 * Scrolling up immediately reverses and exits the loop.
 * Uses Space Grotesk font with hollow outlined text.
 */
export default function InfiniteZLoop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const scrollDepthRef = useRef(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LAYERS = 40;
    const TEXT = "LAZORKIT";

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = section.clientWidth;
      const h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      if (rect.top < viewH && rect.bottom > 0) {
        // How far into the section we've scrolled (0 = just entered, 1+ = deep)
        const entered = Math.max(0, viewH - rect.top);
        const depth = entered / viewH;
        scrollDepthRef.current = depth;
      } else {
        scrollDepthRef.current = 0;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const depth = scrollDepthRef.current;
      const baseFontSize = Math.min(w * 0.22, 280);
      const vpX = w * 0.5;
      const vpY = h * 0.45;

      // Number of visible layers scales with scroll depth
      const visibleLayers = Math.min(LAYERS, Math.floor(depth * LAYERS * 1.2) + 3);

      for (let i = visibleLayers - 1; i >= 0; i--) {
        const t = i / LAYERS;

        // Shrink toward vanishing point
        const scale = 1 - t * 0.7;
        const fontSize = baseFontSize * scale;

        // Position
        const x = vpX;
        const y = h * 0.55 + (vpY - h * 0.55) * t * 0.6;

        // Opacity: front=bright, back=dim, more layers visible = more immersive
        const depthFade = Math.min(1, depth * 0.8);
        const alpha = i === 0
          ? 0.3 + depthFade * 0.15
          : Math.max(0.02, (0.12 * (1 - t)) * depthFade);

        ctx.save();
        ctx.font = `800 ${fontSize}px "Space Grotesk", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (i === 0) {
          // Front layer: purple outline, thick
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 2.5;
        } else if (i <= 2) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.6})`;
          ctx.lineWidth = 1.5;
        } else {
          // Depth layers: white/gray outlines
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
        }

        ctx.strokeText(TEXT, x, y);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (isInView) {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isInView]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: "80vh", minHeight: "500px" }}
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />

      {/* Subtle label */}
      <div className="absolute bottom-8 inset-x-0 text-center z-20 pointer-events-none">
        <span
          className="text-[0.65rem] text-[#333333] tracking-widest uppercase"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Kinetic control for the agentic era
        </span>
      </div>
    </div>
  );
}
