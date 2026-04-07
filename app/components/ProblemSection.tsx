export default function ProblemSection() {
  return (
    <section className="reveal-left max-w-screen-2xl mx-auto px-8 py-40 grid grid-cols-1 md:grid-cols-2 gap-24">
      {/* Left: copy */}
      <div className="flex flex-col justify-center">
        <h2
          className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          One bug in your bot = full wallet drained.
        </h2>
        <p
          className="text-[#999999] text-lg leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Automation is powerful, but dangerous. Traditional setups give bots
          full control over your private keys. If the bot gets hacked, or its
          logic fails, your entire balance is gone in seconds.
        </p>
        <div className="border-l-2 border-red-500/60 pl-6 py-1">
          <p
            className="text-sm text-[#737373] italic leading-relaxed"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            &quot;The average DeFi bot exploit costs users $240k per incident.
            Don&apos;t be a statistic.&quot;
          </p>
        </div>
      </div>

      {/* Right: Stitch design image */}
      <div className="relative flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="System failure abstract"
          className="w-full max-w-md rounded-2xl grayscale contrast-125 opacity-30 mix-blend-lighten"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJwUebpPp431XBTuXhvaRS4TUB6D53gCCPedFFFHUMElcwDa40MKSQ9RniWWUj9y31rWjInToP4QsIjRc2nEZyRXkQkJB9u2gVTCGH4VfMSqVQg-pskgRb27Sd82GY50L9_hbYDtEejEdBz-TfLDelSGXuhKHTSzlR2S6WghKuAOqDtNEYb36Nd-kHF_9hqOhEYs8Uj1V-rI0EfV3qscBxZE4_y44TTbgg54en0WWH_tBFafQCAlrvDbMaqJgtLmtmGOXCytEHPCU"
        />
      </div>
    </section>
  );
}
