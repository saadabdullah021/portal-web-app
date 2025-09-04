'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MoveLeft, MoveRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dummyImage from '../../../public/images/bestHost.png';
import hostDummyImage from '../../../public/images/hostImage.png';
import Image from 'next/image';

const dummyHostImage = dummyImage;

const BestHostsSection = () => {
  const { t, i18n } = useTranslation('home');
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selected, setSelected] = useState('month');
  const [open, setOpen] = useState(false);
  const sliderRef = useRef(null);

  const options = ['month', 'year'];

  // Sample hosts data - replace with API data
  const originalHosts = [
    {
      id: 1,
      name: 'Ahmed Mohamed',
      location: 'Riyadh',
      rating: 4.8,
      image: hostDummyImage,
      propertyImage: dummyHostImage,
    },
    {
      id: 2,
      name: 'Mohamed Adam',
      location: 'Riyadh, Jeddah, Al Ula',
      rating: 4.0,
      image: hostDummyImage,
      propertyImage: dummyHostImage,
    },
    {
      id: 3,
      name: 'Asad Fadel',
      location: 'Al Ula',
      rating: 4.9,
      image: hostDummyImage,
      propertyImage: dummyHostImage,
    },
    {
      id: 4,
      name: 'Faisal Gamdi',
      location: 'Jeddah, Riyadh',
      rating: 4.9,
      image: hostDummyImage,
      propertyImage: dummyHostImage,
    },
    {
      id: 5,
      name: 'Omar Hassan',
      location: 'Makkah',
      rating: 4.7,
      image: hostDummyImage,
      propertyImage: dummyHostImage,
    },
    {
      id: 6,
      name: 'Abdullah Khan',
      location: 'Dammam',
      rating: 4.8,
      image: hostDummyImage,
      propertyImage: dummyHostImage,
    },
  ];

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

  // ✅ Clone hosts for infinite loop
  const hosts = [
    ...originalHosts.slice(-itemsPerView), // Last items at start
    ...originalHosts,
    ...originalHosts.slice(0, itemsPerView), // First items at end
  ];

  // ✅ Start from first real slide (after cloned items)
  useEffect(() => {
    setCurrentSlide(itemsPerView);
  }, [itemsPerView]);

  // ✅ Handle transition end for seamless loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    // Jump to real start/end if at clones
    if (currentSlide === 0) {
      setCurrentSlide(originalHosts.length);
    } else if (currentSlide >= originalHosts.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  // ✅ Next Slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // ✅ Previous Slide
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  const HostCard = ({ host }) => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 transform  flex-shrink-0 w-full md:w-auto group">
      <div className="relative">
        {/* Property Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <Image
            src={host.propertyImage}
            alt={`${host.name}'s property`}
            className="w-full h-full object-cover transition-transform duration-500"
            width={300}
            height={225}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDMwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgOTBMMTUwIDEyMEwxODAgOTBMMjEwIDEyMFYxNjVIMTIwVjkwWiIgZmlsbD0iI0Q5RERENCIvPgo8Y2lyY2xlIGN4PSIxMzUiIGN5PSIxMDUiIHI9IjE1IiBmaWxsPSIjRDlEREQ0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTkwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByb3BlcnR5IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-[#FCFCFD] bg-opacity-90 backdrop-blur-sm rounded-[24px] px-2 py-1 flex items-center gap-1 shadow-lg">
            <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-xs font-semibold text-gray-800">{host.rating}</span>
          </div>
        </div>

        {/* Host Profile Circle */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-[80px] h-[80px] rounded-full border-4 border-white overflow-hidden shadow-lg">
            <Image
              src={host.image}
              alt={host.name}
              className="object-cover"
              width={80}
              height={80}
              loading="lazy"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPC9zdmc+';
              }}
            />
          </div>
        </div>
      </div>

      {/* Host Info */}
      <div className="pt-10 pb-6 px-6 text-center">
        <h3 className="font-medium text-[#23262F] text-sm sm:text-[16px] font-poppins mt-4">
          {host.name}
        </h3>
        <p className="text-[#777E90] font-poppins font-normal text-xs mt-1">
          {host.location}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div className="flex flex-col md:flex md:flex-row items-start lg:items-center gap-4">
          <h2 className="text-4xl font-bold md:text-5xl font-dm-sans">{t('besthost.title')}</h2>
          <div className="relative inline-block text-left">
            {/* Trigger */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setOpen(!open)}
            >
              <span className="text-4xl font-bold md:text-5xl font-dm-sans text-[#3B71FE]">
                {t(`besthost.options.${selected}`)}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#3B71FE] mt-2 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Dropdown Options */}
            {open && (
              <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-40 p-2 z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    {t(`besthost.options.${option}`)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Previous hosts"
          >
            {isRTL ? (
              <MoveRight className="w-5 h-5 text-gray-700" />
            ) : (
              <MoveLeft className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={nextSlide}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Next hosts"
          >
            {isRTL ? (
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
          className={`flex -mx-2 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {hosts.map((host, index) => (
            <div key={`${host.id}-${index}`} className="w-1/4 flex-shrink-0 px-2">
              <HostCard host={host} />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Mobile Infinite Slider */}
      <div className="md:hidden relative">
        <div className="overflow-hidden pb-2 rounded-2xl">
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {hosts.map((host, index) => (
              <div key={`${host.id}-${index}`} className="w-full flex-shrink-0 px-2">
                <HostCard host={host} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 items-center mt-8">
          <button
            onClick={prevSlide}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Previous host"
          >
            {isRTL ? (
              <MoveRight className="w-5 h-5 text-gray-700" />
            ) : (
              <MoveLeft className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={nextSlide}
            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Next host"
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

export default BestHostsSection;