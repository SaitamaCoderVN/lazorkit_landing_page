import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedCards from "./components/FeaturedCards";
import ProblemSection from "./components/ProblemSection";
import KineticFlowSection from "./components/KineticFlowSection";
import TerminalSection from "./components/TerminalSection";
import FeaturesSection from "./components/FeaturesSection";
import FloatingTerminals from "./components/FloatingTerminals";
import InsightSection from "./components/InsightSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import MouseGlowProvider from "./components/MouseGlowProvider";
import FingerprintEffect from "./components/FingerprintEffect";
import InfiniteZLoop from "./components/InfiniteZLoop";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <MouseGlowProvider />
      <FingerprintEffect />
      <Navbar />
      <main className="pt-32">
        <HeroSection />
        <FeaturedCards />
        <ProblemSection />
        <KineticFlowSection />
        <TerminalSection />
        <FeaturesSection />
        <FloatingTerminals />
        <InsightSection />
        <CTASection />
      </main>
      <InfiniteZLoop />
      <Footer />
    </>
  );
}
