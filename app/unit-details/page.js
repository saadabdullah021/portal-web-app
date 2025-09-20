
"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import PropertyDetailsSection from "../components/UnitDetailsComponents/PropertyDetailsSection";
import PropertyListingUnitDetails from "../components/UnitDetailsComponents/PropertyListingUnitDetails";
import ReviewsSection from "../components/UnitDetailsComponents/ReviewsSection";
import LastMinuteDealsSection from "../components/HomeComponents/LastMinuteDealsSection";
import JustForYouSection from "../components/HomeComponents/JustForYouSection";
import { getListingBySlug } from "../../lib/apiClient";
import { useAppSelector } from "../../store/hooks";
import UnitDetailsShimmer from "../components/ui/UnitDetailsShimmer";

const PropertyListing = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { i18n } = useTranslation();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProperties, setSimilarProperties] = useState(null);
  
  const hasFetchedRef = useRef(false);
  const lastLanguageRef = useRef(i18n.language || 'en');

  useEffect(() => {
    // Ensure we have a valid language
    const currentLanguage = i18n.language || 'en';
    
    // Check if language actually changed or if this is the first load
    const languageChanged = lastLanguageRef.current !== currentLanguage;
    const isFirstLoad = !hasFetchedRef.current;
    
    if (!languageChanged && !isFirstLoad) {
      return;
    }

    // Update the last language
    lastLanguageRef.current = currentLanguage;

    const fetchListingData = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      // For language changes, don't use cache - always fetch fresh data
      const cacheKey = `listing_${slug}_${currentLanguage}`;
      const similarCacheKey = `similar_${slug}_${currentLanguage}`;
      const cachedData = localStorage.getItem(cacheKey);
      const similarCachedData = localStorage.getItem(similarCacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);
      const similarCacheTime = localStorage.getItem(`${similarCacheKey}_time`);
      const now = Date.now();
      
      // Check if cached data exists and is less than 15 minutes old (only for same language)
      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 900000 && !languageChanged) {
        setListingData(JSON.parse(cachedData));
        
        // Also load similar properties from cache if available
        if (similarCachedData && similarCacheTime && (now - parseInt(similarCacheTime)) < 900000) {
          setSimilarProperties(JSON.parse(similarCachedData));
        }
        
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Add minimum loading time to ensure loader is visible
        const [data] = await Promise.all([
          getListingBySlug(slug, currentLanguage),
          new Promise(resolve => setTimeout(resolve, 1000)) // Minimum 1 second loading
        ]);
        
        setListingData(data);
        
        // Cache the data with language-specific key
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_time`, now.toString());
        
        if (data?.data?.listing_id) {
          const similarResponse = await fetch(`https://guku.ai/api/v1/get-similar-listings?listing_id=${data.data.listing_id}`, {
            headers: {
              'Accept-Language': currentLanguage
            }
          });
          const similarData = await similarResponse.json();
          setSimilarProperties(similarData);
          
          // Cache similar properties with language-specific key
          localStorage.setItem(similarCacheKey, JSON.stringify(similarData));
          localStorage.setItem(`${similarCacheKey}_time`, now.toString());
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing details');
      } finally {
        setLoading(false);
        hasFetchedRef.current = true;
      }
    };

    fetchListingData();
  }, [slug, i18n.language || 'en']);

  if (loading) {
    return <UnitDetailsShimmer />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h2>
          <p className="text-gray-600">The requested listing could not be found.</p>
        </div>
      </div>
    );
    }

  return (
    <div className="">
      <PropertyListingUnitDetails listingData={listingData } slug={slug} />
      <PropertyDetailsSection listingData={listingData} />
      <ReviewsSection listingData={listingData} />
      {similarProperties && (
        <>
          {similarProperties.component_design_type === 'grid' ? (
            <JustForYouSection 
              items={similarProperties.items?.records || []} 
              sectionData={{
                component_title: similarProperties.component_title || "Similar Properties Nearby",
                component_description: similarProperties.component_description || "Discover similar properties in this area that match your preferences. Perfect for your next stay or booking."
              }} 
            />
          ) : (
            <LastMinuteDealsSection 
              items={similarProperties.items?.records || []} 
              data={{
                component_title: similarProperties.component_title || "Similar Properties Nearby",
                component_description: similarProperties.component_description || "Discover similar properties in this area that match your preferences. Perfect for your next stay or booking."
              }} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default PropertyListing;