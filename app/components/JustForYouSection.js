"use client";
import React, { useState, useEffect } from "react";
import {  MoveLeft, MoveRight, Star } from "lucide-react";
import {  useTranslation } from 'react-i18next';
import Image from "next/image";
import justForYou from '../../public/images/justforyou.png'; 
const JustForYouSection = () => {
     const { t } = useTranslation('common'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Same image for all properties (later replace with API images)
  const placeholderImage = justForYou;

  // ✅ Generate 12 properties dynamically
  const properties = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: placeholderImage,
    badge: "SUPERHOST",
    rating: 4.8,
    reviews: 12,
    title: "Lorem ipsum dolor imit con dolor lorem avec",
    price: "2,500 SAR",
    period: "night",
  }));

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-full md:w-auto">
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            className=" fill"
            loading="lazy"
          />
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-[#FCFCFD] font-poppins text-black text-xs font-bold p-2 rounded shadow-md">
            {property.badge}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm text-gray-900">
            {property.rating}
          </span>
          <span className="text-gray-500 text-sm">
            ({property.reviews} reviews)
          </span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 text-[16px] font-poppins  font-medium mb-4 line-clamp-2 leading-relaxed">
          {property.title}
        </h3>
<hr className="text-gray-200 py-2"/>
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-semibold font-poppins text-gray-900">
            {property.price}
          </span>
          <span className="text-[#777E90] text-sm">/ {property.period}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 lg:py-48 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="mb-12">
        <h2 className="heading mb-4">
          
                                  {t('justForYou.title')}

        </h2>
        <p className="text-gray-600 text-xl font-normal">Lorem ipsum dolor imit</p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Mobile Slider */}
       <div className="md:hidden relative">
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {properties.map((property) => (
              <div key={property.id} className="w-full px-2 flex-shrink-0">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevSlide}
            className=" border border-gray-200 rounded-full p-3 "
            aria-label="Previous deal"
          >
            <MoveLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index ? 'bg-gray-800 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to deal ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className=" border border-gray-200 rounded-full p-3"
            aria-label="Next deal"
          >
            <MoveRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default JustForYouSection;
