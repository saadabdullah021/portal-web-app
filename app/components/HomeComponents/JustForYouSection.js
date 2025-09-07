"use client";
import React, { useState, useEffect, useRef } from "react";
import { MoveLeft, MoveRight, Star } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import justForYou from '../../../public/images/justforyou.png';

const JustForYouSection = ({ items, sectionData  }) => {
  const { t, i18n } = useTranslation("home");
  const isRTL = i18n.language === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  // ✅ Same image for all properties
  const placeholderImage = justForYou;

  const originalProperties = Array.from({ length: 12 }, (_, i) => ({
    listing: {
      listing_id: i + 1,
      thumbnails: [{ thumbnail_url: placeholderImage.src }],
      added_by_super_host: 1,
      rating: 4.8,
      reviews: 12,
      title: "Lorem ipsum dolor imit con dolor lorem avec",
      actual_price: "2,500 SAR",
      discounted_price: "0",
    }
  }));

  const data = Array.isArray(items) && items.length > 0 ? items : originalProperties;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // ✅ Only 1 item per view on mobile
  const itemsPerView = 1;

  // ✅ Clone for infinite loop (only needed for mobile)
  const properties = [
    ...data.slice(-itemsPerView),
    ...data,
    ...data.slice(0, itemsPerView),
  ];

  // ✅ Start from first real slide (after cloned item)
  useEffect(() => {
    setCurrentSlide(itemsPerView); // Start at index 1 (real first item)
  }, []);

  // ✅ Handle seamless loop on transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    // If we're at the cloned start, jump to real end
    if (currentSlide === 0) {
      setCurrentSlide(data.length);
    }
    // If we're at the cloned end, jump to real start
    else if (currentSlide === data.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  // ✅ Next Slide (infinite)
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  // ✅ Previous Slide (infinite)
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  const PropertyCard = ({ property }) => {
    const listing = property?.listing || {};
    const thumbnail = listing.thumbnail || {};
    const imageSrc = thumbnail?.thumbnail_url || placeholderImage;
    const hasDiscount = listing.discounted_price && String(listing.discounted_price) !== '0';
    return (
    <div className="bg-white -z-10 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 transform flex-shrink-0 w-full md:w-auto">
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="absolute top-4 left-4">
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
          <span className="font-semibold text-sm text-gray-900">
            {Number(listing.rating) || 0}
          </span>
          <span className="text-gray-500 text-sm">
            ({listing.reviews ?? 0} {t('justForYou.reviews')})
          </span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 text-[16px] font-poppins font-medium mb-4 line-clamp-2 leading-relaxed">
          {listing.title}
        </h3>
        <hr className="text-gray-200 py-2" />
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          {hasDiscount && (
            <span className="text-sm font-bold font-poppins text-[#B1B5C3] line-through">
              {listing.actual_price}
            </span>
          )}
          <div className="flex items-baseline gap-1">
             <span className={`text-sm font-bold font-poppins ${hasDiscount ? 'text-[#58C27D]' : 'text-[#141416]'}`}>
              {hasDiscount ? listing.discounted_price : listing.actual_price} SAR
            </span>
            <span className="text-[#777E90] font-medium font-poppins text-xs">/ {t('lastMinuteDeals.night')}</span>
          </div>
        </div>
      </div>
    </div>
  ); };

  return (
    <section className=" px-4 sm:px-6 lg:px-8  max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="mb-12">
        <h2 className="heading mb-2">
          {/* {t('justForYou.title')}
           */}
                       {sectionData.component_title}

        </h2>
        <p className="text-[#777E90] text-[10px] lg:text-[15px] font-normal">
          {t('justForYou.subtitle')}
                      {sectionData.component_description}

        </p>
      </div>

      {/* Desktop Layout (Grid - No Change) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-8">
        {data.map((property, idx) => (
          <PropertyCard key={property?.listing?.listing_id ?? idx} property={property} />
        ))}
      </div>

      {/* ✅ Mobile Infinite Slider */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-2xl pb-2">
          <div
            ref={sliderRef}
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {properties.map((property, index) => (
              <div key={`${property?.listing?.listing_id ?? index}-${index}`} className="w-full flex-shrink-0">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex gap-4 items-center mt-6">
          <button
            onClick={prevSlide}
            className="border border-gray-200 rounded-full p-3"
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
            className="border border-gray-200 rounded-full p-3"
            aria-label="Next deal"
          >
            {isRTL ? (
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

export default JustForYouSection;