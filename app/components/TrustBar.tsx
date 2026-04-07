export default function TrustBar() {
  return (
    <section className="reveal w-full py-16 border-y border-white/8">
      <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <span
          className="text-[#737373] text-sm"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          No private keys.
        </span>
        <span className="hidden md:block text-[#444444]">/</span>
        <span
          className="text-[#737373] text-sm"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          No blind trust.
        </span>
        <span className="hidden md:block text-[#444444]">/</span>
        <span
          className="text-[#737373] text-sm"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Fully enforced on-chain.
        </span>
      </div>
    </section>
  );
}
