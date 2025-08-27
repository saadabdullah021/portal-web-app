"use client";
import React, { useState, useEffect } from "react";
import { MoveLeft, MoveRight, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import justForYou from "../../public/images/justforyou.png";

const NationalDayDealsSection = () => {
  const { t } = useTranslation("common");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Same image for all properties (later replace with API images)
  const placeholderImage = justForYou;

  // ✅ Generate properties dynamically
  const properties = Array.from({ length: 10 }, (_, i) => ({
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

  // ✅ items per view add kiya
const itemsPerView = isMobile ? 1 : 4;
const maxSlide = properties.length - itemsPerView;
  // ✅ Next Slide for Desktop
const nextSlide = () => {
  if (currentSlide < maxSlide) {
    setCurrentSlide((prev) => prev + 1);
  }
};

// ✅ update prevSlide
const prevSlide = () => {
  if (currentSlide > 0) {
    setCurrentSlide((prev) => prev - 1);
  }
};

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-full md:w-auto">
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            className="fill"
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
        <h3 className="text-gray-900 text-[16px] font-poppins font-medium mb-4 line-clamp-2 leading-relaxed">
          {property.title}
        </h3>
        <hr className="text-gray-200 py-2" />
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="mb-12 flex items-start justify-between">
        <div>
          <h2 className="heading mb-4">
            {t("nationalDayDeals.title")}
          </h2>
          <p className="text-gray-600 text-xl font-normal">
            Lorem ipsum dolor imit
          </p>
        </div>
        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0} // ✅ Disable left button at start
            className={`border border-gray-200 rounded-full p-3 ${
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous deal"
          >
            <MoveLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= properties.length - 4} // ✅ Disable right button at end
            className={`border border-gray-200 rounded-full p-3 ${
              currentSlide >= properties.length - 4
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next deal"
          >
            <MoveRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* ✅ Desktop Slider */}
    {/* ✅ Desktop Slider */}
<div className="hidden md:block overflow-hidden py-4">
  <div
    className="flex transition-transform duration-500 -mx-2" // -mx-2 taake gap adjust ho
    style={{ transform: `translateX(-${currentSlide * (100 / 4)}%)` }} // hamesha 25% move karega
  >
    {properties.map((property) => (
      <div key={property.id} className="w-1/4 flex-shrink-0 px-2">
        {/* px-2 diya taake gap create ho without breaking width */}
        <PropertyCard property={property} />
      </div>
    ))}
  </div>
</div>


      {/* ✅ Mobile Slider Same as Before */}
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
                  currentSlide === index ? "bg-gray-800 w-8" : "bg-gray-300"
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

export default NationalDayDealsSection;
