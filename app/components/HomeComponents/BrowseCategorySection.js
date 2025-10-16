'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from '@/lib/axios';

const BrowseCategorySection = () => {
  const { t, i18n } = useTranslation('home');
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState('desktop');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const hasFetchedCategoriesRef = useRef(false);

  useEffect(() => {
    // Reset ref on language change to refetch
    hasFetchedCategoriesRef.current = false;

    const fetchCategories = async () => {
      if (hasFetchedCategoriesRef.current) {
        console.log('Categories fetch skipped: already fetched for language', i18n.language);
        return;
      }

      setIsLoading(true);
      hasFetchedCategoriesRef.current = true;
      const cacheKey = `categories_data_${i18n.language}`; // Language-specific cache
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);
      const now = Date.now();

      // Check cache
      if (cachedData && cacheTime && now - parseInt(cacheTime) < 600000) {
        try {
          const parsed = JSON.parse(cachedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('Using cached categories:', parsed);
            setCategories(parsed);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Cache parse error:', error);
        }
      }

      try {
        console.log('Fetching categories for language:', i18n.language);
        const { data } = await axios.get('/get-categories', {
          params: { language: i18n.language },
        });

        const list = Array.isArray(data?.data) ? data.data : [];
        console.log('API response:', list);

        const iconPool = [
          'Home',
          'Building2',
          'BedDouble',
          'Hotel',
          'Warehouse',
          'House',
          'Tent',
          'Trees',
          'Castle',
          'Landmark',
          'Factory',
          'Boxes',
          'LampDesk',
        ];

        // Shuffle icons to avoid duplicates
        const shuffledIcons = [...iconPool].sort(() => Math.random() - 0.5);
        const normalized = list.map((c, idx) => ({
          id: c.category_id ?? idx,
          name: c.category_title ?? 'Category',
          icon: shuffledIcons[idx % shuffledIcons.length] || 'HelpCircle',
          description: c.category_description ?? '',
          count: c.listing_count ?? 0,
        }));

        setCategories(normalized);
        console.log('Normalized categories:', normalized);

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(normalized));
        localStorage.setItem(`${cacheKey}_time`, now.toString());
      } catch (error) {
        console.error('Fetch categories error:', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();

    return () => {
      // Cleanup not strictly needed with current logic, but kept for consistency
    };
  }, [i18n.language]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setIsMobile('mobile');
      } else if (window.innerWidth < 1024) {
        setIsMobile('tablet');
      } else {
        setIsMobile('desktop');
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const itemsPerView = isMobile === 'mobile' ? 1 : isMobile === 'tablet' ? 2 : 4;

  const clonedCategories = [
    ...categories.slice(-itemsPerView),
    ...categories,
    ...categories.slice(0, itemsPerView),
  ];

  useEffect(() => {
    setCurrentSlide(itemsPerView);
  }, [itemsPerView]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === 0) {
      setCurrentSlide(categories.length);
    } else if (currentSlide >= categories.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(itemsPerView + index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-2 sm:mb-4">
            {t('Browse.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md mx-auto">
            {t('Browse.subtitle')}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories available.</p>
          </div>
        ) : (
          <>
            {/* Infinite Slider Container */}
            <div className="overflow-hidden py-4">
              <div
                ref={sliderRef}
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {clonedCategories.map((category, index) => {
                  const IconComponent = Icons[category.icon] || Icons.HelpCircle;
                  return (
                    <div
                      key={`${category.id}-${index}`}
                      className="flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div
                        className={`bg-white rounded-3xl px-6 py-4 shadow-sm transition-shadow duration-200 cursor-pointer group
                          ${i18n.language === 'ar' ? 'min-h-[230px]' : 'min-h-[260px] '}`}
                      >
                        {/* Count Badge */}
                        <div className="inline-flex items-center justify-center bg-[#E6E8EC] text-[#23262F] text-xs font-bold font-poppins uppercase px-4 py-2 rounded-[32px] mb-3 sm:mb-4">
                          {category.count}
                        </div>
                        {/* Icon */}
                        <div className="flex items-center justify-center w-8 h-8 mt-2">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#23262F]" />
                        </div>
                        {/* Content */}
                        <div>
                          <h3 className="font-medium text-[#23262F] text-sm sm:text-[16px] font-poppins mt-4 lg:mt-6">
                            {category.name}
                          </h3>
                          <p className="text-[#777E90] font-poppins font-normal text-xs mt-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls (Arrows only) */}
            <div className="flex justify-center items-center gap-6 mt-6">
              <button
                onClick={prevSlide}
                className="border border-gray-200 rounded-full p-3 transition-all duration-300 hover:bg-gray-50"
                aria-label="Previous category"
              >
                {isRTL ? (
                  <MoveRight className="w-5 h-5 text-gray-700" />
                ) : (
                  <MoveLeft className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <button
                onClick={nextSlide}
                className="border border-gray-200 rounded-full p-3 transition-all duration-300 hover:bg-gray-50"
                aria-label="Next category"
              >
                {isRTL ? (
                  <MoveLeft className="w-5 h-5 text-gray-700" />
                ) : (
                  <MoveRight className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BrowseCategorySection;