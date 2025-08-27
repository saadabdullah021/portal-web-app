'use client';
import { useState, useEffect } from 'react';
import {  MapPin, Camera, Waves, MoveLeft, MoveRight } from 'lucide-react';
import summerHoliday from '../../public/images/Holiday_Summer.png';
import Image from 'next/image';
const AdventureSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 const placeholderImage = summerHoliday;
  const adventures = [
    {
      id: 1,
      image: placeholderImage,
      title: "Mountain Adventures",
     
    },
    {
      id: 2,
  image: placeholderImage,
      title: "Cultural Journeys",
 
    },
    {
      id: 3,
     image: placeholderImage,
      title: "Ocean Escapes",
   
    },
    {
      id: 4,
    image: placeholderImage,
      title: "Desert Safari",
  
    },
    {
      id: 5,
     image: placeholderImage,
      title: "Forest Trekking",

    }
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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        const itemsPerView = isMobile ? 1 : 3;
        const maxSlide = adventures.length - itemsPerView;
        setCurrentSlide((prev) => prev >= maxSlide ? 0 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isMobile, adventures.length]);

  // Navigation functions
  const itemsPerView = isMobile ? 1 : 3;
  const maxSlide = adventures.length - itemsPerView;

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

  const AdventureCard = ({ adventure }) => (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">

<div className='flex items-center gap-2'>

      <div className={` flex items-center justify-center  overflow-hidden`}>
        <Image
          src={adventure.image} 
          alt={adventure.title} 
          className="w-full h-full object-cover rounded-full" 
          />
     
    </div>
        <div>
          <h3 className="text-[16px] font-medium break-words  w-25 font-poppins text-black mb-2 ">
            {adventure.title}
          </h3>
      
        </div>
          </div>
      </div>
    
  );

  return (
   <section className="py-16 px-4  flex items-center">
  <div className="max-w-7xl mx-auto w-full">
    {/* Header */}
    <div className="mb-12 text-center"> {/* ⬅️ center align header */}
      <h1 className="text-4xl lg:text-5xl font-bold text-[#23262F]  font-dm-sans mb-4 tracking-tight">
        Let&apos;s go on an adventure
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Find and book a great memorable stay
      </p>
    </div>

    {/* Desktop Slider */}
    <div className="hidden md:block overflow-hidden mb-8 py-4">
      <div
        className="flex transition-transform duration-500 -mx-4"
        style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
      >
        {adventures.map((adventure) => (
          <div key={adventure.id} className="w-1/3 flex-shrink-0 px-4">
            <AdventureCard adventure={adventure} />
          </div>
        ))}
      </div>
    </div>

    {/* Mobile Slider */}
    <div className="md:hidden relative mb-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {adventures.map((adventure) => (
            <div key={adventure.id} className="w-full px-4 flex-shrink-0">
              <AdventureCard adventure={adventure} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ✅ Common Controls (Indicators + Arrows) */}
    <div className="flex justify-center items-center gap-6 mt-6">
      {/* Prev */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`border border-gray-200 rounded-full p-3 transition-all duration-300 ${
          currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
        aria-label="Previous adventure"
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
        aria-label="Next adventure"
      >
          <MoveRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  </div>
</section>

  );
};

export default AdventureSection;