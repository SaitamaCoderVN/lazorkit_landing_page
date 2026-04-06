const features = [
  {
    icon: "policy",
    label: "PERMISSION_ENGINE",
    title: "Intent-Based Constraints",
    description:
      "Define exactly what actions a bot is allowed to take — by type, amount, and counterparty. Rules are enforced before any transaction reaches the network.",
  },
  {
    icon: "key",
    label: "CRYPTOGRAPHIC_CORE",
    title: "Passkey Sessionkeys",
    description:
      "Session authorization is tied to a passkey — not a private key. Bots operate with scoped, time-limited credentials that can be revoked instantly.",
  },
  {
    icon: "sensors",
    label: "SIGNAL_INTERCEPT",
    title: "Real-Time Interception",
    description:
      "Every agent command is intercepted and validated at the control surface before it is broadcast. No rogue transaction reaches the chain.",
  },
  {
    icon: "lock",
    label: "SECURITY_LAYER",
    title: "Zero Private Key Exposure",
    description:
      "Private keys never leave your device and are never delegated. Bots are granted execution rights, not ownership rights.",
  },
  {
    icon: "gavel",
    label: "CONSENSUS_LAYER",
    title: "On-Chain Enforcement",
    description:
      "Constraint logic is enforced at the protocol level — not just in the client. Rules are cryptographically attested and verifiable on-chain.",
  },
  {
    icon: "group",
    label: "ACCESS_CONTROL",
    title: "Operator / Owner Split",
    description:
      "Owners authorize policy. Operators execute within policy. The two roles are fully decoupled, enabling safe multi-agent and multi-party environments.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 py-32">
      {/* Header */}
      <div className="mb-16 text-center">
        <label
          className="text-[0.75rem] text-primary font-bold uppercase tracking-[0.2em] mb-4 block"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          CAPABILITY_MATRIX
        </label>
        <h2
          className="text-4xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Built for the Agentic Era
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.label}
            className="glass-panel rounded-xl p-6 group border border-outline-variant/15"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20 relative z-10">
              <span className="material-symbols-outlined text-primary text-2xl">{f.icon}</span>
            </div>
            {/* Label */}
            <div
              className="text-[0.65rem] uppercase tracking-widest text-primary/60 mb-2 relative z-10"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {f.label}
            </div>
            {/* Title */}
            <h3
              className="font-bold text-white mb-3 relative z-10"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {f.title}
            </h3>
            {/* Description */}
            <p
              className="text-sm text-on-surface-variant leading-relaxed relative z-10"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
