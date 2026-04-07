"use client";

import { useEffect, useRef } from "react";

export default function RadialBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LINE_COUNT = 90;
    const BASE_LENGTH = 60;
    const MAX_EXTRA = 80;

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

    const parent = canvas.parentElement;
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    (parent || canvas).addEventListener("mousemove", onMouse);
    (parent || canvas).addEventListener("mouseleave", onLeave);

    const animate = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const mouse = mouseRef.current;
      timeRef.current += 0.003;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Mouse influence
      const mdx = mouse.x - cx;
      const mdy = mouse.y - cy;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      const mouseAngle = Math.atan2(mdy, mdx);
      const mouseInfluence = Math.max(0, 1 - mDist / (w * 0.5));

      for (let i = 0; i < LINE_COUNT; i++) {
        const angle = (i / LINE_COUNT) * Math.PI * 2;

        // Organic wave
        const wave = Math.sin(angle * 3 + t * 2) * 0.3 +
                     Math.sin(angle * 5 - t * 1.5) * 0.2 +
                     Math.cos(angle * 2 + t) * 0.15;

        // Mouse proximity boost
        let angleDiff = Math.abs(angle - mouseAngle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        const mouseBoost = mouseInfluence * Math.max(0, 1 - angleDiff / (Math.PI * 0.4));

        const length = BASE_LENGTH + (wave + mouseBoost) * MAX_EXTRA;
        const alpha = 0.06 + wave * 0.04 + mouseBoost * 0.15;

        const x1 = cx + Math.cos(angle) * 20;
        const y1 = cy + Math.sin(angle) * 20;
        const x2 = cx + Math.cos(angle) * length;
        const y2 = cy + Math.sin(angle) * length;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.02, alpha)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fill();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      (parent || canvas).removeEventListener("mousemove", onMouse);
      (parent || canvas).removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
