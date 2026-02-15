import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PricingCalculator } from "@/components/PricingCalculator";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingCalculator />
      <WhyChooseUs />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default Index;
