import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedCards from "./components/FeaturedCards";
import TrustBar from "./components/TrustBar";
import ProblemSection from "./components/ProblemSection";
import KineticFlowSection from "./components/KineticFlowSection";
import TerminalSection from "./components/TerminalSection";
import FeaturesSection from "./components/FeaturesSection";
import InsightSection from "./components/InsightSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import MouseGlowProvider from "./components/MouseGlowProvider";
import ScrollProgress from "./components/ScrollProgress";
import FingerprintEffect from "./components/FingerprintEffect";
import DraggableSections from "./components/DraggableSections";
import FloatingTerminals from "./components/FloatingTerminals";
import InfiniteZLoop from "./components/InfiniteZLoop";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <MouseGlowProvider />
      <ScrollProgress />
      <FingerprintEffect />
      <Navbar />
      <main className="pt-32">
        <HeroSection />
        <FeaturedCards />

        {/* Draggable content sections */}
        <DraggableSections>
          <TrustBar />
          <ProblemSection />
          <KineticFlowSection />
        </DraggableSections>

        {/* Interactive terminal playground with 3D spinner */}
        <FloatingTerminals />

        <DraggableSections>
          <TerminalSection />
          <FeaturesSection />
          <InsightSection />
        </DraggableSections>

        <CTASection />
      </main>

      {/* Infinite stacking LAZORKIT text — scroll-driven */}
      <InfiniteZLoop />

      <Footer />
    </>
  );
}
