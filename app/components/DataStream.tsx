"use client";

import { useEffect, useRef } from "react";

/**
 * Animated data stream / matrix-style visualization.
 * Vertical streams of small data blocks flowing downward, all in purple.
 * Pure canvas, no deps.
 */

interface Stream {
  x: number;
  speed: number;
  blocks: { y: number; len: number; alpha: number }[];
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const streamsRef = useRef<Stream[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initStreams = (w: number, h: number) => {
      const cols = Math.floor(w / 16);
      const streams: Stream[] = [];
      for (let i = 0; i < cols; i++) {
        const x = i * 16 + 8;
        const blockCount = 3 + Math.floor(Math.random() * 4);
        const blocks = [];
        for (let b = 0; b < blockCount; b++) {
          blocks.push({
            y: Math.random() * h * 1.5 - h * 0.5,
            len: 4 + Math.random() * 12,
            alpha: 0.04 + Math.random() * 0.1,
          });
        }
        streams.push({
          x,
          speed: 0.3 + Math.random() * 0.6,
          blocks,
        });
      }
      streamsRef.current = streams;
    };

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
      initStreams(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const streams = streamsRef.current;
      for (const stream of streams) {
        for (const block of stream.blocks) {
          block.y += stream.speed;
          if (block.y > h + 20) {
            block.y = -block.len - Math.random() * h * 0.5;
          }

          // Draw block
          ctx.fillStyle = `rgba(139, 92, 246, ${block.alpha})`;
          ctx.fillRect(stream.x - 2, block.y, 4, block.len);

          // Leading bright pixel
          ctx.fillStyle = `rgba(139, 92, 246, ${block.alpha * 2.5})`;
          ctx.fillRect(stream.x - 1.5, block.y + block.len - 2, 3, 2);
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

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" aria-hidden="true" />;
}
