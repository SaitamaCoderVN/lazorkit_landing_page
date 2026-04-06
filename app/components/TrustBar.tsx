import React from "react";

export default function TrustBar() {
  const pillars = [
    { icon: "shield_with_heart", label: "No private keys." },
    { icon: "verified_user", label: "No blind trust." },
    { icon: "gavel", label: "Fully enforced on-chain." },
  ];

  return (
    <section className="reveal w-full bg-surface-container-low/30 py-12 border-y border-outline-variant/5">
      <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {pillars.map((pillar, i) => (
          <React.Fragment key={pillar.label}>
            <div className="flex items-center gap-4 group cursor-default">
              <span className="material-symbols-outlined text-primary text-3xl transition-transform group-hover:scale-150">
                {pillar.icon}
              </span>
              <span
                className="text-2xl font-bold tracking-tight text-white uppercase"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {pillar.label}
              </span>
            </div>
            {i < pillars.length - 1 && (
              <div className="h-px md:h-12 w-24 md:w-px bg-outline-variant/20" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
