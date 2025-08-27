
import AdventureSection from "./components/AdventureSection";
import BestHostsSection from "./components/BestHostsSection";
import BrowseCategorySection from "./components/BrowseCategorySection";
import CuratedExperiences from "./components/CuratedExperiences";
import ExploreNearby from "./components/ExploreNearby";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks ";
import HowItWorksSection from "./components/HowItWorks ";
import JustForYouSection from "./components/JustForYouSection";
import LastMinuteDealsSection from "./components/LastMinuteDealsSection";
import NationalDayDealsSection from "./components/NationalDayDealsSection";
import PromotionalVideoSection from "./components/PromotionalVideoSection";
import TiltedCardSection from "./components/ui/TiltedCardSection";
import WhyPortalSection from "./components/WhyPortalSection";

export default function Home() {
  return (

  <div className="max-w-7xl mx-auto px-4 ">
  <HeroSection/>
  <JustForYouSection/>
  <LastMinuteDealsSection/>
  <NationalDayDealsSection/>
  <HowItWorks/>
  <CuratedExperiences/>
  <AdventureSection/>
  <BrowseCategorySection/>
  <ExploreNearby/>
  <BestHostsSection/>
  <WhyPortalSection/>
  <PromotionalVideoSection/>
  
  </div>
  );
}

