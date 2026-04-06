export default function CTASection() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 pb-32">
      <div className="relative bg-gradient-to-br from-surface-container-low to-surface-container-highest rounded-[2rem] p-16 overflow-hidden border border-primary/10 group">
        {/* Background diagonal texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(15deg, transparent, transparent 40px, rgba(177,161,255,0.4) 40px, rgba(177,161,255,0.4) 41px)",
          }}
        />
        {/* Ambient glow top-right */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110 overflow-hidden">
          <div
            className="w-full h-full float-slow"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, rgba(177,161,255,0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <h2
            className="text-5xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready for kinetic control?
          </h2>
          <p
            className="text-lg text-on-surface-variant mb-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Join the developers and funds building secure automation on
            LazorKit.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="gradient-animate bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-bold px-10 py-5 rounded-md hover:scale-105 transition-transform shadow-[0_0_20px_rgba(177,161,255,0.2)]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Get Early Access
            </button>
            <button
              className="glass-panel text-white font-bold px-10 py-5 rounded-md border border-white/10"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Read the Whitepaper
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary status-pulse" />
            <span
              className="text-[0.65rem] text-on-surface-variant uppercase tracking-widest"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Currently in private beta // Applications open
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
