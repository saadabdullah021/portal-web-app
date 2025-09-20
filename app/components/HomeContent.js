
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
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { usePopup } from "../contexts/PopupContext";

import WhyPortalSection from "./HomeComponents/WhyPortalSection";
import axios from '@/lib/axios';
import Shimmer from './ui/Shimmer';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Loading from '../loading';

export default function HomeContent() {
  const [homeComponents, setHomeComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const { i18n } = useTranslation();
  const { popups } = usePopup();
  const pathname = usePathname();
  const hasFetchedHomeRef = useRef(false);
  const lastLanguageRef = useRef(i18n.language);


  const isAnyPopupOpen = useMemo(() => {
    return popups.login || popups.signup || popups.verification || popups.confirmIdentity;
  }, [popups.login, popups.signup, popups.verification, popups.confirmIdentity]);

  const fetchHome = useCallback(async (offset = 0, append = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      
      const { data } = await axios.get(`/get-home-components?offsetComponents=${offset}&perPageComponents=1`, {
        params: {
          language: i18n.language
        }
      });
      
      const components = Array.isArray(data?.data?.records) ? data.data?.records : [];
      const totalRecords = data?.data?.total || 0;
      const perPage = 1;
      
      if (append) {
        setHomeComponents(prev => [...prev, ...components]);
        setCurrentOffset(prev => prev + perPage);
      } else {
        setHomeComponents(components);
        setCurrentOffset(perPage);
      }
      
      setHasMore(data?.data?.totalRecords > perPage && (offset + perPage) < data?.data?.totalRecords);
      
      if (append) {
        setIsLoadingMore(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('HomeContent - API error:', error);
      if (!append) {
        setHomeComponents([]);
      }
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [i18n.language]);

  const loadMoreComponents = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      fetchHome(currentOffset, true);
    }
  }, [isLoadingMore, hasMore, currentOffset, fetchHome]);

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    if (isAnyPopupOpen) {
      return;
    }

    if (lastLanguageRef.current === i18n.language && homeComponents.length > 0) {
      return;
    }

    lastLanguageRef.current = i18n.language;
    fetchHome();
  }, [i18n.language, isAnyPopupOpen, pathname, fetchHome, homeComponents.length]);


const renderedSections = useMemo(() => {
  if (homeComponents.length === 0) {
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
        <>
          {renderedSections || (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No content available</h3>
              <p className="text-gray-500">Please try refreshing the page</p>
            </div>
          )}
          
          {isLoadingMore && (
            <div className="pt-8 lg:pt-16">
              <div className="animate-pulse mb-8">
                <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 w-96 rounded"></div>
              </div>
              <Shimmer type="grid" count={4} />
            </div>
          )}
          
          {hasMore && (
            <div className="flex justify-center py-12">
              <button
                onClick={loadMoreComponents}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-[90px] text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                    <span className='font-bold text-sm text-black'>
                      Load More 
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      <HowItWorks key="how-it-works"/>
      <CuratedExperiences key="curated-experiences"/>
      <AdventureSection key="adventure-section"/>
      <BrowseCategorySection key="browse-category"/>
      <ExploreNearby key="explore-nearby"/>
      <BestHostsSection key="best-hosts"/>
      <WhyPortalSection key="why-portal"/>
      <PromotionalVideoSection key="promotional-video"/>
    </div>
  );
}

