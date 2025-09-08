'use client'
import React, { useState } from 'react';
import { 
  Star,
  Users,
  Bed,
  Bath,
  CalendarDays,
  User,
  Plus,
  Calendar,
  Flag,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Utensils,
  Shield,
  Camera
} from 'lucide-react';
import { HiOutlineFlag } from "react-icons/hi2";
import { current } from '@reduxjs/toolkit';

const PropertyDetailsSection = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  
  // const toggleSave = (propertyId) => {
  //   setSavedProperties(prev => 
  //     prev.includes(propertyId) 
  //       ? prev.filter(id => id !== propertyId)
  //       : [...prev, propertyId]
  //   );
  // };

  const propertyId = 'property-1';
  // const isSaved = savedProperties.includes(propertyId);

  const amenities = [
    { icon: Wifi, label: 'Fast WiFi' },
    { icon: Car, label: 'Free parking' },
    { icon: Coffee, label: 'Kitchen' },
    { icon: Tv, label: 'TV with streaming' },
    { icon: Wind, label: 'Air conditioning' },
    { icon: Utensils, label: 'Dedicated workspace' },
    { icon: Shield, label: 'Security cameras' },
    { icon: Camera, label: 'Pool' }
  ];

  return (
    <div className="max-w-6xl 2xl:max-w-[1280px] mx-auto px-4 bg-white pt-12 lg:pt-[420px] pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full lg:gap-58">
        
        {/* Left Content - Main Details */}
        <div className=" space-y-8 lg:w-[620px]">
          
          {/* Title and Host Info */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold font-dm-sans text-[#23262F] leading-tight">
              Unmatched Sanctuary Awaits
            </h1>
            
            <div className="flex items-center gap-3">
              <span className="text-[#777E90] text-sm">Hosted by</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">F</span>
                </div>
                <span className="font-medium  text-[16px] text-[#23262F]">Faisal A.</span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[#777E90] text-sm border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.9928 3.47604L9.99978 3.47242L10.0071 3.4762L13.7183 5.70292L14.9998 6.47502V15.6667C14.9998 16.161 14.9985 16.4314 14.9826 16.6257L14.9807 16.6477L14.9587 16.6496C14.7644 16.6655 14.494 16.6667 13.9998 16.6667H5.99978C5.50556 16.6667 5.23514 16.6655 5.04083 16.6496L5.01886 16.6477L5.01695 16.6257C5.00107 16.4314 4.99978 16.161 4.99978 15.6667V6.47504L6.27658 5.70577L9.9928 3.47604ZM5.41785 4.27736L1.23772 6.78544C0.84307 7.02223 0.715099 7.53411 0.95189 7.92876C1.18868 8.32341 1.70056 8.45138 2.09521 8.21459L3.33311 7.47186V15.6667C3.33311 16.6002 3.33311 17.0669 3.51477 17.4234C3.67455 17.737 3.92952 17.992 4.24313 18.1518C4.59964 18.3334 5.06636 18.3334 5.99978 18.3334H13.9998C14.9332 18.3334 15.3999 18.3334 15.7564 18.1518C16.07 17.992 16.325 17.737 16.4848 17.4234C16.6664 17.0669 16.6664 16.6002 16.6664 15.6667V7.47183L17.9044 8.21459C18.299 8.45138 18.8109 8.32341 19.0477 7.92876C19.2845 7.53411 19.1565 7.02223 18.7619 6.78544L14.5769 4.27448L11.376 2.34591C11.1432 2.20569 10.9646 2.09809 10.8133 2.01718C10.778 1.99742 10.7421 1.97904 10.7058 1.96205C10.5798 1.90058 10.4706 1.85967 10.3584 1.83495C10.1222 1.78288 9.87738 1.78288 9.6411 1.83495C9.52864 1.85973 9.41918 1.9008 9.29281 1.96253C9.25714 1.97925 9.22192 1.9973 9.18722 2.01668C9.03567 2.09764 8.85682 2.2054 8.62361 2.34591L5.41785 4.27736Z" fill="#777E91"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.8333 16.6666V13.3333C10.8333 12.873 10.4602 12.4999 10 12.4999C9.53976 12.4999 9.16667 12.873 9.16667 13.3333V16.6666H10.8333ZM10 10.8333C8.61929 10.8333 7.5 11.9525 7.5 13.3333V18.3333H12.5V13.3333C12.5 11.9525 11.3807 10.8333 10 10.8333Z" fill="#777E91"/>
</svg>

                <span>2 guests</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineFlag size={20} />
                <span>1 bedroom</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineFlag size={20} />
                <span>1 private bath</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 text-[#777E90] text-[16px] font-normal leading-relaxed">
            <p>
              Step into a world where every detail is curated for your ultimate comfort and 
              discretion. This exquisite villa offers an unparalleled sense of privacy, making 
              it an ideal haven for discerning families and women travelers seeking a truly 
              exclusive experience.
            </p>
            
            <p>
              With features like smartlock security and the option of an all-female host 
              team, your peace of mind is our priority, ensuring a safe and serene 
              environment for all guests.
            </p>
            
            <p>
              Beyond its secure and private ambiance, this villa is a testament to refined 
              elegance and cultural authenticity. Designed with a keen eye for aesthetics, 
              the interiors boast a "Photo-Worthy" appeal, featuring sophisticated decor 
              and optimal lighting for capturing cherished memories.
            </p>
          </div>

          {/* Amenities Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#23262F]">Amenities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 py-3">
                  <amenity.icon size={20} className="text-gray-600 flex-shrink-0" />
                  <span className="text-[#777E90] text-[16px] font-medium">{amenity.label}</span>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center px-4 py-2 border-2 text-[16px] border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors duration-200 font-bold font-dm-sans">
              More detail
            </button>
          </div>
        </div>

        {/* Right Sidebar - Booking Card */}
        <div className="">
<div className="lg:w-[450px] mx-auto">
      <div className="bg-white border border-[#E6E8EC] rounded-3xl shadow-lg p-6 space-y-6">
        
        {/* Price and Rating */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[#B1B5C3] text-[32px] font-bold font-dm-sans line-through">5k</span>
            <span className="text-2xl md:text-3xl font-bold font-dm-sans text-[#23262F]">3,200 SAR</span>
            <span className="text-[#777E90] text-[16px]">/ night</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-[#23262F] text-sm">4.8</span>
            <span className="text-[#777E90] text-[14px]">(256 reviews)</span>
          </div>
        </div>

        {/* Booking Dates */}
        <div className='bg-[#F4F5F6] rounded-[20px] p-2'>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className=" rounded-lg p-3">
            <div className="flex items-start gap-3 text-xs text-[#777E90] mb-1">
              <Calendar size={24}  />  
              <div>
              <span className='text-[12px] text-[#777E90]'>Check-in</span>

            <div className="font-semibold text-[#23262F] text-[16px]">May 15, 2026</div>
              </div>
            </div>
          </div>
          
          <div className=" rounded-lg p-3">
            <div className="flex item-start gap-3 text-xs text-gray-500 mb-1">
              <Calendar size={24} />
              <div>
              <span className='text-[12px] text-[#777E90]' >Check-out</span>
            <div className="font-semibold text-[#23262F] text-[16px]">May 22, 2026</div>

              </div>
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className=" rounded-lg p-3">
          <div className="flex item-start gap-3 text-xs text-gray-500 mb-1">
            <User size={24} />
            <div>
            <span className='text-[12px] text-[#777E90]'>Guest</span>
          <div className="font-semibold text-[#23262F] text-[16px]">2 guests</div>

            </div>
          </div>
        </div>

        </div>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={toggleSave}
            className={`flex-shrink-0 px-6 py-2 border-2 border-[#E6E8EC] rounded-full font-medium transition-colors duration-200 ${
              isSaved 
                ? 'bg-gray-100 text-gray-700' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className='text-[16px] text-[#23262F] font-bold font-dm-sans'>Save</span>
              <Plus size={16} className={isSaved ? 'rotate-45' : ''} />
            </div>
          </button>
          
          <button className="flex-1 bg-[#3B71FE] hover:bg-blue-700 text-[16px]  font-bold font-dm-sans text-white  py-2 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2">
            <CalendarDays size={18} />
            Reserve
          </button>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4 pt-4 ">
          <div className="flex justify-between text-[#777E90] text-sm">
            <span>3,200 SAR × 3 nights</span>
            <span className='font-medium text-[#23262F] '>9,600 SAR</span>
          </div>
          
          <div className="flex justify-between text-[#777E90] text-sm">
            <span>Cleaning Fee</span>
            <span  className='font-medium text-[#23262F] '>150 SAR</span>
          </div>
          
          <div className="flex justify-between text-[#777E90] text-sm">
            <span>Service fee</span>
            <span  className='font-medium text-[#23262F] '>325</span>
          </div>
          
          <div className="flex justify-between font-semibold text-sm text-[#23262F] pt-3 bg-[#F4F5F6] px-3 py-2 rounded-lg">
            <span>Total</span>
            <span>9,985 SAR</span>
          </div>
        </div>

        {/* Report Link */}
        <div className="pt-4 w-full mx-auto">
          <button className="flex items-center justify-center gap-2 mx-auto text-[#777E90] text-[12px] hover:text-gray-900 text-sm transition-colors duration-200">
            <Flag size={14} />
            <span className="underline">Report this property</span>
          </button>
        </div>
      </div>
    </div>        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSection;