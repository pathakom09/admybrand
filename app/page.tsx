import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/header";
import InfoBanner from "@/components/sections/InfoBanner";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <WhoWeAreSection />
      <FeaturesSection />
      <InfoBanner/>
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}