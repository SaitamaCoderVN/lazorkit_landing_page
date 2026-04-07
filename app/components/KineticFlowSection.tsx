"use client";

import React, { useEffect, useRef, useState } from "react";

const nodes = [
  { icon: "smart_toy", title: "Agent", subtitle: "Request Initiation" },
  { icon: "layers", title: "LazorKit", subtitle: "Control Intercept" },
  { icon: "rule", title: "Rules", subtitle: "Constraint Check" },
  { icon: "terminal", title: "Execution", subtitle: "Solana Transaction" },
];

export default function KineticFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  // Sequential lighting: each node lights up one after another, then loops
  useEffect(() => {
    if (!isVisible) return;

    const CYCLE_TIME = 1200; // ms per node
    let step = 0;

    const interval = setInterval(() => {
      setActiveNode(step % nodes.length);
      step++;
    }, CYCLE_TIME);

    // Start immediately
    setActiveNode(0);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="reveal max-w-screen-2xl mx-auto px-8 py-40 text-center">
      {/* Header */}
      <div className="mb-24">
        <h2
          className="text-4xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Kinetic Flow
        </h2>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative py-12">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-px -translate-y-1/2">
          <div className="w-full h-full bg-[#1a1a1a]" />
          {/* Animated pulse traveling along the line */}
          <div className="flow-pulse" />
          <div className="flow-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {nodes.map((node, idx) => {
          const isActive = activeNode === idx;
          const wasActive = activeNode > idx;

          return (
            <React.Fragment key={node.title}>
              <div
                className="w-full md:w-1/4 p-6 rounded-xl flex flex-col items-center gap-4 z-10 bg-[#1a1a1a] border transition-all duration-500"
                style={{
                  borderColor: isActive ? "#8b5cf6" : wasActive ? "rgba(139,92,246,0.15)" : "#1a1a1a",
                  boxShadow: isActive
                    ? "0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.05)"
                    : "none",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: isActive ? "rgba(139,92,246,0.15)" : "#161616",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: isActive ? "rgba(139,92,246,0.3)" : "#222222",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-2xl transition-colors duration-500"
                    style={{ color: isActive ? "#8b5cf6" : wasActive ? "#8b5cf6" : "#666666" }}
                  >
                    {node.icon}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-bold text-sm mb-1 transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: isActive ? "#8b5cf6" : wasActive ? "#ffffff" : "#999999",
                    }}
                  >
                    {node.title}
                  </h3>
                  <p
                    className="text-[0.7rem] text-[#666666]"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    {node.subtitle}
                  </p>
                </div>
              </div>

              {/* Arrow between nodes */}
              {idx < nodes.length - 1 && (
                <div className="hidden md:flex items-center z-10 shrink-0" aria-hidden="true">
                  <svg
                    width="32" height="32" viewBox="0 0 32 32" fill="none"
                    className="transition-all duration-500"
                    style={{
                      opacity: activeNode >= idx ? 1 : 0.3,
                      filter: activeNode === idx ? "drop-shadow(0 0 4px rgba(139,92,246,0.4))" : "none",
                    }}
                  >
                    <path
                      d="M6 16h20M20 10l6 6-6 6"
                      stroke={activeNode >= idx ? "#8b5cf6" : "#444444"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
