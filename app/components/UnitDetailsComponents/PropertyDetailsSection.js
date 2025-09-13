'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
  Star,
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
  Camera,
  Loader,
  UserRound,
  Minus
} from 'lucide-react';
import { HiOutlineFlag } from "react-icons/hi2";
import DateInput from '../ui/DateInput';
import { useTranslation } from 'react-i18next';
import hostImage from "../../../public/images/hostImage.png"
import Image from 'next/image';

const PropertyDetailsSection = ({ listingData }) => {
  const { t, i18n } = useTranslation('hero');
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [loadingAmenities, setLoadingAmenities] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showMobileBooking, setShowMobileBooking] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        travelersRef.current && !travelersRef.current.contains(event.target)

      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const travelersRef = useRef(null);
  const totalTravelers = adults + children + infants;
  // const toggleSave = (propertyId) => {
  //   setSavedProperties(prev => 
  //     prev.includes(propertyId) 
  //       ? prev.filter(id => id !== propertyId)
  //       : [...prev, propertyId]
  //   );
  // };
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  // const isSaved = savedProperties.includes(propertyId);

  // Use API amenities if available, otherwise fallback to default amenities
  const apiAmenities = listingData?.data?.amenities?.map(amenity => ({
    icon: Wifi, // Default icon, you can map based on amenity_name if needed
    label: amenity.amenity_name,
    group: amenity.group_name
  })) || [];

  const defaultAmenities = [
    { icon: Wifi, label: 'Fast WiFi' },
    { icon: Car, label: 'Free parking' },
    { icon: Coffee, label: 'Kitchen' },
    { icon: Tv, label: 'TV with streaming' },
    { icon: Wind, label: 'Air conditioning' },
    { icon: Utensils, label: 'Dedicated workspace' },
    { icon: Shield, label: 'Security cameras' },
    { icon: Camera, label: 'Pool' }
  ];

  const amenities = apiAmenities.length > 0 ? apiAmenities : defaultAmenities;

  return (
    <div className="max-w-6xl 2xl:max-w-[1280px] mx-auto px-4 bg-white pt-12 lg:pt-[420px] pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full lg:gap-58">

        {/* Left Content - Main Details */}
        <div className=" space-y-8 lg:w-[620px]">

          {/* Title and Host Info */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold font-dm-sans text-[#23262F] leading-tight">
              {listingData?.data?.title || "Property Title"}
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-[#777E90] text-sm">{t('hosted_by')}</span>
              <div className="flex items-center gap-2">
                {listingData?.data?.host_details?.host_profile_picture ? (
                  <img
                    src={listingData.data.host_details.host_profile_picture}
                    alt={listingData.data.host_details.host_name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {listingData?.data?.host_details?.host_name?.charAt(0) || 'H'}
                    </span>
                  </div>
                )}
                <span className="font-medium text-[16px] text-[#23262F]">
                  {listingData?.data?.host_details?.host_name || 'Host'}
                </span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[#777E90] text-sm border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.9928 3.47604L9.99978 3.47242L10.0071 3.4762L13.7183 5.70292L14.9998 6.47502V15.6667C14.9998 16.161 14.9985 16.4314 14.9826 16.6257L14.9807 16.6477L14.9587 16.6496C14.7644 16.6655 14.494 16.6667 13.9998 16.6667H5.99978C5.50556 16.6667 5.23514 16.6655 5.04083 16.6496L5.01886 16.6477L5.01695 16.6257C5.00107 16.4314 4.99978 16.161 4.99978 15.6667V6.47504L6.27658 5.70577L9.9928 3.47604ZM5.41785 4.27736L1.23772 6.78544C0.84307 7.02223 0.715099 7.53411 0.95189 7.92876C1.18868 8.32341 1.70056 8.45138 2.09521 8.21459L3.33311 7.47186V15.6667C3.33311 16.6002 3.33311 17.0669 3.51477 17.4234C3.67455 17.737 3.92952 17.992 4.24313 18.1518C4.59964 18.3334 5.06636 18.3334 5.99978 18.3334H13.9998C14.9332 18.3334 15.3999 18.3334 15.7564 18.1518C16.07 17.992 16.325 17.737 16.4848 17.4234C16.6664 17.0669 16.6664 16.6002 16.6664 15.6667V7.47183L17.9044 8.21459C18.299 8.45138 18.8109 8.32341 19.0477 7.92876C19.2845 7.53411 19.1565 7.02223 18.7619 6.78544L14.5769 4.27448L11.376 2.34591C11.1432 2.20569 10.9646 2.09809 10.8133 2.01718C10.778 1.99742 10.7421 1.97904 10.7058 1.96205C10.5798 1.90058 10.4706 1.85967 10.3584 1.83495C10.1222 1.78288 9.87738 1.78288 9.6411 1.83495C9.52864 1.85973 9.41918 1.9008 9.29281 1.96253C9.25714 1.97925 9.22192 1.9973 9.18722 2.01668C9.03567 2.09764 8.85682 2.2054 8.62361 2.34591L5.41785 4.27736Z" fill="#777E91" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.8333 16.6666V13.3333C10.8333 12.873 10.4602 12.4999 10 12.4999C9.53976 12.4999 9.16667 12.873 9.16667 13.3333V16.6666H10.8333ZM10 10.8333C8.61929 10.8333 7.5 11.9525 7.5 13.3333V18.3333H12.5V13.3333C12.5 11.9525 11.3807 10.8333 10 10.8333Z" fill="#777E91" />
                </svg>
                <span>{listingData?.data?.adults || 0} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineFlag size={20} />
                <span>{listingData?.data?.no_of_bedrooms || 0} bedroom{listingData?.data?.no_of_bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineFlag size={20} />
                <span>{listingData?.data?.no_of_toilets || 0} private bath{listingData?.data?.no_of_toilets !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4  text-[#777E90]  text-[16px] font-normal leading-relaxed">
            {listingData?.data?.description ? (
              <div dangerouslySetInnerHTML={{ __html: listingData.data.description }} />
            ) : (
              <p>No description available for this property.</p>
            )}
          </div>

          {/* Amenities Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#23262F]">{t('Amenities')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAllAmenities ? amenities : amenities.slice(0, 8)).map((amenity, index) => ( // new line
                <div key={index} className="flex items-center gap-3 py-3">
                  <amenity.icon size={20} className="text-gray-600 flex-shrink-0" />
                  <span className="text-[#777E90] text-[16px] font-medium">{amenity.label}</span>
                </div>
              ))}
            </div>

            {/* show button only if amenities > 8 */}
            {amenities.length > 6 && !showAllAmenities && ( // new line
              <button
                onClick={() => {
                  setLoadingAmenities(true); // new line
                  setTimeout(() => { // simulate loader delay new line
                    setShowAllAmenities(true); // new line
                    setLoadingAmenities(false); // new line
                  }, 1200); // loader 1.2 sec new line
                }}
                className="inline-flex items-center px-4 py-2 border-2 text-[16px] border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors duration-200 font-bold font-dm-sans"
              >
                {loadingAmenities ? ( // new line
                  <>
                    <span>{t('More detail')}</span>
                    <Loader size={16} className="animate-spin ml-1" />
                  </>
                ) : (
                  <>
                    {t('More detail')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>


        {/* Mobile reserve section */}
        <div onClick={() => setShowMobileBooking(true)} className=" fixed bottom-0 left-0 right-0 z-50 w-full flex items-center lg:hidden justify-between bg-[#FCFCFD] rounded-tr-3xl rounded-tl-3xl  shadow-lg border border-[#E6E8EC] p-6">



          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              {listingData?.data?.discounted_price && listingData.data.discounted_price !== '0' && (
                <span className="text-[#B1B5C3] text-[24px] font-semibold font-dm-sans line-through">{listingData.data.actual_price}</span>
              )}
              <span className="text-2xl font-semibold font-dm-sans text-[#23262F]">
                {listingData?.data?.discounted_price && listingData.data.discounted_price !== '0'
                  ? listingData.data.discounted_price
                  : listingData?.data?.actual_price || '0'} SAR
              </span>
              <span className="text-[#777E90] text-[14px]">/ {t('night')}</span>
            </div>

            <div className="flex items-center gap-2">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-[#23262F] text-sm">{listingData?.data?.rating || '0'}</span>
              <span className="text-[#777E90] text-[14px]">({listingData?.data?.reviews || 0} {t('reviews')})</span>
            </div>
          </div>

          {/* Reserve Button */}
          <button
            // onClick={() => setShowMobileBooking(true)}
            className="w-auto bg-[#3B71FE] hover:bg-blue-700 text-white py-4 px-6 rounded-full transition-colors duration-200 text-[16px] font-bold font-dm-sans">
            {t('Reserve')}
          </button>
        </div>


        {/* Mobile Booking Popup */} {/* new line */}
        {showMobileBooking && ( // new line
          <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center"> {/* new line */}
            {/* Overlay */} {/* new line */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileBooking(false)} // new line
            ></div>

            {/* Bottom Sheet */} {/* new line */}
            <div className="relative w-full h-[85vh] md:h-[70vh] animate-slideUp "> {/* new line */}
              {/* Close Button */} {/* new line */}
              <button
                onClick={() => setShowMobileBooking(false)} // new line
                className="absolute top-3 right-4 text-gray-500"
              >
                ✕
              </button>


              <div className="overflow-y-auto overflow-x-hidden h-full">


                <div className="">
                  <div className="lg:w-[450px] mx-auto">
                    <div className="bg-white border border-[#E6E8EC] rounded-3xl shadow-lg p-6 space-y-6">

                      {/* Price and Rating */}
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                          {listingData?.data?.discounted_price && listingData.data.discounted_price !== '0' && (
                            <span className="text-[#B1B5C3] text-[32px] font-bold font-dm-sans line-through">{listingData.data.actual_price}</span>
                          )}
                          <span className="text-2xl md:text-3xl font-bold font-dm-sans text-[#23262F]">
                            {listingData?.data?.discounted_price && listingData.data.discounted_price !== '0'
                              ? listingData.data.discounted_price
                              : listingData?.data?.actual_price || '0'} SAR
                          </span>
                          <span className="text-[#777E90] text-[16px]">/ {t('night')}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-[#23262F] text-sm">{listingData?.data?.rating || '0'}</span>
                          <span className="text-[#777E90] text-[14px]">({listingData?.data?.reviews || 0} {t('reviews')})</span>
                        </div>
                      </div>

                      {/* Booking Dates */}
                      <div className='bg-[#F4F5F6] rounded-[20px] p-2'>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className=" rounded-lg p-3">
                            <div
                              className={`rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "checkIn" ? " lg:bg-transparent" : "lg:bg-transparent "} 
              bg-white/60`}
                              onClick={() =>
                                setActiveDropdown(activeDropdown === "checkIn" ? null : "checkIn")
                              }
                            >
                              <DateInput
                                label={t('checkIn')}
                                icon={Calendar}
                                value={checkIn}
                                onChange={setCheckIn}
                                dropdownPosition="top-full  lg:top-20"
                                dropdownAlign={i18n.language === "ar" ? "lg:-left-48" : "lg:left-0"}
                              />
                            </div>
                          </div>

                          <div className=" rounded-lg p-3">
                            <div
                              className={`rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "checkIn" ? " lg:bg-transparent" : "lg:bg-transparent  "} 
              bg-white/60`}
                              onClick={() =>
                                setActiveDropdown(activeDropdown === "checkIn" ? null : "checkIn")
                              }
                            >
                              <DateInput
                                label={t('checkOut')}
                                icon={Calendar}
                                value={checkOut}
                                onChange={setCheckOut}
                                dropdownPosition="top-full  lg:top-20"
                                dropdownAlign={i18n.language === "ar" ? "lg:left-2" : "lg:right-2"}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Guests */}
                        <div className=" rounded-lg p-3">
                          {/* Travelers */}
                          <div className=" relative pt-1 " ref={travelersRef}>
                            <div
                              className={`lg:flex-1 rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "travelers" ? " lg:bg-transparent " : "lg:bg-transparent  "} 
              bg-white/60`}
                              onClick={() =>
                                setActiveDropdown(activeDropdown === "travelers" ? null : "travelers")
                              }
                            >
                              <div className="flex items-start space-x-2">
                                <UserRound color='#B1B5C3' size={24} className='mt-0 lg:mt-2.5' />
                                <div className="flex flex-col w-full">
                                  <label className={`text-lg lg:text-[24px] cursor-pointer  font-semibold pl-2 pt-2 lg:pt-1 mb-1 hidden lg:block
                    ${i18n.language === "ar" ? "lg:mr-2  " : " "}
                  `}>
                                    {t('travelers')}
                                  </label>
                                  <span className="px-3 text-[#23262F] lg:pb-1 lg:text-[#777E90] text-[16px] font-medium">
                                    {totalTravelers > 0 ? `${totalTravelers} ${t('guestsPlaceholder')} ` : t('guestsPlaceholder')}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Travelers Popup */}
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className={`
              absolute z-50 bg-[#fff] shadow-xl bottom-12 lg:-bottom-70 rounded-3xl max-h-[300px] w-full lg:min-w-[420px] overflow-y-auto p-8 space-y-6
              transition-all duration-300 ease-in-out origin-top
              ${i18n.language === "ar" ? "right-0 lg:-right-8" : "right-0 lg:-right-8"}
              ${activeDropdown === "travelers"
                                  ? "opacity-100 scale-100 translate-y-0"
                                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                }
            `}
                            >
                              {/* Adults */}
                              <div className="flex items-center justify-between border-b pb-3 border-gray-300">
                                <div>
                                  <p className="font-medium text-[16px] text-gray-900">
                                    {t('Adults')}
                                  </p>
                                  <p className="text-[12px] text-gray-500">
                                    {t('Ages 13 and above')}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => setAdults(Math.max(0, adults - 1))}
                                    className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                                  >
                                    <Minus size={16} color='#B1B5C3' className="hover:#3B71FE" />
                                  </button>
                                  <span className={`w-4 text-center text-[16px] font-medium text-[#23262F]
                                         ${i18n.language === "ar" ? " pl-6" : " "}
                  `}>{adults}</span>
                                  <button
                                    onClick={() => setAdults(adults + 1)}
                                    className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                                  >
                                    <Plus size={16} color='#B1B5C3' className="hover:#3B71FE" />
                                  </button>
                                </div>
                              </div>
                              {/* Children */}
                              <div className="flex items-center justify-between border-b pb-3 border-gray-300">
                                <div>
                                  <p className="font-medium text-[16px] text-gray-900">
                                    {t('Children')}
                                  </p>
                                  <p className="text-[12px] text-gray-500">
                                    {t('Ages 2 - 12')}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                    className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                                  >
                                    <Minus size={16} color='#B1B5C3' />
                                  </button>
                                  <span className={`w-4 text-center text-[16px] font-medium text-[#23262F]
                     ${i18n.language === "ar" ? " pl-6" : " "}
                  `}>{children}</span>
                                  <button
                                    onClick={() => setChildren(children + 1)}
                                    className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                                  >
                                    <Plus size={16} color='#B1B5C3' />
                                  </button>
                                </div>
                              </div>
                              {/* Infants */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-[16px] text-gray-900">
                                    {t('Infants')}
                                  </p>
                                  <p className="text-[12px] text-gray-500">
                                    {t('Under 2 years')}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => setInfants(Math.max(0, infants - 1))}
                                    className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                                  >
                                    <Minus size={16} color='#B1B5C3' />
                                  </button>
                                  <span className={`w-4 text-center text-[16px] font-medium text-[#23262F]
                     ${i18n.language === "ar" ? " pl-6" : " "}
                  `}>{infants}</span>
                                  <button
                                    onClick={() => setInfants(infants + 1)}
                                    className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                                  >
                                    <Plus size={16} color='#B1B5C3' />
                                  </button>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>

                      </div>
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={toggleSave}
                          className={`flex-shrink-0 px-6 py-2 border-2 border-[#E6E8EC] rounded-full font-medium transition-colors duration-200 ${isSaved
                            ? 'bg-gray-100 text-gray-700'
                            : 'hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className='text-[16px] text-[#23262F] font-bold font-dm-sans'>{t('Save')}</span>
                            <Plus size={16} className={isSaved ? 'rotate-45' : ''} />
                          </div>
                        </button>

                        <button className="flex-1 bg-[#3B71FE] hover:bg-blue-700 text-[16px]  font-bold font-dm-sans text-white  py-2 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2">
                          <CalendarDays size={18} />
                          {t('Reserve')}
                        </button>
                      </div>

                      {/* Price Breakdown */}
                      <div className="space-y-4 pt-4 ">
                        <div className="flex justify-between text-[#777E90] text-sm">
                          <span>3,200 SAR × 3 {t('nights')}</span>
                          <span className='font-medium text-[#23262F] '>9,600 SAR</span>
                        </div>

                        <div className="flex justify-between text-[#777E90] text-sm">
                          <span>{t('Cleaning Fee')}</span>
                          <span className='font-medium text-[#23262F] '>150 SAR</span>
                        </div>

                        <div className="flex justify-between text-[#777E90] text-sm">
                          <span>{t('Service fee')}</span>
                          <span className='font-medium text-[#23262F] '>325</span>
                        </div>

                        <div className="flex justify-between font-semibold text-sm text-[#23262F] pt-3 bg-[#F4F5F6] px-3 py-2 rounded-lg">
                          <span>{t('Total')}</span>
                          <span>9,985 SAR</span>
                        </div>
                      </div>

                      {/* Report Link */}
                      <div className="pt-4 w-full mx-auto">
                        <button className="flex items-center justify-center gap-2 mx-auto text-[#777E90] text-[12px] hover:text-gray-900 text-sm transition-colors duration-200">
                          <Flag size={14} />
                          <span className="underline">{t('Report this property')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Right Sidebar - Booking Card */}
        <div className="hidden lg:block">
          <div className="lg:w-[450px] mx-auto">
            <div className="bg-white border border-[#E6E8EC] rounded-3xl shadow-lg p-6 space-y-6">

              {/* Price and Rating */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  {listingData?.data?.discounted_price && listingData.data.discounted_price !== '0' && (
                    <span className="text-[#B1B5C3] text-[32px] font-bold font-dm-sans line-through">{listingData.data.actual_price}</span>
                  )}
                  <span className="text-2xl md:text-3xl font-bold font-dm-sans text-[#23262F]">
                    {listingData?.data?.discounted_price && listingData.data.discounted_price !== '0'
                      ? listingData.data.discounted_price
                      : listingData?.data?.actual_price || '0'} SAR
                  </span>
                  <span className="text-[#777E90] text-[16px]">/ {t('night')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-[#23262F] text-sm">{listingData?.data?.rating || '0'}</span>
                  <span className="text-[#777E90] text-[14px]">({listingData?.data?.reviews || 0} {t('reviews')})</span>
                </div>
              </div>

              {/* Booking Dates */}
              <div className='bg-[#F4F5F6] rounded-[20px] p-2'>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className=" rounded-lg p-3">
                    <div
                      className={`rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "checkIn" ? " lg:bg-transparent" : "lg:bg-transparent "} 
              bg-white/60`}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === "checkIn" ? null : "checkIn")
                      }
                    >
                      <DateInput
                        label={t('checkIn')}
                        icon={Calendar}
                        value={checkIn}
                        onChange={setCheckIn}
                        dropdownPosition="top-full  lg:top-20"
                        dropdownAlign={i18n.language === "ar" ? "lg:-left-48" : "lg:left-0"}
                      />
                    </div>
                  </div>

                  <div className=" rounded-lg p-3">
                    <div
                      className={`rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "checkIn" ? " lg:bg-transparent" : "lg:bg-transparent  "} 
              bg-white/60`}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === "checkIn" ? null : "checkIn")
                      }
                    >
                      <DateInput
                        label={t('checkOut')}
                        icon={Calendar}
                        value={checkOut}
                        onChange={setCheckOut}
                        dropdownPosition="top-full  lg:top-20"
                        dropdownAlign={i18n.language === "ar" ? "lg:left-2" : "lg:right-2"}
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className=" rounded-lg p-3">
                  {/* Travelers */}
                  <div className=" relative pt-1 " ref={travelersRef}>
                    <div
                      className={`lg:flex-1 rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "travelers" ? " lg:bg-transparent " : "lg:bg-transparent  "} 
              bg-white/60`}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === "travelers" ? null : "travelers")
                      }
                    >
                      <div className="flex items-start space-x-2">
                        <UserRound color='#B1B5C3' size={24} className='mt-0 lg:mt-2.5' />
                        <div className="flex flex-col w-full">
                          <label className={`text-lg lg:text-[24px] cursor-pointer  font-semibold pl-2 pt-2 lg:pt-1 mb-1 hidden lg:block
                    ${i18n.language === "ar" ? "lg:mr-2  " : " "}
                  `}>
                            {t('travelers')}
                          </label>
                          <span className="px-3 text-[#23262F] lg:pb-1 lg:text-[#777E90] text-[16px] font-medium">
                            {totalTravelers > 0 ? `${totalTravelers} ${t('guestsPlaceholder')} ` : t('guestsPlaceholder')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Travelers Popup */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`
              absolute z-50 bg-[#fff] shadow-xl bottom-12 lg:-bottom-70 rounded-3xl max-h-[300px] w-full lg:min-w-[420px] overflow-y-auto p-8 space-y-6
              transition-all duration-300 ease-in-out origin-top
              ${i18n.language === "ar" ? "right-0 lg:-right-8" : "right-0 lg:-right-8"}
              ${activeDropdown === "travelers"
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }
            `}
                    >
                      {/* Adults */}
                      <div className="flex items-center justify-between border-b pb-3 border-gray-300">
                        <div>
                          <p className="font-medium text-[16px] text-gray-900">
                            {t('Adults')}
                          </p>
                          <p className="text-[12px] text-gray-500">
                            {t('Ages 13 and above')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setAdults(Math.max(0, adults - 1))}
                            className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                          >
                            <Minus size={16} color='#B1B5C3' className="hover:#3B71FE" />
                          </button>
                          <span className={`w-4 text-center text-[16px] font-medium text-[#23262F]
                                         ${i18n.language === "ar" ? " pl-6" : " "}
                  `}>{adults}</span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                          >
                            <Plus size={16} color='#B1B5C3' className="hover:#3B71FE" />
                          </button>
                        </div>
                      </div>
                      {/* Children */}
                      <div className="flex items-center justify-between border-b pb-3 border-gray-300">
                        <div>
                          <p className="font-medium text-[16px] text-gray-900">
                            {t('Children')}
                          </p>
                          <p className="text-[12px] text-gray-500">
                            {t('Ages 2 - 12')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                          >
                            <Minus size={16} color='#B1B5C3' />
                          </button>
                          <span className={`w-4 text-center text-[16px] font-medium text-[#23262F]
                     ${i18n.language === "ar" ? " pl-6" : " "}
                  `}>{children}</span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                          >
                            <Plus size={16} color='#B1B5C3' />
                          </button>
                        </div>
                      </div>
                      {/* Infants */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[16px] text-gray-900">
                            {t('Infants')}
                          </p>
                          <p className="text-[12px] text-gray-500">
                            {t('Under 2 years')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setInfants(Math.max(0, infants - 1))}
                            className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                          >
                            <Minus size={16} color='#B1B5C3' />
                          </button>
                          <span className={`w-4 text-center text-[16px] font-medium text-[#23262F]
                     ${i18n.language === "ar" ? " pl-6" : " "}
                  `}>{infants}</span>
                          <button
                            onClick={() => setInfants(infants + 1)}
                            className="w-6 h-6 border-[2px] flex items-center justify-center border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                          >
                            <Plus size={16} color='#B1B5C3' />
                          </button>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

              </div>
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={toggleSave}
                  className={`flex-shrink-0 px-6 py-2 border-2 border-[#E6E8EC] rounded-full font-medium transition-colors duration-200 ${isSaved
                    ? 'bg-gray-100 text-gray-700'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className='text-[16px] text-[#23262F] font-bold font-dm-sans'>{t('Save')}</span>
                    <Plus size={16} className={isSaved ? 'rotate-45' : ''} />
                  </div>
                </button>

                <button className="flex-1 bg-[#3B71FE] hover:bg-blue-700 text-[16px]  font-bold font-dm-sans text-white  py-2 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2">
                  <CalendarDays size={18} />
                  {t('Reserve')}
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 pt-4 ">
                <div className="flex justify-between text-[#777E90] text-sm">
                  <span>3,200 SAR × 3 {t('nights')}</span>
                  <span className='font-medium text-[#23262F] '>9,600 SAR</span>
                </div>

                <div className="flex justify-between text-[#777E90] text-sm">
                  <span>{t('Cleaning Fee')}</span>
                  <span className='font-medium text-[#23262F] '>150 SAR</span>
                </div>

                <div className="flex justify-between text-[#777E90] text-sm">
                  <span>{t('Service fee')}</span>
                  <span className='font-medium text-[#23262F] '>325</span>
                </div>

                <div className="flex justify-between font-semibold text-sm text-[#23262F] pt-3 bg-[#F4F5F6] px-3 py-2 rounded-lg">
                  <span>{t('Total')}</span>
                  <span>9,985 SAR</span>
                </div>
              </div>

              {/* Report Link */}
              <div className="pt-4 w-full mx-auto">
                <button className="flex items-center justify-center gap-2 mx-auto text-[#777E90] text-[12px] hover:text-gray-900 text-sm transition-colors duration-200">
                  <Flag size={14} />
                  <span className="underline">{t('Report this property')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSection;