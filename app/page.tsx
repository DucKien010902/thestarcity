import { ContactFooterSection } from "./components/ContactFooterSection";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { EcosystemSection } from "./components/EcosystemSection";
import { InspirationSection } from "./components/InspirationSection";
import { IntroSection } from "./components/IntroSection";
import { LocationSection } from "./components/LocationSection";
import { OverviewSection } from "./components/OverviewSection";
import { ParkSection } from "./components/ParkSection";
import { ProjectSection } from "./components/ProjectSection";
import { SectionPager } from "./components/SectionPager";
import { ValueSection } from "./components/ValueSection";

export default function Home() {
  return (
    <SectionPager>
      <HomeHeroSection />
      <InspirationSection />
      <IntroSection />
      <OverviewSection />
      <ProjectSection />
      <LocationSection />
      <ValueSection />
      <ParkSection />
      <EcosystemSection />
      <ContactFooterSection />
    </SectionPager>
  );
}
