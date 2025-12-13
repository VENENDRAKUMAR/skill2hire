import Hero from "./Components/Hero";

import RecruitmentLifecycle from "./Components/Recruitment";
import Roadmap from "./Components/Roadmap";
import IntelligentHiring from "./Components/intelligentHiring";

import JobSearchSection from "./Components/JobsearchSection";
import BenefitsSection from "./Components/BenefitSection";
import TestimonialSection from "./Components/Testimonials";
import PartnerCircle from "./Components/PartnerCircle";
import PricingSection from "./Components/Pricing";
import FinalCTASection from "./Components/FinalCtaSection";
import ContactSection from "./Components/ContactSection";
export default function Home() {
  return (
   <>
  <Hero/>

 <RecruitmentLifecycle/>
 <Roadmap/>
 <IntelligentHiring/>
  <JobSearchSection/>
  <BenefitsSection/>
  <TestimonialSection/>
  <PartnerCircle/>
  <PricingSection/>
  <FinalCTASection/>
  <ContactSection/>
   </>
  );
}
