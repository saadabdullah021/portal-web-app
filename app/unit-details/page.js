
"use client";
import { useEffect, useState } from "react";
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
  
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchListingData = async () => {
      if (!slug) {
        setError('No slug provided');
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
        
        if (data?.data?.listing_id) {
          const similarResponse = await fetch(`https://guku.ai/api/v1/get-similar-listings?listing_id=${data.data.listing_id}`);
          const similarData = await similarResponse.json();
          setSimilarProperties(similarData);
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
      <PropertyListingUnitDetails listingData={listingData} />
      <PropertyDetailsSection listingData={listingData} />
      { <ReviewsSection isAuthenticated={isAuthenticated} listingData={listingData} />}
      {similarProperties && similarProperties.items?.records.length > 0 && (
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