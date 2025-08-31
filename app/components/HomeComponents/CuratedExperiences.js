'use client';

import { useState } from 'react';
import Image from 'next/image';
import justForYou from "../../../public/images/justforyou.png";
import curatedImage from "../../../public/images/curatedImage.png";
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const CuratedExperiences = () => {
  const { t } = useTranslation('home');
  // Initial experiences data
  const allExperiences = [
    {
      id: 1,
      title: "Your Eid. Your escape.",
      properties: 343,
      image: curatedImage, // Replace with your actual image path
      alt: "Family Eid celebration"
    },
    {
      id: 2,
      title: "Winter Nights",
      properties: 398,
      image: justForYou, // Replace with your actual image path
      alt: "People sitting around campfire"
    },
    {
      id: 3,
      title: "Off the Beaten Path",
      properties: 12,
      image: justForYou, // Replace with your actual image path
      alt: "Person feeding goats in desert"
    },
    // Additional experiences for load more functionality
    {
      id: 4,
      title: "Desert Adventures",
      properties: 156,
      image: justForYou,
      alt: "Desert adventure experience"
    },
    {
      id: 5,
      title: "Cultural Heritage",
      properties: 89,
      image: justForYou,
      alt: "Cultural heritage experience"
    },
    {
      id: 6,
      title: "Mountain Escapes",
      properties: 234,
      image: justForYou,
      alt: "Mountain escape experience"
    }
  ];
  

  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, allExperiences.length));
      setIsLoading(false);
    }, 1000);
  };

  const visibleExperiences = allExperiences.slice(0, visibleCount);
  const hasMore = visibleCount < allExperiences.length;

  return (
    <section className="w-full py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#23262F]  font-dm-sans mb-4">
            {t('curatedExperiences.title')}
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            {t('curatedExperiences.subtitle')}
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleExperiences.map((experience) => (
            <div
              key={experience.id}
              className=" overflow-hidden rounded-2xl   transition-all duration-300 "
            >
              {/* Image Container */}
       <div className="relative overflow-hidden 
                aspect-auto  h-[350px]
                 lg:h-[480px] lg:aspect-auto rounded-2xl">
  <Image
    src={experience.image}
    alt={experience.alt}
    fill
    className="object-cover transition-transform"
    sizes="(max-width: 768px) 100vw, 
           (max-width: 1024px) 100vw,"
  />
  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
</div>


              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg md:text-lg font-medium font-poppins text-center text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {experience.title}
                </h3>
                <p className="text-[#777E90] font-normal font-poppins text-sm md:text-base text-center">
                  {experience.properties} {t('curatedExperiences.properties')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-[90px] text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader className=" animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
    <Loader size={18} />
                
                  <span className='font-bold text-sm text-black'>
{t('buttons.load more')}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CuratedExperiences;