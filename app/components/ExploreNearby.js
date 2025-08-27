'use client';
import React from 'react';
import Card from './ui/Card'; 
import dummyLocation from '../../public/images/dummyLocation.png';

const ExploreNearby = ({ places = [] }) => {
  // Default Dummy Data
  const defaultPlaces = [
    { id: 1, name: 'Ad Diriyah, Riyadh', duration: '15 minutes drive', price: '1480', image: dummyLocation },
    { id: 2, name: 'Location', duration: '15 minutes drive', price: '1480', image: dummyLocation },
    { id: 3, name: 'Al Ula', duration: '8 hours drive', price: '1480', image: dummyLocation },
    { id: 4, name: 'Location', duration: '15 minutes drive', price: '1480', image: dummyLocation },
    { id: 5, name: 'Red Sea', duration: '15 minutes drive', price: '1480', image: dummyLocation },
    { id: 6, name: 'Ad Diriyah, Riyadh', duration: '15 minutes drive', price: '1480', image: dummyLocation },
    { id: 7, name: 'Location', duration: '15 minutes drive', price: '1480', image: dummyLocation },
    { id: 8, name: 'Al Ula', duration: '8 hours drive', price: '1480', image: dummyLocation }
  ];

  const displayPlaces = places.length > 0 ? places : defaultPlaces;

  return (
    <section className="w-full bg-[#F4F5F6] rounded-3xl py-10 sm:py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#23262F]  font-dm-sans mb-4">
            Explore nearby
          </h2>
          <p className="text-base sm:text-lg text-gray-500">
            10,789 beautiful places to go
          </p>
        </div>

        {/* Unified Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayPlaces.slice(0, 5).map((place) => (
            <Card key={place.id} place={place} />
          ))}

          <div className="hidden lg:block"></div>
          {displayPlaces.slice(5, 8).map((place) => (
            <Card key={place.id} place={place} />
          ))}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default ExploreNearby;
