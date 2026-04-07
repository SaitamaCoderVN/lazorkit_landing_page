"use client";

import { useEffect, useRef } from "react";

/**
 * Animated radar/scan visualization — a rotating sweep line
 * with fading blips, all in purple. Pure canvas, no deps.
 */
export default function RadarScan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Fixed blip positions (random-looking but deterministic)
    const blips = [
      { angle: 0.8, dist: 0.6 }, { angle: 2.1, dist: 0.35 },
      { angle: 3.5, dist: 0.75 }, { angle: 4.8, dist: 0.45 },
      { angle: 5.9, dist: 0.55 }, { angle: 1.4, dist: 0.8 },
    ];

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;
      timeRef.current += 0.012;
      const t = timeRef.current;
      const sweepAngle = t * 1.5;

      ctx.clearRect(0, 0, w, h);

      // Concentric rings
      for (let i = 1; i <= 4; i++) {
        const r = maxR * (i / 4);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.06)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Cross lines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.04)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();

      // Sweep gradient (fading trail)
      const gradient = ctx.createConicGradient(sweepAngle, cx, cy);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.12)");
      gradient.addColorStop(0.15, "rgba(139, 92, 246, 0.02)");
      gradient.addColorStop(0.16, "rgba(139, 92, 246, 0)");
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Sweep line
      const sx = cx + Math.cos(sweepAngle) * maxR;
      const sy = cy + Math.sin(sweepAngle) * maxR;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Blips — glow when sweep passes over them
      blips.forEach((blip) => {
        const bx = cx + Math.cos(blip.angle) * maxR * blip.dist;
        const by = cy + Math.sin(blip.angle) * maxR * blip.dist;

        let angleDiff = ((sweepAngle % (Math.PI * 2)) - blip.angle + Math.PI * 2) % (Math.PI * 2);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        const brightness = Math.max(0, 1 - angleDiff / 1.2);

        const alpha = 0.05 + brightness * 0.35;
        const radius = 2 + brightness * 2;

        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.fill();
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139, 92, 246, 0.2)";
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" aria-hidden="true" />;
}
