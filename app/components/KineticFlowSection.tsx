"use client";

import React, { useEffect, useRef } from "react";

const nodes = [
  {
    icon: "smart_toy",
    title: "Agent",
    subtitle: "Request Initiation",
    type: "default",
  },
  {
    icon: "layers",
    title: "LazorKit",
    subtitle: "Control Intercept",
    type: "primary",
  },
  {
    icon: "rule",
    title: "Rules",
    subtitle: "Constraint Check",
    type: "rules",
  },
  {
    icon: "terminal",
    title: "Execution",
    subtitle: "On-Chain Action",
    type: "execution",
  },
];

export default function KineticFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="reveal max-w-screen-2xl mx-auto px-8 py-32 text-center">
      {/* Header */}
      <div className="mb-20">
        <label
          className="text-[0.75rem] text-primary font-bold uppercase tracking-[0.2em] mb-4 block"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Architecture
        </label>
        <h2
          className="text-4xl font-bold tracking-tight text-white uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Kinetic Flow
        </h2>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative py-12">
        {/* Animated data-flow line */}
        <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 overflow-hidden">
          <div className="flow-pulse" />
          <div className="flow-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {nodes.map((node, idx) => {
          const isPrimary = node.type === "primary";
          const isRules = node.type === "rules";
          const isExecution = node.type === "execution";

          return (
            <React.Fragment key={node.title}>
              <div
                className={[
                  "w-full md:w-1/4 p-6 rounded-xl flex flex-col items-center gap-4 group z-10",
                  "glass-panel border",
                  isRules ? "node-rules-pulse border-outline-variant/20" : "",
                  isExecution
                    ? "node-execution-allowed node-execution-blocked border-outline-variant/20"
                    : "",
                  isPrimary ? "border-primary/20" : "",
                  !isPrimary && !isRules && !isExecution
                    ? "border-outline-variant/20"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={[
                    "w-16 h-16 rounded-full flex items-center justify-center border transition-all",
                    isPrimary
                      ? "bg-primary/10 border-primary/30 group-hover:bg-primary/20"
                      : "bg-surface-container-highest border-outline-variant/30 group-hover:border-primary/50",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "material-symbols-outlined text-3xl transition-colors",
                      isPrimary ? "text-primary status-pulse" : "text-on-surface-variant group-hover:text-primary",
                    ].join(" ")}
                  >
                    {node.icon}
                  </span>
                </div>
                <div>
                  <h3
                    className={[
                      "font-bold uppercase tracking-widest text-sm mb-1",
                      isPrimary ? "text-primary" : "text-white",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {node.title}
                  </h3>
                  <p
                    className="text-[0.7rem] text-on-surface-variant uppercase font-medium"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    {node.subtitle}
                  </p>
                </div>
              </div>
              {idx < nodes.length - 1 && (
                <span className="hidden md:flex items-center text-outline/40 text-2xl z-10 select-none">›</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
