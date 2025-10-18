"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getListingBySlug } from "../../lib/apiClient";
import UnitDetailsShimmer from "../components/ui/UnitDetailsShimmer";
import GalleryPage from "../components/UnitDetailsComponents/GalleryPage";

const Gallery = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { i18n } = useTranslation();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const hasFetchedRef = useRef(false);
  const lastLanguageRef = useRef(i18n.language || 'en');

  useEffect(() => {
    const currentLanguage = i18n.language || 'en';
    const languageChanged = lastLanguageRef.current !== currentLanguage;
    const isFirstLoad = !hasFetchedRef.current;
    
    if (!languageChanged && !isFirstLoad) {
      return;
    }

    lastLanguageRef.current = currentLanguage;

    const fetchListingData = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const [data] = await Promise.all([
          getListingBySlug(slug, currentLanguage),
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
        
        setListingData(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load gallery');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery Not Found</h2>
          <p className="text-gray-600">The requested gallery could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GalleryPage listingData={listingData} />
    </div>
  );
};

export default Gallery;