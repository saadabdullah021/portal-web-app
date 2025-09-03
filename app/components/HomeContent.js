
"use client";

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
import { useEffect, useMemo, useState } from "react";

import WhyPortalSection from "./HomeComponents/WhyPortalSection";
import axios from '@/lib/axios';

export default function HomeContent() {
  const [homeComponents, setHomeComponents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchHome = async () => {
      try {
        const { data } = await axios.get('/get-home-components');
        if (!mounted) return;
        setHomeComponents(Array.isArray(data?.data) ? data.data : []);
      } catch {
        setHomeComponents([]);
      }
    };
    fetchHome();
    return () => { mounted = false; };
  }, []);

  const renderedSections = useMemo(() => {
    return homeComponents.map((section, idx) => {
      if (section.component_design_type === 'grid') {
        return <JustForYouSection key={`grid-${section.component_id || idx}`} items={section.items}/>;
      }
      if (section.component_design_type === 'slider' || section.component_title === 'Check out homes') {
        return <LastMinuteDealsSection key={`slider-${section.component_id || idx}`} items={section.items}/>;
      }
      return null;
    }).filter(Boolean);
  }, [homeComponents]);

  return (

  <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 ">
  <HeroSection/>
  {renderedSections}
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

