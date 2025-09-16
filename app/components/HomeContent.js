
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

import PromotionalVideoSection from "./HomeComponents/PromotionalVideoSection";
import { useEffect, useMemo, useState, useRef } from "react";
import { usePopup } from "../contexts/PopupContext";

import WhyPortalSection from "./HomeComponents/WhyPortalSection";
import axios from '@/lib/axios';
import Shimmer from './ui/Shimmer';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

export default function HomeContent() {
  const [homeComponents, setHomeComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const { i18n } = useTranslation();
  const { popups } = usePopup();
  const pathname = usePathname();
  const hasFetchedHomeRef = useRef(false);
  const lastLanguageRef = useRef(i18n.language);


  const isAnyPopupOpen = useMemo(() => {
    return popups.login || popups.signup || popups.verification || popups.confirmIdentity;
  }, [popups.login, popups.signup, popups.verification, popups.confirmIdentity]);

  useEffect(() => {
    // Only make API calls on the home page
    if (pathname !== '/') {
      return;
    }

    if (isAnyPopupOpen) {
      return;
    }

    // Check if language actually changed
    if (lastLanguageRef.current === i18n.language && homeComponents.length > 0) {
      return;
    }

    // Update the last language
    lastLanguageRef.current = i18n.language;
    
    const fetchHome = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/get-home-components?offset=0&perPage=8', {
          params: {
            language: i18n.language
          }
        });
        
        const components = Array.isArray(data?.data?.records) ? data.data?.records : [];
        setHomeComponents(components);
        setIsLoading(false);
      } catch (error) {
        console.error('HomeContent - API error:', error);
        setHomeComponents([]);
        setIsLoading(false);
      }
    };
    
    fetchHome();
  }, [i18n.language, isAnyPopupOpen, pathname]);

const renderedSections = useMemo(() => {
  console.log('renderedSections - homeComponents:', homeComponents);
  if (homeComponents.length === 0) {
    console.log('No home components, returning null');
    return null;
  }
  
  return homeComponents
    .map((section, idx) => {
      let Comp = null;
      const uniqueKey = `section-${section.component_id || `fallback-${idx}`}`;

      if (section.component_design_type === 'grid') {
        Comp = (
          <JustForYouSection
            key={`grid-${uniqueKey}`}
            items={section.items?.records || []}
            sectionData={section}
          />
        );
      }
      if (
        section.component_design_type === 'slider' 
      ) {
        Comp = (
          <LastMinuteDealsSection
            data={section}
            key={`slider-${uniqueKey}`}
            items={section.items?.records || []}
          />
        );
      }

      if (!Comp) return null;

      // check position
      const isFirst = idx === 0;
      const isLast = idx === homeComponents.length - 1;

      return (
        <div
          key={`wrapper-${uniqueKey}`}
          className={`
            ${isFirst ? "pt-8  lg:pt-16 pb-0" : ""}
            ${isLast ? "lg:pt-16 pt-8 pb-8 lg:pb-16" : ""}
            ${!isFirst && !isLast ? "lg:pt-16 pt-8 pb-0" : ""}
          `}
        >
          {Comp}
        </div>
      );
    })
    .filter(Boolean);
}, [homeComponents]);

  return (
    <div 
      className={`max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <HeroSection/>
      
      {isLoading ? (
        <div className="space-y-16">
          <div className="pt-8 lg:pt-16">
            <div className="animate-pulse mb-8">
              <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 w-96 rounded"></div>
            </div>
            <Shimmer type="grid" count={4} />
          </div>
          
          <div className="pt-8 lg:pt-16">
            <div className="animate-pulse mb-8">
              <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 w-96 rounded"></div>
            </div>
            <Shimmer type="slider" count={4} />
          </div>
          
          <div className="pt-8 lg:pt-16">
            <div className="animate-pulse mb-8">
              <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 w-96 rounded"></div>
            </div>
            <Shimmer type="grid" count={6} />
          </div>
        </div>
      ) : (
        renderedSections || (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No content available</h3>
            <p className="text-gray-500">Please try refreshing the page</p>
          </div>
        )
      )}

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

