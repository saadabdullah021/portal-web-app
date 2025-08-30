'use client';
import { Trans, useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import SearchBar from '../ui/SearchBar';

const HeroSection = () => {
  const { t } = useTranslation('hero'); 
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    const dummyText = "Find the best places to stay, eat, and explore around the world."; 
    setSubtitle(dummyText);
  }, []);

  const handleSearch = (searchData) => {
    console.log(searchData); 
  };

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute rounded-3xl inset-0 bg-gradient-to-r from-[#3B71FE40]/45 to-[#3B71FE40]/85 my-1"></div>

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-6 md:py-12 lg:py-20">
        <div className="text-center lg:text-left py-3 lg:py-4">
          <h1 className="text-[48px] font-bold leading-[56px] lg:leading-[110px]  font-dm-sans text-[#23262F] sm:text-[60px] lg:text-[98px]">
             <Trans i18nKey="title" ns="hero" />
          </h1>
          <p className="mt-4 text-lg font-medium lg:font-normal max-w-xs lg:max-w-full text-center lg:text-left mx-auto lg:mx-0  lg:text-2xl text-[#23262F] ">{subtitle}</p>
        </div>

        {/* ✅ Reusable SearchBar Component */}
        <div className="mt-16 lg:mt-12">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
