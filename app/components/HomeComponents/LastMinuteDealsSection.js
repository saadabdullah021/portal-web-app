'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Star, MoveLeft, MoveRight } from 'lucide-react';
import justForYou from '../../../public/images/justforyou.png';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getComponentData } from '../../../lib/componentApi';

const LastMinuteDealsSection = ({ items , data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const sliderRef = useRef(null);
  const { t, i18n } = useTranslation("home");
  const router = useRouter();
  const isRTL = i18n.language === "ar";

  const placeholderImage = justForYou;

  const originalProperties = Array.from({ length: 8 }, (_, i) => ({
    listing: {
      listing_id: i + 1,
      thumbnails: [{ thumbnail_url: placeholderImage.src }],
      added_by_super_host: 1,
      rating: 4.8,
      reviews: 12,
      title: "Lorem ipsum dolor imit con dolor lorem avec",
      actual_price: "3,499",
      discounted_price: "2,500 SAR",
    },
    amenities: [
      {
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.99999 14.6667C4.36818 14.6667 4.66666 14.3682 4.66666 14H3.33333C3.33333 14.3682 3.63181 14.6667 3.99999 14.6667Z" fill="#777E91" />
            <path d="M12 14.6667C12.3682 14.6667 12.6667 14.3682 12.6667 14H11.3333C11.3333 14.3682 11.6318 14.6667 12 14.6667Z" fill="#777E91" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6667 8.66659H3.33333C2.96514 8.66659 2.66666 8.96506 2.66666 9.33325V11.9999C2.66666 12.3681 2.96514 12.6666 3.33333 12.6666H12.6667C13.0349 12.6666 13.3333 12.3681 13.3333 11.9999V9.33325C13.3333 8.96506 13.0349 8.66659 12.6667 8.66659ZM3.33333 7.33325C2.22876 7.33325 1.33333 8.22868 1.33333 9.33325V11.9999C1.33333 13.1045 2.22876 13.9999 3.33333 13.9999H12.6667C13.7712 13.9999 14.6667 13.1045 14.6667 11.9999V9.33325C14.6667 8.22868 13.7712 7.33325 12.6667 7.33325H3.33333Z" fill="#777E91" />
            <path d="M11.3333 1.33325C10.9651 1.33325 10.6667 1.63173 10.6667 1.99992V7.33325H12V1.99992C12 1.63173 11.7015 1.33325 11.3333 1.33325Z" fill="#777E91" />
            <path d="M4.66667 3.99992C4.29848 3.99992 4 4.2984 4 4.66659V7.33325H5.33333V4.66659C5.33333 4.2984 5.03486 3.99992 4.66667 3.99992Z" fill="#777E91" />
            <path d="M4.66667 10C4.29848 10 4 10.2985 4 10.6667C4 11.0349 4.29848 11.3333 4.66667 11.3333C5.03486 11.3333 5.33333 11.0349 5.33333 10.6667C5.33333 10.2985 5.03486 10 4.66667 10Z" fill="#777E91" />
            <path d="M7.33333 10C6.96514 10 6.66667 10.2985 6.66667 10.6667C6.66667 11.0349 6.96514 11.3333 7.33333 11.3333H11.3333C11.7015 11.3333 12 11.0349 12 10.6667C12 10.2985 11.7015 10 11.3333 10H7.33333Z" fill="#777E91" />
          </svg>
        ), label: "Free wifi"
      },
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.33334 6.66667C1.33334 4.08934 3.42268 2 6.00001 2H10C12.5773 2 14.6667 4.08934 14.6667 6.66667C14.6667 7.77124 13.7712 8.66667 12.6667 8.66667H3.33334C2.22877 8.66667 1.33334 7.77124 1.33334 6.66667ZM6.00001 3.33333H10C11.841 3.33333 13.3333 4.82572 13.3333 6.66667C13.3333 7.03486 13.0349 7.33333 12.6667 7.33333H3.33334C2.96515 7.33333 2.66668 7.03486 2.66668 6.66667C2.66668 4.82572 4.15906 3.33333 6.00001 3.33333Z" fill="#777E91" />
            <path fillRule="evenodd" clipRule="evenodd" d="M14.6667 12C14.6667 13.1046 13.7712 14 12.6667 14H3.33334C2.22877 14 1.33334 13.1046 1.33334 12C1.33334 10.8954 2.22877 10 3.33334 10H12.6667C13.7712 10 14.6667 10.8954 14.6667 12ZM12.6667 12.6667H3.33334C2.96515 12.6667 2.66668 12.3682 2.66668 12C2.66668 11.6318 2.96515 11.3333 3.33334 11.3333H12.6667C13.0349 11.3333 13.3333 11.6318 13.3333 12C13.3333 12.3682 13.0349 12.6667 12.6667 12.6667Z" fill="#777E91" />
            <path fillRule="evenodd" clipRule="evenodd" d="M13.3333 8.66659H2.66666C2.29847 8.66659 1.99999 8.96506 1.99999 9.33325C1.99999 9.70144 2.29847 9.99992 2.66666 9.99992H13.3333C13.7015 9.99992 14 9.70144 14 9.33325C14 8.96506 13.7015 8.66659 13.3333 8.66659ZM2.66666 7.33325C1.56209 7.33325 0.666656 8.22868 0.666656 9.33325C0.666656 10.4378 1.56209 11.3333 2.66666 11.3333H13.3333C14.4379 11.3333 15.3333 10.4378 15.3333 9.33325C15.3333 8.22868 14.4379 7.33325 13.3333 7.33325H2.66666Z" fill="#777E91" />
            <path d="M5.99999 5.33341C5.99999 5.7016 5.70151 6.00008 5.33332 6.00008C4.96513 6.00008 4.66666 5.7016 4.66666 5.33341C4.66666 4.96522 4.96513 4.66675 5.33332 4.66675C5.70151 4.66675 5.99999 4.96522 5.99999 5.33341Z" fill="#777E91" />
            <path d="M8.66666 5.33341C8.66666 5.7016 8.36818 6.00008 7.99999 6.00008C7.6318 6.00008 7.33332 5.7016 7.33332 5.33341C7.33332 4.96522 7.6318 4.66675 7.99999 4.66675C8.36818 4.66675 8.66666 4.96522 8.66666 5.33341Z" fill="#777E91" />
            <path d="M10.6667 6.00008C11.0348 6.00008 11.3333 5.7016 11.3333 5.33341C11.3333 4.96522 11.0348 4.66675 10.6667 4.66675C10.2985 4.66675 9.99999 4.96522 9.99999 5.33341C9.99999 5.7016 10.2985 6.00008 10.6667 6.00008Z" fill="#777E91" />
          </svg>
        ), label: "Breakfast included"
      },
    ],
    originalPrice: "3,499",
    currentPrice: "2,500 SAR",
    period: "night",
  }));

  const computedData = Array.isArray(allItems) && allItems.length > 0 ? allItems : [];

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setAllItems(items);
      setCurrentOffset(1);
    }
  }, [items]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // ✅ Items per view
  const itemsPerView = isMobile ? 1 : 4;
  // ✅ Clone properties for infinite loop (only if we have enough items)
  const properties = computedData.length > itemsPerView ? [
    ...computedData.slice(-itemsPerView),
    ...computedData,
    ...computedData.slice(0, itemsPerView),
  ] : computedData;

  // ✅ Start from first real slide (after cloned items) - only on initial load
  useEffect(() => {
    if (computedData.length > 0 && currentSlide === 0) {
      setCurrentSlide(computedData.length > itemsPerView ? itemsPerView : 0);
    }
  }, [itemsPerView]);

  // ✅ Handle transition end for seamless loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Only handle infinite loop if we have enough items for cloning
    if (computedData.length > itemsPerView) {
      // If we're at the beginning clones, jump to real beginning
      if (currentSlide === 0) {
        setCurrentSlide(computedData.length);
      }
      // If we're at the end clones, jump to real start
      else if (currentSlide >= computedData.length + itemsPerView) {
        setCurrentSlide(itemsPerView);
      }
    }
  };

  const loadMoreItems = async () => {
    if (isLoadingMore || !hasMore || !data?.component_id) return;
    
    setIsLoadingMore(true);
    try {
      const response = await getComponentData(
        data.component_id,
        currentOffset,
        1,
        i18n.language
      );
      
      if (response?.data?.items?.records && response.data.items.records.length > 0) {
        setAllItems(prev => [...prev, ...response.data.items.records]);
        setCurrentOffset(prev => prev + 1);
        
        if (response.data.items.totalRecords < 1) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // ✅ Next Slide - always fetch one record from API
  const nextSlide = async () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Fetch new item if available
    if (data?.items?.totalRecords > data?.items?.records?.length && hasMore) {
      await loadMoreItems();
    }
    
    // Move to next slide smoothly
    const newSlide = currentSlide + 1;
    setCurrentSlide(newSlide);
    
    // Reset transition after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // ✅ Previous Slide - infinite loop
  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  const PropertyCard = ({ property }) => {
    const listing = property?.listing || {};
    const thumbnail = listing.thumbnail || {};
    const hasDiscount = listing.discounted_price && String(listing.discounted_price) !== '0';
    const imageSrc = thumbnail?.thumbnail_url || placeholderImage;
    
    const handleCardClick = () => {
      if (listing.unique_id) {
        router.push(`/unit-details?slug=${listing.unique_id}`);
      }
    };
    
    return (
    <div 
      className="bg-white -z-10  rounded-2xl overflow-hidden shadow-sm  transition-all duration-300 transform  flex-shrink-0 w-full md:w-auto group cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative ">
        <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-200   relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-200 to-amber-300 hidden"></div>
        </div>
        <div className={`absolute top-4 ${isRTL ? 'right-4 left-4' : 'left-4 right-4'} flex items-center justify-between`}>
          {hasDiscount ? (
            <span className="bg-[#58C27D] text-white text-xs font-poppins font-bold px-3 py-2 rounded">
              {listing.discount}% OFF
            </span>
          ) : listing.added_by_super_host ? (
            <span className="bg-[#FCFCFD] font-poppins text-[#23262F] text-xs font-bold p-2 rounded">
              SUPERHOST
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm text-gray-900">{listing.rating}</span>
          <span className="text-gray-500 text-sm">({listing.reviews} {t('justForYou.reviews')})</span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 text-[16px] font-poppins font-medium mb-4 line-clamp-2 leading-relaxed">
          {listing.title}
        </h3>

        {/* Amenities */}
        <div className="flex items-center gap-4 mb-6">
          {(Array.isArray(property.amenities) ? property.amenities : []).map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 text-[#777E90]">
              {amenity.icon}
              <span className="text-xs font-poppins font-normal whitespace-nowrap">{amenity.label}</span>
            </div>
          ))}
        </div>
        <hr className="text-gray-200 py-2" />
        {/* Pricing */}
        <div className="flex items-center gap-2">
          {hasDiscount && (
            <span className="text-sm font-bold font-poppins text-[#B1B5C3] line-through">
              {listing.actual_price}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className={`text-sm font-bold font-poppins ${hasDiscount ? 'text-[#58C27D]' : 'text-[#141416]'}`}>{hasDiscount ? listing.discounted_price : listing.actual_price} SAR</span>
            <span className="text-[#777E90] font-medium font-poppins text-xs">/ {t('lastMinuteDeals.night')} </span>
          </div>
        </div>
      </div>
    </div>
  ); };

  // Ensure we always have data to render
  if (!properties || properties.length === 0) {
    return null;
  }
  
  return (
    <section className=" px-4 sm:px-6 lg:px-8  max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="heading mb-2">
            {/* {t('lastMinuteDeals.title')} */}
            {data.component_title}
          </h2>
          <p className="text-[#777E90] text-[10px] lg:text-[15px]">
            {/* {t('lastMinuteDeals.subtitle')}
             */}
             {data.component_description}
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Previous deal"
          >
            {isRTL ? (
              <MoveRight className="w-5 h-5 text-gray-700" />
            ) : (
              <MoveLeft className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={nextSlide}
            disabled={isLoadingMore}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next deal"
          >
            {isLoadingMore ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
            ) : isRTL ? (
              <MoveLeft className="w-5 h-5 text-gray-700" />
            ) : (
              <MoveRight className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Desktop Infinite Slider */}
      <div className="hidden md:block overflow-hidden py-4">
        <div
          ref={sliderRef}
          className={`flex -mx-2 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
          style={{ 
            transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {properties.map((property, index) => (
            <div key={`desktop-${property?.listing?.listing_id ?? index}-${index}`} className="w-1/4 flex-shrink-0 px-2">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Mobile Infinite Slider */}
      <div className="md:hidden relative">
        <div className="overflow-hidden pb-2 rounded-2xl">
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {properties.map((property, index) => (
              <div key={`mobile-${property?.listing?.listing_id ?? index}-${index}`} className="w-full  flex-shrink-0">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {data?.items?.totalRecords > computedData.length && hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreItems}
              disabled={isLoadingMore}
              className="bg-[#58C27D] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#4a9f6a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="flex gap-4 items-center mt-6">
          <button
            onClick={prevSlide}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Previous deal"
          >
            {isRTL ? (
              <MoveRight className="w-5 h-5 text-gray-700" />
            ) : (
              <MoveLeft className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={nextSlide}
            disabled={isLoadingMore}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next deal"
          >
            {isLoadingMore ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
            ) : isRTL ? (
              <MoveLeft className="w-5 h-5 text-gray-700" />
            ) : (
              <MoveRight className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LastMinuteDealsSection;