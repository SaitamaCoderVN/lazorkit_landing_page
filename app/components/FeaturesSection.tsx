const features = [
  {
    icon: "policy",
    title: "Intent-Based Constraints",
    description:
      "Define exactly what actions a bot is allowed to take — by type, amount, and counterparty. Rules are enforced before any transaction reaches the network.",
  },
  {
    icon: "key",
    title: "Passkey Sessionkeys",
    description:
      "Session authorization is tied to a passkey — not a private key. Bots operate with scoped, time-limited credentials that can be revoked instantly.",
  },
  {
    icon: "sensors",
    title: "Real-Time Interception",
    description:
      "Every agent command is intercepted and validated at the control surface before it is broadcast. No rogue transaction reaches the chain.",
  },
  {
    icon: "lock",
    title: "Zero Private Key Exposure",
    description:
      "Private keys never leave your device and are never delegated. Bots are granted execution rights, not ownership rights.",
  },
  {
    icon: "gavel",
    title: "On-Chain Enforcement",
    description:
      "Constraint logic is enforced at the protocol level — not just in the client. Rules are cryptographically attested and verifiable on-chain.",
  },
  {
    icon: "group",
    title: "Operator / Owner Split",
    description:
      "Owners authorize policy. Operators execute within policy. The two roles are fully decoupled, enabling safe multi-agent and multi-party environments.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 py-40">
      {/* Header — no label tag */}
      <div className="mb-20 text-center">
        <h2
          className="text-4xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Built for the Agentic Era
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#1a1a1a]">
        {features.map((f) => (
          <div
            key={f.title}
            data-glow
            className="bg-[#111111] p-8 hover:bg-[#0f0f0f] transition-colors"
          >
            {/* Icon — neutral background, no purple circle */}
            <div className="w-10 h-10 rounded-lg bg-[#161616] flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-[#737373] text-xl">{f.icon}</span>
            </div>
            {/* Title */}
            <h3
              className="font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {f.title}
            </h3>
            {/* Description */}
            <p
              className="text-sm text-[#737373] leading-relaxed"
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
