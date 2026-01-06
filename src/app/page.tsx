import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyFintechSection } from "@/components/sections/WhyFintechSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ScenariosSection } from "@/components/sections/ScenariosSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { OnboardingSection } from "@/components/sections/OnboardingSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { ROISection } from "@/components/sections/ROISection";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhyFintechSection />
        <ComparisonSection />
        <ScenariosSection />
        <FeaturesSection />
        <OutcomesSection />
        <SecuritySection />
        <OnboardingSection />
        <IntegrationsSection />
        <ROISection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
