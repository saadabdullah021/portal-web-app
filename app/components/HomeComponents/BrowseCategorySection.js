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
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/get-categories');
        if (!mounted) return;
        const list = Array.isArray(data?.data) ? data.data : [];
        const normalized = list.map((c, idx) => ({
          id: c.id ?? c.category_id ?? idx,
          name: c.name ?? c.category_name ?? c.title ?? 'Category',
          icon: c.icon ?? 'HelpCircle',
          description: c.description ?? '',
          count: c.count ?? c.total ?? c.total_listings ?? ''
        }));
        setCategories(normalized);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
    return () => { mounted = false; };
  }, []);

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

  // ✅ Clone categories for infinite loop
  const clonedCategories = [
    ...categories.slice(-itemsPerView), // Last items at start
    ...categories,
    ...categories.slice(0, itemsPerView) // First items at end
  ];

  // ✅ Start from first real slide (after cloned items)
  useEffect(() => {
    setCurrentSlide(itemsPerView);
  }, [itemsPerView]);

  // ✅ Handle transition end for seamless loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    // Jump to real start or end if at clones
    if (currentSlide === 0) {
      setCurrentSlide(categories.length);
    } else if (currentSlide >= categories.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  // ✅ Auto-play with infinite loop
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentSlide((prev) => prev + 1);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isTransitioning]);

  // ✅ Next Slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
    setIsAutoPlaying(false);
  };

  // ✅ Previous Slide
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
    setIsAutoPlaying(false);
  };

  // ✅ Go to specific slide (optional, if you need dots)
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

        {/* ✅ Infinite Slider Container */}
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
                  <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                    {/* Count Badge */}
                    <div className="inline-flex items-center justify-center bg-[#E6E8EC] text-[#23262F] text-xs font-bold font-poppins uppercase px-4 py-2 rounded-[32px] mb-4 sm:mb-6">
                      {category.count}
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center w-8 h-8 mt-12">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#23262F]" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-medium text-[#23262F] text-sm sm:text-[16px] font-poppins mt-8">
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

        {/* ✅ Controls (Arrows only) */}
        <div className="flex justify-center items-center gap-6 mt-6">
          {/* Prev */}
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

          {/* Next */}
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
      </div>
    </section>
  );
};

export default BrowseCategorySection;