import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
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

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <MouseGlowProvider />
      <Navbar />
      <main className="pt-32">
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <KineticFlowSection />
        <TerminalSection />
        <FeaturesSection />
        <InsightSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
