
"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import PropertyDetailsSection from "../components/UnitDetailsComponents/PropertyDetailsSection";
import PropertyListingUnitDetails from "../components/UnitDetailsComponents/PropertyListingUnitDetails";
import ReviewsSection from "../components/UnitDetailsComponents/ReviewsSection";
import LastMinuteDealsSection from "../components/HomeComponents/LastMinuteDealsSection";
import JustForYouSection from "../components/HomeComponents/JustForYouSection";
import { getListingBySlug } from "../../lib/apiClient";
import { useAppSelector } from "../../store/hooks";
import Loading from "../loading";

const PropertyListing = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProperties, setSimilarProperties] = useState(null);
<<<<<<< HEAD
=======
  
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const hasFetchedRef = useRef(false);
>>>>>>> b5e169a46c76775f5bdceff40c03355935418b94

  useEffect(() => {
    // Prevent duplicate API calls
    if (hasFetchedRef.current) {
      return;
    }

    const fetchListingData = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      hasFetchedRef.current = true;

      const cacheKey = `listing_${slug}`;
      const similarCacheKey = `similar_${slug}`;
      const cachedData = localStorage.getItem(cacheKey);
      const similarCachedData = localStorage.getItem(similarCacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);
      const similarCacheTime = localStorage.getItem(`${similarCacheKey}_time`);
      const now = Date.now();
      
      // Check if cached data exists and is less than 15 minutes old
      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 900000) {
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
          getListingBySlug(slug),
          new Promise(resolve => setTimeout(resolve, 1000)) // Minimum 1 second loading
        ]);
        
        setListingData(data);
        
<<<<<<< HEAD
=======
        // Cache the listing data
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_time`, now.toString());
        
>>>>>>> b5e169a46c76775f5bdceff40c03355935418b94
        if (data?.data?.listing_id) {
          const similarResponse = await fetch(`https://guku.ai/api/v1/get-similar-listings?listing_id=${data.data.listing_id}`);
          const similarData = await similarResponse.json();
          setSimilarProperties(similarData);
<<<<<<< HEAD
=======
          
          // Cache the similar properties data
          localStorage.setItem(similarCacheKey, JSON.stringify(similarData));
          localStorage.setItem(`${similarCacheKey}_time`, now.toString());
>>>>>>> b5e169a46c76775f5bdceff40c03355935418b94
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing details');
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [slug]);

  if (loading) {
    return <Loading />;
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
<<<<<<< HEAD
      <ReviewsSection listingData={listingData} />
      {similarProperties && (
=======
      { <ReviewsSection isAuthenticated={isAuthenticated} listingData={listingData} />}
      {similarProperties && similarProperties.items?.records.length > 0 && (
>>>>>>> b5e169a46c76775f5bdceff40c03355935418b94
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