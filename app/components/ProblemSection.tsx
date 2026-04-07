export default function ProblemSection() {
  return (
    <section className="reveal-left max-w-screen-2xl mx-auto px-8 py-32">
      <div className="max-w-3xl">
        <p
          className="text-[0.75rem] text-red-400/80 mb-5 tracking-wide"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          The risk
        </p>
        <h2
          className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 leading-[1.12]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          A single bug in your trading bot
          <br />
          can empty your entire wallet.
        </h2>
        <p
          className="text-[1.0625rem] text-[#888888] leading-[1.7] mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Most bot setups hand over your private key — or something equivalent.
          If the bot&apos;s logic has a flaw, or it gets exploited, there&apos;s no
          safety net. The average DeFi bot exploit costs users $240k per incident.
        </p>
        <div className="border-l-2 border-red-400/40 pl-6">
          <p
            className="text-[0.9375rem] text-[#666666] italic leading-[1.7]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            &ldquo;We lost 80 SOL overnight because our sniper bot got fed a
            malicious token contract. The bot had full key access. There was
            nothing to stop it.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
