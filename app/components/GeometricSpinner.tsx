"use client";

import { useEffect, useRef } from "react";

/**
 * Pure-canvas geometric mandala/kaleidoscope spinner.
 * Creates rotating geometric shapes with radiating lines,
 * responding to mouse position and click-hold interaction.
 * No external 3D libraries — all trigonometry.
 */
export default function GeometricSpinner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, pressed: false });
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
      const size = Math.min(parent.clientWidth, parent.clientHeight);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    const onDown = () => { mouseRef.current.pressed = true; };
    const onUp = () => { mouseRef.current.pressed = false; };

    const parent = canvas.parentElement;
    (parent || canvas).addEventListener("mousemove", onMouse);
    (parent || canvas).addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const mouse = mouseRef.current;

      // Speed up when pressed
      const speed = mouse.pressed ? 0.025 : 0.006;
      timeRef.current += speed;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const maxR = Math.min(w, h) * 0.42;
      const PETALS = 8;
      const RINGS = 6;

      // Mouse influence
      const mx = (mouse.x - 0.5) * 2;
      const my = (mouse.y - 0.5) * 2;

      // Draw radiating lines (starburst)
      const rayCount = 32;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + t * 0.3;
        const len = maxR * (0.6 + Math.sin(t * 2 + i * 0.5) * 0.15);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.04 + (mouse.pressed ? 0.03 : 0)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw concentric petal rings
      for (let ring = 0; ring < RINGS; ring++) {
        const ringT = ring / RINGS;
        const r = maxR * (0.15 + ringT * 0.85);
        const petalOffset = t * (1 + ring * 0.3) + ring * 0.5;
        const wobble = Math.sin(t * 1.5 + ring) * mx * 0.15;

        for (let p = 0; p < PETALS; p++) {
          const angle = (p / PETALS) * Math.PI * 2 + petalOffset + wobble;
          const nextAngle = ((p + 1) / PETALS) * Math.PI * 2 + petalOffset + wobble;

          // Petal arc
          const px1 = cx + Math.cos(angle) * r;
          const py1 = cy + Math.sin(angle) * r;
          const px2 = cx + Math.cos(nextAngle) * r;
          const py2 = cy + Math.sin(nextAngle) * r;

          // Control point (creates the curved petal shape)
          const midAngle = (angle + nextAngle) / 2;
          const bulge = r * (0.3 + Math.sin(t * 2 + ring + p) * 0.1 + my * 0.05);
          const cpx = cx + Math.cos(midAngle) * (r + bulge);
          const cpy = cy + Math.sin(midAngle) * (r + bulge);

          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.quadraticCurveTo(cpx, cpy, px2, py2);

          const alpha = 0.06 + (1 - ringT) * 0.08 + (mouse.pressed ? 0.05 : 0);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Inner circle (core)
      const coreR = maxR * 0.08;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, 0.15)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating ellipses at center (flower of life feel)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI + t * 0.8;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, maxR * 0.18, maxR * 0.08, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + (mouse.pressed ? 0.04 : 0)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      (parent || canvas).removeEventListener("mousemove", onMouse);
      (parent || canvas).removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
