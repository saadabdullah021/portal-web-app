'use client';
import { Trans, useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import SearchBar from './ui/SearchBar';

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
        <div className="text-center lg:text-left">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
             <Trans i18nKey="title" ns="hero" />
          </h1>
          <p className="mt-4 font-poppins text-xl text-gray-600">{subtitle}</p>
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
