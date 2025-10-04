'use client';
import { useState, useEffect, useRef } from 'react';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdventureSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const { t, i18n } = useTranslation('home');
  const isRTL = i18n.language === 'ar';
  // Placeholder for demo
  const placeholderImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400";

  // Original adventures
  const originalAdventures = [
    { id: 1, image: placeholderImage, title: "Mountain Adventures" },
    { id: 2, image: placeholderImage, title: "Cultural Journeys" },
    { id: 3, image: placeholderImage, title: "Ocean Escapes" },
    { id: 4, image: placeholderImage, title: "Desert Safari" },
    { id: 5, image: placeholderImage, title: "Forest Trekking" }
  ];

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Items per view
  const itemsPerView = isMobile ? 1 : 3;
  
  // Clone adventures for infinite loop
  const adventures = [
    ...originalAdventures.slice(-itemsPerView),
    ...originalAdventures,
    ...originalAdventures.slice(0, itemsPerView),
  ];

  // Start from first real slide
  useEffect(() => {
    setCurrentSlide(itemsPerView);
  }, [itemsPerView]);

  // Handle transition end for seamless loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    if (currentSlide === 0) {
      setCurrentSlide(originalAdventures.length);
    } else if (currentSlide >= originalAdventures.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentSlide(prev => prev + 1);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isTransitioning]);

  // Next Slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
    setIsAutoPlaying(false);
  };

  // Previous Slide
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
    setIsAutoPlaying(false);
  };

  const AdventureCard = ({ adventure }) => (
    <div className="group cursor-pointer transform transition-all duration-300">
      <div className='flex items-center gap-4'>
        {/* ✅ FIXED: Added fixed dimensions to prevent layout shift */}
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-full">
          <img
            src={adventure.image}
            alt={adventure.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-black">
            {adventure.title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 flex items-center bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">

{/* Header */}
    <div className="mb-12 text-center"> {/* ⬅️ center align header */}
      <h1 className="text-4xl lg:text-5xl font-bold text-[#23262F]  font-dm-sans mb-4 tracking-tight">
        {t('advanture.title')}
      </h1>
      <p className="text-lg md:text-2xl text-[#777E90] max-w-2xl mx-auto leading-relaxed">
        {t('advanture.subtitle')}
      </p>
    </div>

        {/* ✅ Desktop Slider - FIXED: Added min-height to prevent collapse */}
        <div className="hidden md:block overflow-hidden mb-8 py-4">
          <div
            ref={sliderRef}
            className={`flex -mx-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ 
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              minHeight: '100px' // ✅ Prevents height collapse
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {adventures.map((adventure, index) => (
              <div 
                key={`${adventure.id}-${index}`} 
                className="w-1/3 flex-shrink-0 px-4"
                style={{ minHeight: '100px' }} // ✅ Consistent height
              >
                <AdventureCard adventure={adventure} />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Mobile Slider - FIXED: Added min-height */}
        <div className="md:hidden relative mb-8">
          <div className="overflow-hidden">
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                minHeight: '100px' // ✅ Prevents height collapse
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {adventures.map((adventure, index) => (
                <div 
                  key={`${adventure.id}-${index}`} 
                  className="w-full px-4 flex-shrink-0"
                  style={{ minHeight: '100px' }} // ✅ Consistent height
                >
                  <AdventureCard adventure={adventure} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
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

export default AdventureSection;