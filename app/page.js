import HeroSection from "./components/HeroSection";
import SjefNetworkSection from "./components/SjefNetworkSection";
import ComparisonSection from "./components/ComparisonSection";

import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";

import Link from "next/link";
import DockNav from "./components/DockNav";

import CalculatorSection from "./components/CalculatorSection";

import BlueprintLines from "./components/BlueprintLines";

import TestimonialSection from "./components/TestimonialSection";

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <BlueprintLines />
      <DockNav />
      <HeroSection />
      <SjefNetworkSection />
      <ComparisonSection />
      <PricingSection />
      <CalculatorSection />
      <TestimonialSection />

      <FAQSection />
    </main>
  );
}
