"use client";

import { useEffect, useRef } from "react";

/**
 * Harmonograph simulation — physically-based pendulum drawing.
 * Produces complex, organic Lissajous-like curves that feel hand-crafted.
 * Much more sophisticated than simple rotating shapes.
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
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    const onDown = () => { mouseRef.current.pressed = true; };
    const onUp = () => { mouseRef.current.pressed = false; };
    (parent || canvas).addEventListener("mousemove", onMouse);
    (parent || canvas).addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Harmonograph parameters — 4 pendulums
    const params = {
      f1: 2, f2: 3, f3: 2.002, f4: 3.003,  // frequencies
      p1: 0, p2: Math.PI / 2, p3: 0.1, p4: Math.PI / 4,  // phases
      d1: 0.003, d2: 0.003, d3: 0.002, d4: 0.002,  // damping
      a1: 0.38, a2: 0.38, a3: 0.15, a4: 0.15,  // amplitudes
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.9;
      const mouse = mouseRef.current;

      const speed = mouse.pressed ? 0.015 : 0.004;
      timeRef.current += speed;
      const globalT = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Mouse subtly shifts frequency ratios
      const fShift = (mouse.x - 0.5) * 0.01;
      const pShift = (mouse.y - 0.5) * 0.3;

      // Draw the harmonograph curve
      const POINTS = 2000;
      const DURATION = 40;

      ctx.beginPath();
      for (let i = 0; i < POINTS; i++) {
        const t = (i / POINTS) * DURATION + globalT;
        const decay1 = Math.exp(-params.d1 * (i / POINTS) * DURATION);
        const decay2 = Math.exp(-params.d2 * (i / POINTS) * DURATION);
        const decay3 = Math.exp(-params.d3 * (i / POINTS) * DURATION);
        const decay4 = Math.exp(-params.d4 * (i / POINTS) * DURATION);

        const x = cx +
          scale * params.a1 * Math.sin(t * (params.f1 + fShift) + params.p1 + pShift) * decay1 +
          scale * params.a3 * Math.sin(t * (params.f3 + fShift) + params.p3) * decay3;
        const y = cy +
          scale * params.a2 * Math.sin(t * params.f2 + params.p2 + pShift * 0.5) * decay2 +
          scale * params.a4 * Math.sin(t * params.f4 + params.p4) * decay4;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Gradient along the curve — brighter at the "drawing tip"
      ctx.strokeStyle = `rgba(139, 92, 246, ${mouse.pressed ? 0.18 : 0.12})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Draw a brighter recent segment (last 10% of curve)
      ctx.beginPath();
      for (let i = Math.floor(POINTS * 0.9); i < POINTS; i++) {
        const t = (i / POINTS) * DURATION + globalT;
        const decay1 = Math.exp(-params.d1 * (i / POINTS) * DURATION);
        const decay2 = Math.exp(-params.d2 * (i / POINTS) * DURATION);
        const decay3 = Math.exp(-params.d3 * (i / POINTS) * DURATION);
        const decay4 = Math.exp(-params.d4 * (i / POINTS) * DURATION);

        const x = cx +
          scale * params.a1 * Math.sin(t * (params.f1 + fShift) + params.p1 + pShift) * decay1 +
          scale * params.a3 * Math.sin(t * (params.f3 + fShift) + params.p3) * decay3;
        const y = cy +
          scale * params.a2 * Math.sin(t * params.f2 + params.p2 + pShift * 0.5) * decay2 +
          scale * params.a4 * Math.sin(t * params.f4 + params.p4) * decay4;

        if (i === Math.floor(POINTS * 0.9)) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(139, 92, 246, ${mouse.pressed ? 0.35 : 0.22})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

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
