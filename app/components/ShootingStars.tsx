"use client";

import { useEffect, useRef } from "react";

/**
 * Large, bright white shooting stars that sweep diagonally across the viewport.
 * Thick, long streaks with a glowing head — clearly visible on dark backgrounds.
 */

interface Star {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  width: number;
  delay: number;
  active: boolean;
  timer: number;
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const STAR_COUNT = 6;
    const stars: Star[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: 0, y: 0,
        len: 200 + Math.random() * 300,
        speed: 6 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.2,
        width: 1.5 + Math.random() * 1.5,
        delay: 1000 + Math.random() * 3000,
        active: false,
        timer: Math.random() * 3000,
      });
    }

    const resetStar = (s: Star) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (Math.random() > 0.4) {
        s.x = Math.random() * w * 0.8;
        s.y = -30;
      } else {
        s.x = -30;
        s.y = Math.random() * h * 0.5;
      }
      s.active = true;
    };

    let lastTime = performance.now();

    const draw = () => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        if (!s.active) {
          s.timer += dt;
          if (s.timer >= s.delay) {
            s.timer = 0;
            resetStar(s);
          }
          continue;
        }

        s.x += s.speed * 0.75;
        s.y += s.speed * 0.55;

        // Tail
        const tailX = s.x - (s.len * 0.75);
        const tailY = s.y - (s.len * 0.55);

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.4, `rgba(255, 255, 255, ${s.opacity * 0.15})`);
        gradient.addColorStop(0.8, `rgba(255, 255, 255, ${s.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glowing head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width + 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 0.8})`;
        ctx.fill();

        // Soft glow around head
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
        glow.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.4})`);
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        if (s.x > w + 60 || s.y > h + 60) {
          s.active = false;
          s.timer = 0;
          s.delay = 1000 + Math.random() * 3000;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
