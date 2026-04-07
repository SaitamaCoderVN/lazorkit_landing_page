"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface DraggableSectionsProps {
  children: React.ReactNode;
}

/**
 * Wraps child elements and makes them drag-and-drop reorderable.
 * Each section gets a drag handle (grip icon) in the top-right corner.
 * During drag: the picked section lifts with a shadow; a gap opens
 * at the insertion point; on release the sections animate to their new order.
 */
export default function DraggableSections({ children }: DraggableSectionsProps) {
  const items = React.Children.toArray(children);
  const [order, setOrder] = useState<number[]>(items.map((_, i) => i));
  const [dragging, setDragging] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragElRef = useRef<HTMLDivElement | null>(null);

  // Reset order if children count changes
  useEffect(() => {
    setOrder(items.map((_, i) => i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleDragStart = useCallback(
    (orderIdx: number, e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const target = (e.currentTarget as HTMLElement).closest("[data-drag-section]") as HTMLDivElement | null;
      if (!target) return;

      setDragging(orderIdx);
      setOverIndex(orderIdx);
      dragStartY.current = e.clientY;
      dragElRef.current = target;

      target.style.zIndex = "50";
      target.style.transition = "box-shadow 0.2s ease";
      target.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)";
      target.style.opacity = "0.9";
      target.setPointerCapture(e.pointerId);
    },
    []
  );

  const handleDragMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragging === null || !containerRef.current) return;

      // Determine which slot we're over
      const sections = containerRef.current.querySelectorAll<HTMLDivElement>("[data-drag-section]");
      let closest = dragging;
      let closestDist = Infinity;

      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setOverIndex(closest);
    },
    [dragging]
  );

  const handleDragEnd = useCallback(() => {
    if (dragging === null || overIndex === null) return;

    // Reorder
    if (dragging !== overIndex) {
      setOrder((prev) => {
        const next = [...prev];
        const [removed] = next.splice(dragging, 1);
        next.splice(overIndex, 0, removed);
        return next;
      });
    }

    // Clean up drag styles
    if (dragElRef.current) {
      dragElRef.current.style.zIndex = "";
      dragElRef.current.style.boxShadow = "";
      dragElRef.current.style.opacity = "";
      dragElRef.current.style.transition = "";
    }

    setDragging(null);
    setOverIndex(null);
    dragElRef.current = null;
  }, [dragging, overIndex]);

  const orderedItems = order.map((originalIdx) => items[originalIdx]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
      onPointerCancel={handleDragEnd}
      className="relative"
    >
      {orderedItems.map((child, idx) => {
        const isBeingDragged = dragging === idx;
        const isDropTarget = dragging !== null && overIndex === idx && dragging !== idx;

        return (
          <div
            key={order[idx]}
            data-drag-section
            className="relative group/drag"
            style={{
              transition: isBeingDragged ? "none" : "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
              transform: isDropTarget
                ? dragging !== null && dragging < idx
                  ? "translateY(-8px)"
                  : "translateY(8px)"
                : "translateY(0)",
            }}
          >
            {/* Drag handle — appears on hover */}
            <button
              onPointerDown={(e) => handleDragStart(idx, e)}
              className="absolute top-4 right-4 z-40 opacity-[0.15] group-hover/drag:opacity-60 hover:!opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-[#1a1a1a] border border-[#222222] rounded-md p-1.5 hover:border-[#333333]"
              aria-label="Drag to reorder"
              title="Drag to reorder"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="4" cy="3" r="1" fill="#525252" />
                <circle cx="10" cy="3" r="1" fill="#525252" />
                <circle cx="4" cy="7" r="1" fill="#525252" />
                <circle cx="10" cy="7" r="1" fill="#525252" />
                <circle cx="4" cy="11" r="1" fill="#525252" />
                <circle cx="10" cy="11" r="1" fill="#525252" />
              </svg>
            </button>

            {/* Drop indicator line */}
            {isDropTarget && (
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-[#8b5cf6] rounded-full z-30" />
            )}

            {child}
          </div>
        );
      })}
    </div>
  );
}
