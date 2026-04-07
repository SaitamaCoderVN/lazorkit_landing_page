export default function AmbientOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Center viewport radial glow — key brightness layer */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%)",
        }}
      />

      {/* Top-left purple orb */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top-right white glow */}
      <div
        className="absolute -top-20 right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Mid-page right purple orb */}
      <div
        className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Mid-page left white glow */}
      <div
        className="absolute top-[55%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.035]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Bottom-right purple orb */}
      <div
        className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Bottom center white glow */}
      <div
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
