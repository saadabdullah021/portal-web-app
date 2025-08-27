'use client';
import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react'; // ✅ saare icons import
import { MoveLeft, MoveRight } from 'lucide-react';

const BrowseCategorySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample data - replace with your actual data
  const categories = [
    { id: 1, name: 'Villa', icon: 'Building2', description: 'Small description', count: '2,592' },
    { id: 2, name: 'Apartment', icon: 'Building', description: 'Small description', count: '3,145' },
    { id: 3, name: 'Resort', icon: 'Hotel', description: 'Small description', count: '1,873' },
    { id: 4, name: 'Cabin', icon: 'Tent', description: 'Small description', count: '2,020' },
    { id: 5, name: 'Cottage', icon: 'House', description: 'Small description', count: '950' },
    { id: 6, name: 'Farmhouse', icon: 'Tractor', description: 'Small description', count: '1,420' },
    { id: 7, name: 'Lodge', icon: 'Warehouse', description: 'Small description', count: '675' },
    { id: 8, name: 'Bungalow', icon: 'Home', description: 'Small description', count: '2,110' }
  ];

  // ✅ Responsive check
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // ✅ Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        const itemsPerView = isMobile ? 1 : 3;
        const maxSlide = categories.length - itemsPerView;
        setCurrentSlide((prev) => prev >= maxSlide ? 0 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isMobile, categories.length]);

  // ✅ Items per view + maxSlide logic
  const itemsPerView = isMobile ? 1 : 4;
  const maxSlide = categories.length - itemsPerView;

  // Navigation
  const nextSlide = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide((prev) => prev + 1);
    }
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#23262F]  font-dm-sans mb-2 sm:mb-4">
            Browse by category
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md mx-auto">
            Lorem ipsum dolor limit
          </p>
        </div>

        {/* ✅ Slider Container */}
        <div className="overflow-hidden py-4">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
          >
            {categories.map((category) => {
              const IconComponent = Icons[category.icon] || Icons.HelpCircle; // ✅ dynamic icon load
              return (
                <div
                  key={category.id}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                    {/* Count Badge */}
                    <div className="inline-flex items-center justify-center bg-[#E6E8EC] text-[#23262F] text-xs  font-bold font-poppins uppercase px-4 py-2 rounded-[32px] mb-4 sm:mb-6">
                      {category.count}
                    </div>
                    
                    {/* Icon */}
                    <div className="flex items-center justify-center w-8 h-8 mt-12 ">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#23262F]" />
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="font-medium text-[#23262F] text-sm sm:text-[16px] font-poppins  mt-8">
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

        {/* ✅ Controls */}
        <div className="flex justify-center items-center gap-6 mt-6">
          {/* Prev */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`border border-gray-200 rounded-full p-3 transition-all duration-300 ${
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
            aria-label="Previous category"
          >
            <MoveLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className={`border border-gray-200 rounded-full p-3 transition-all duration-300 ${
              currentSlide >= maxSlide ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
            aria-label="Next category"
          >
            <MoveRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrowseCategorySection;
