'use client';
import React from 'react';
import Image from 'next/image';
import dummyLocation from '../../../public/images/dummyLocation.png';

const Card = ({ place }) => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 group cursor-pointer">
      {/* Price Badge */}
      <div className="absolute top-2 left-2 bg-[#F4F5F6] text-[#777E90] text-xs font-bold px-3 py-1.5 rounded-[32px] ">
        {place.price}
      </div>

      {/* Image */}
      <div className="flex items-center justify-center mb-3">
        <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden mt-12 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          <Image
            src={place.image || dummyLocation} // agar API se image null/undefined ho to fallback
            alt={place.name}
            fill
            className="object-cover  duration-500"
            sizes="80px"
          />
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-medium text-[#23262F] text-sm sm:text-[16px] font-poppins  mt-4">
          {place.name}
        </h3>
        <p className="text-[#777E90] font-poppins font-normal text-xs mt-2">
          {place.duration}
        </p>
      </div>
    </div>
  );
};

export default Card;
