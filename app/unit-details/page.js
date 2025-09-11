
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyDetailsSection from "../components/UnitDetailsComponents/PropertyDetailsSection";
import PropertyListingUnitDetails from "../components/UnitDetailsComponents/PropertyListingUnitDetails";
import ReviewsSection from "../components/UnitDetailsComponents/ReviewsSection";
import { getListingBySlug } from "../../lib/apiClient";

const PropertyListing = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingData = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getListingBySlug(slug);
        setListingData(data);
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C27D]"></div>
      </div>
    );
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
      <ReviewsSection listingData={listingData} />
    </div>
  );
};

export default PropertyListing;