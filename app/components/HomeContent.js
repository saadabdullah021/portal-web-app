
import AdventureSection from "./HomeComponents/AdventureSection";
import BestHostsSection from "./HomeComponents/BestHostsSection";
import BrowseCategorySection from "./HomeComponents/BrowseCategorySection";
import CuratedExperiences from "./HomeComponents/CuratedExperiences";
import ExploreNearby from "./HomeComponents/ExploreNearby";
import HeroSection from "./HomeComponents/HeroSection";
import HowItWorks from "./HomeComponents/HowItWorks ";

import JustForYouSection from "./HomeComponents/JustForYouSection";
import LastMinuteDealsSection from "./HomeComponents/LastMinuteDealsSection";
import NationalDayDealsSection from "./HomeComponents/NationalDayDealsSection";
import PromotionalVideoSection from "./HomeComponents/PromotionalVideoSection";

import WhyPortalSection from "./HomeComponents/WhyPortalSection";

export default function HomeContent() {
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

