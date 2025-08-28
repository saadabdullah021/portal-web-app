// components/AuthorCard.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import hostImage from '../../../public/images/hostImage.png';

const AuthorCard = ({ name, rating = "5.0", position }) => {
  return (
    <div
      className={`absolute bg-white bg-opacity-90 backdrop-blur-sm 
      rounded-[80px] pr-12 pl-4 py-3 flex items-center space-x-3 shadow-lg pointer-events-auto ${position}`}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <Image
          src={hostImage}
          alt={name}
          className="w-12 h-12 rounded-full object-fill"
        />
      </div>
      <div className="text-gray-800">
        <p className="font-medium text-[16px]">{name}</p>
        <div className="flex items-center space-x-1">
          <Star className="text-yellow-500 w-4 h-4" fill="yellow" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
