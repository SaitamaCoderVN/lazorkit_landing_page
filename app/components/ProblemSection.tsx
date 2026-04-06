export default function ProblemSection() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-24">
      {/* Left: copy */}
      <div className="flex flex-col justify-center">
        <label
          className="text-[0.75rem] text-error font-bold uppercase tracking-[0.2em] mb-4"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          The Critical Risk
        </label>
        <h2
          className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          One bug in your bot = full wallet drained.
        </h2>
        <p
          className="text-on-surface-variant text-lg leading-relaxed mb-8"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Automation is powerful, but dangerous. Traditional setups give bots
          full control over your private keys. If the bot gets hacked, or its
          logic fails, your entire balance is gone in seconds.
        </p>
        <div className="bg-error/5 p-6 rounded-xl border-l-4 border-error hover:bg-error/10 transition-colors">
          <p
            className="text-sm text-error-dim italic"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            &quot;The average DeFi bot exploit costs users $240k per incident.
            Don&apos;t be a statistic.&quot;
          </p>
        </div>
      </div>

      {/* Right: abstract glow visual */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl status-pulse" />
        <div className="relative w-full max-w-md aspect-square rounded-2xl bg-surface-container-highest/30 flex items-center justify-center overflow-hidden">
          {/* Decorative diagonal lines inspired by the logo's 15° angle */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "repeating-linear-gradient(15deg, transparent, transparent 30px, rgba(177,161,255,0.3) 30px, rgba(177,161,255,0.3) 31px)",
            }}
          />
          <div className="relative z-10 text-center p-8">
            <span className="material-symbols-outlined text-error text-7xl mb-4 block">
              bug_report
            </span>
            <p
              className="text-error-dim text-sm uppercase tracking-widest"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              THREAT VECTOR: ACTIVE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
