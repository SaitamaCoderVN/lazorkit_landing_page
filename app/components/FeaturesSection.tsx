/**
 * Features section — no generic icons.
 * Uses numbered entries with distinct left-aligned layout
 * to feel authored, not template-generated.
 */

const features = [
  {
    num: "01",
    title: "Scoped permissions, not blank checks",
    description:
      "You define the boundaries — SPL token, amount, recipient, instruction type. Your agent operates within those bounds. Anything outside gets dropped before it reaches Solana.",
  },
  {
    num: "02",
    title: "Sessions expire. Keys never leave.",
    description:
      "Agents get temporary session credentials tied to a passkey on your device. Not a copy of your private key — a scoped, revocable permission slip.",
  },
  {
    num: "03",
    title: "Every command is intercepted",
    description:
      "Nothing goes straight to the Solana network. LazorKit validates every agent instruction against your ruleset in real time. Rogue transactions get caught, logged, and killed.",
  },
  {
    num: "04",
    title: "Enforcement lives on-chain",
    description:
      "Constraints aren't just client-side checks that can be bypassed. They're enforced at the Solana program level — cryptographically attested and verifiable on-chain.",
  },
  {
    num: "05",
    title: "Operators and owners are separate roles",
    description:
      "Owners set policy. Operators execute within policy. A compromised agent can never escalate its own permissions.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="reveal max-w-screen-2xl mx-auto px-8 pt-20 pb-40">
      {/* Header — left-aligned, not centered */}
      <div className="mb-16 max-w-2xl">
        <p
          className="text-[0.75rem] text-[#8b5cf6] mb-4 tracking-wide"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          How it works
        </p>
        <h2
          className="text-4xl font-bold tracking-tight text-white leading-[1.15]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Five layers between your bot
          <br />
          and your balance.
        </h2>
      </div>

      {/* Feature list — numbered, not icon-grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        {features.map((f) => (
          <div key={f.num} className="flex gap-6">
            {/* Number */}
            <span
              className="text-[2rem] font-bold text-[#1a1a1a] leading-none shrink-0 w-12 tabular-nums"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {f.num}
            </span>
            <div>
              <h3
                className="font-semibold text-white mb-2 text-[1.0625rem] leading-snug"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-[0.9375rem] text-[#777777] leading-[1.7]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
