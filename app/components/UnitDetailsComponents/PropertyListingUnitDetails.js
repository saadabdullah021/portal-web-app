'use client'
import React, { useState, useRef, useEffect } from 'react';
import {
  MoreHorizontal,
  X,
  Star,
  Crown,
  Camera,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TiLocationArrowOutline } from "react-icons/ti";

import { RiArrowDropLeftLine } from "react-icons/ri";
import { HiOutlineFlag } from "react-icons/hi2";
import hostImage from "../../../public/images/hostImage.png"
import heroImage from "../../../public/images/unit_details_hero.png"
import heroImage2 from "../../../public/images/unit_details_2nd.png"
import heroImage3 from "../../../public/images/unit_details_3rd.png"
import heroImage4 from "../../../public/images/unit_details_4th.jpg"
import Image from 'next/image';
import ShareModal from '../ui/ShareModal';
import Shimmer from '../ui/Shimmer';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
const PropertyListingUnitDetails = ({ listingData, slug }) => {
  const { t } = useTranslation("home");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const sliderRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiImages = listingData?.data?.listing_images?.map(img => img.url).filter(url => url && url.trim() !== '') || [];
  const fallbackImages = [heroImage, heroImage2, heroImage3, heroImage4];
  const images = apiImages.length > 0 ? apiImages : fallbackImages;
  

  const isExternalImage = (src) => {
    return src && (src.startsWith('http://') || src.startsWith('https://'));
  };

  const handleImageLoad = (imageIndex) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageIndex]: false
    }));
  };

  const handleImageStart = (imageIndex) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageIndex]: true
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  // Mobile swipe functionality
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchEnd = (e) => {
      if (!isDragging) return;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }

      isDragging = false;
    };

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className=" max-w-6xl 2xl:max-w-[1280px] mx-auto px-4 bg-white">
      {/* Header */}
      <header className="lg:flex items-center justify-between  hidden  pt-6 pb-3">
        <Link href="/">
          <div className='px-4 py-2 flex items-center gap-1  border-2 border-[#E6E8EC] rounded-[90px]'>

            <button className=" text-gray-700 hover:text-gray-900 transition-colors">
              <RiArrowDropLeftLine size={24} />
            </button>
            <span className="font-bold text-sm text-[#23262F] font-dm-sans">{t('buttons.go_Home')}</span>
          </div>
        </Link>

        <div className="flex items-center gap-1  text-sm text-[#777E90] font-dm-sans font-bold">
          <span>{listingData?.data?.location?.split(', ')[1] || "City"}</span>
          <ChevronRight size={16} />
          <span className='text-[#B1B5C3]'>{listingData?.data?.location?.split(', ')[0] || "Area"}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className=" py-6">
        {/* Title Section */}
        <div className="flex  lg:flex-row flex-col gap-5 lg:items-start lg:justify-between  mb-6">
          <div className="flex-1 ">
            <div className='flex items-start justify-start '>

              <RiArrowDropLeftLine size={70} className='lg:hidden block' />
              <h1 className="text-3xl md:text-5xl lg:leading-16 font-bold text-[#23262F] font-dm-sans mb-4">
                {listingData?.data?.title || "Property Title"}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4 lg:gap-1">
                <div className="flex items-center mr-4 gap-2 w-6 h-6 rounded-full">
                  <Image
                    src={hostImage}
                    alt='host Image'
                    className="fill w-full h-full object-center rounded-full transition-transform duration-500"

                    loading="lazy"

                  />
                </div>
                <div className="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1128 1.28584L13.9159 4.83396L17.9638 5.40522C19.8601 5.67275 20.7269 8.01285 19.2651 9.39572L16.3576 12.1438L17.0419 16.016C17.3923 17.9996 15.287 19.3318 13.6291 18.4871L9.99981 16.6358L6.37157 18.4865C4.71128 19.334 2.60769 17.9973 2.95771 16.016L3.64202 12.1438L0.734896 9.3961C-0.727985 8.01223 0.141887 5.67263 2.03558 5.40525L6.08384 4.83394L7.88786 1.28584C8.75914 -0.428539 11.2417 -0.428688 12.1128 1.28584Z" fill="#FFD166" />
                  </svg>

                  <span className="font-semibold lg:font-medium text-sm text-[#23262F]">{listingData?.data?.rating || "0"}</span>
                  <span className='text-sm text-[#777E90] font-normal pl-1 lg:block hidden'>({listingData?.data?.reviews || 0} {t('buttons.reviews')})</span>
                </div>
              </div>

              {listingData?.data?.added_by_super_host && (
                <div className="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.9928 3.47598L9.99978 3.47236L10.0071 3.47614L13.7183 5.70286L14.9998 6.47496V15.6667C14.9998 16.1609 14.9985 16.4313 14.9826 16.6256L14.9807 16.6476L14.9587 16.6495C14.7644 16.6654 14.494 16.6667 13.9998 16.6667H5.99978C5.50556 16.6667 5.23514 16.6654 5.04083 16.6495L5.01886 16.6476L5.01695 16.6256C5.00107 16.4313 4.99978 16.1609 4.99978 15.6667V6.47498L6.27658 5.70571L9.9928 3.47598ZM5.41785 4.2773L1.23772 6.78538C0.84307 7.02217 0.715099 7.53405 0.95189 7.9287C1.18868 8.32335 1.70056 8.45132 2.09521 8.21453L3.33311 7.4718V15.6667C3.33311 16.6001 3.33311 17.0668 3.51477 17.4233C3.67455 17.7369 3.92952 17.9919 4.24313 18.1517C4.59964 18.3334 5.06636 18.3334 5.99978 18.3334H13.9998C14.9332 18.3334 15.3999 18.3334 15.7564 18.1517C16.07 17.9919 16.325 17.7369 16.4848 17.4233C16.6664 17.0668 16.6664 16.6001 16.6664 15.6667V7.47177L17.9044 8.21453C18.299 8.45132 18.8109 8.32335 19.0477 7.9287C19.2845 7.53405 19.1565 7.02217 18.7619 6.78538L14.5769 4.27441L11.376 2.34585C11.1432 2.20563 10.9646 2.09803 10.8133 2.01712C10.778 1.99736 10.7421 1.97898 10.7058 1.96199C10.5798 1.90052 10.4706 1.85961 10.3584 1.83489C10.1222 1.78282 9.87738 1.78282 9.6411 1.83489C9.52864 1.85967 9.41918 1.90074 9.29281 1.96247C9.25714 1.97919 9.22192 1.99723 9.18722 2.01662C9.03567 2.09758 8.85682 2.20534 8.62361 2.34584L5.41785 4.2773Z" fill="#777E91" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.8333 16.6666V13.3333C10.8333 12.8731 10.4602 12.5 10 12.5C9.53976 12.5 9.16667 12.8731 9.16667 13.3333V16.6666H10.8333ZM10 10.8333C8.61929 10.8333 7.5 11.9526 7.5 13.3333V18.3333H12.5V13.3333C12.5 11.9526 11.3807 10.8333 10 10.8333Z" fill="#777E91" />
                  </svg>
                  <span className='text-sm text-[#777E90] font-normal pl-1'>{t('buttons.Superhost')}</span>
                </div>
              )}

              <div className="lg:flex items-center gap-1 hidden ">
                <HiOutlineFlag size={20} />
                <span className='text-sm text-[#777E90] font-normal pl-1'>{listingData?.data?.location || "Location"}</span>
              </div>
            </div>
          </div>
          <hr className='text-gray-300' />
          {/* Action Buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-8 lg:gap-2 lg:ml-4">
            <button className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
              <TiLocationArrowOutline size={24} color='#777E90' />

            </button>

            {/* ✅ Share button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.99858 10.0399C9.02798 10.5914 8.60474 11.0623 8.05324 11.0917C7.30055 11.1318 6.7044 11.1809 6.23854 11.23C5.61292 11.296 5.23278 11.6803 5.16959 12.2331C5.07886 13.0267 5 14.2278 5 16C5 17.7723 5.07886 18.9733 5.16959 19.7669C5.23289 20.3207 5.61207 20.7039 6.23675 20.7698C7.33078 20.8853 9.13925 21 12 21C14.8608 21 16.6692 20.8853 17.7632 20.7698C18.3879 20.7039 18.7671 20.3207 18.8304 19.7669C18.9211 18.9733 19 17.7723 19 16C19 14.2278 18.9211 13.0267 18.8304 12.2331C18.7672 11.6803 18.3871 11.296 17.7615 11.23C17.2956 11.1809 16.6995 11.1318 15.9468 11.0917C15.3953 11.0623 14.972 10.5914 15.0014 10.0399C15.0308 9.48837 15.5017 9.06512 16.0532 9.09452C16.8361 9.13626 17.4669 9.18787 17.9712 9.24106C19.4556 9.39761 20.6397 10.4507 20.8175 12.0059C20.9188 12.8923 21 14.1715 21 16C21 17.8285 20.9188 19.1077 20.8175 19.9941C20.6398 21.5484 19.4585 22.602 17.9732 22.7588C16.7919 22.8834 14.9108 23 12 23C9.08922 23 7.20806 22.8834 6.02684 22.7588C4.54151 22.602 3.36021 21.5484 3.18253 19.9941C3.0812 19.1077 3 17.8285 3 16C3 14.1715 3.0812 12.8923 3.18253 12.0059C3.36031 10.4507 4.54436 9.39761 6.02877 9.24106C6.53306 9.18787 7.16393 9.13626 7.94676 9.09452C8.49827 9.06512 8.96918 9.48837 8.99858 10.0399Z" fill="#777E91" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 6.20711C8.81658 6.59763 8.18342 6.59763 7.79289 6.20711C7.40237 5.81658 7.40237 5.18342 7.79289 4.79289L11.2929 1.29289C11.6834 0.902369 12.3166 0.902369 12.7071 1.29289L16.2071 4.79289C16.5976 5.18342 16.5976 5.81658 16.2071 6.20711C15.8166 6.59763 15.1834 6.59763 14.7929 6.20711L13 4.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V4.41421L9.20711 6.20711Z" fill="#777E91" />
              </svg>

            </button>

            {/* ✅ Share Modal */}
            <ShareModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              slug={true}
              host_share_code={slug}
            />

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors"
            >
              <svg className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.6924 6.91706C12.3055 7.28838 11.6945 7.28838 11.3076 6.91706L10.6152 6.2526C9.80477 5.47487 8.70994 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 11.8826 4.28979 13.8501 6.15176 15.4666C8.01532 17.0844 10.2434 18.1574 11.5746 18.7051C11.853 18.8196 12.147 18.8196 12.4254 18.7051C13.7566 18.1574 15.9847 17.0844 17.8482 15.4666C19.7102 13.85 21 11.8826 21 9.5C21 7.01472 18.9853 5 16.5 5C15.2901 5 14.1952 5.47487 13.3848 6.2526L12.6924 6.91706ZM12 4.80957C10.8321 3.6888 9.24649 3 7.5 3C3.91015 3 1 5.91015 1 9.5C1 15.8683 7.97034 19.385 10.8138 20.5547C11.5796 20.8697 12.4204 20.8697 13.1862 20.5547C16.0297 19.385 23 15.8682 23 9.5C23 5.91015 20.0899 3 16.5 3C14.7535 3 13.1679 3.6888 12 4.80957Z" fill="#777E91" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
              <MoreHorizontal size={20} color='#777E90' />
            </button>
            <button className="p-2 hover:bg-gray-100 lg:flex items-center rounded-full hidden  border-2 border-[#E6E8EC] transition-colors ">
              <X size={20} color='#777E90' />
            </button>
          </div>
        </div>

        {/* Images Section */}
        <div className="relative">
          {/* Desktop Layout - Dynamic based on number of images */}
          <div className="hidden lg:flex lg:gap-2 lg:h-96">
            {images.length === 1 ? (
              /* Single Image - Full Width */
              <div className="w-full h-[400px] relative overflow-hidden rounded-xl group cursor-pointer">
                {images[0] && (
                  <>
                    {imageLoadingStates[0] && <Shimmer type="imageCard" />}
                    {isExternalImage(images[0]) ? (
                      <img
                        src={images[0]}
                        alt={listingData?.data?.title || "Property image"}
                        className={`w-full h-full object-cover transition-transform duration-300 ${imageLoadingStates[0] ? 'hidden' : ''}`}
                        onClick={() => openGallery(0)}
                        loading='lazy'
                        onLoad={() => handleImageLoad(0)}
                        onLoadStart={() => handleImageStart(0)}
                        onError={(e) => {
                          console.error('Main image failed to load:', images[0]);
                          e.target.style.display = 'none';
                          handleImageLoad(0);
                        }}
                      />
                    ) : (
                      <Image
                        src={images[0]}
                        alt={listingData?.data?.title || "Property image"}
                        width={1200}
                        height={400}
                        className={`w-full h-full object-cover transition-transform duration-300 ${imageLoadingStates[0] ? 'hidden' : ''}`}
                        onClick={() => openGallery(0)}
                        loading='lazy'
                        onLoad={() => handleImageLoad(0)}
                        onLoadStart={() => handleImageStart(0)}
                        onError={(e) => {
                          console.error('Main image failed to load:', images[0]);
                          e.target.style.display = 'none';
                          handleImageLoad(0);
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            ) : (
              /* 2+ Images - Big Image + Cards Layout */
              <>
                {/* Left Side - Big Image */}
            <div className="flex-1 lg:w-[850px] lg:h-[780px] w-[300px] h-[470px] relative overflow-hidden rounded-xl group cursor-pointer">
              {images[0] && (
                <>
                  {imageLoadingStates[0] && <Shimmer type="imageCard" />}
                  {isExternalImage(images[0]) ? (
                    <img
                      src={images[0]}
                      alt={listingData?.data?.title || "Property image"}
                      className={`w-full h-full object-cover transition-transform duration-300 ${imageLoadingStates[0] ? 'hidden' : ''}`}
                      onClick={() => openGallery(0)}
                      loading='lazy'
                      onLoad={() => handleImageLoad(0)}
                      onLoadStart={() => handleImageStart(0)}
                      onError={(e) => {
                        console.error('Main image failed to load:', images[0]);
                        e.target.style.display = 'none';
                        handleImageLoad(0);
                      }}
                    />
                  ) : (
                    <Image
                      src={images[0]}
                      alt={listingData?.data?.title || "Property image"}
                      width={850}
                      height={780}
                      className={`w-full h-full object-cover transition-transform duration-300 ${imageLoadingStates[0] ? 'hidden' : ''}`}
                      onClick={() => openGallery(0)}
                      loading='lazy'
                      onLoad={() => handleImageLoad(0)}
                      onLoadStart={() => handleImageStart(0)}
                      onError={(e) => {
                        console.error('Main image failed to load:', images[0]);
                        e.target.style.display = 'none';
                        handleImageLoad(0);
                      }}
                    />
                  )}
                </>
              )}
            </div>

            <div className=" flex h-[780px] flex-col gap-2">
              {Array.from({ length: 3 }, (_, index) => {
                const imageIndex = index + 1;
                const image = images[imageIndex];
                return (
                  <div key={imageIndex} className="flex-1 w-64 relative overflow-hidden rounded-xl group cursor-pointer">
                    {image ? (
                      <>
                        {imageLoadingStates[imageIndex] && <Shimmer type="imageCard" />}
                        {isExternalImage(image) ? (
                          <img
                            src={image}
                            alt={`${listingData?.data?.title || "Property"} - Image ${imageIndex + 1}`}
                            className={`w-full h-full object-cover transition-transform duration-300 ${imageLoadingStates[imageIndex] ? 'hidden' : ''}`}
                            onClick={() => openGallery(imageIndex)}
                            loading='lazy'
                            onLoad={() => handleImageLoad(imageIndex)}
                            onLoadStart={() => handleImageStart(imageIndex)}
                            onError={(e) => {
                              console.error('Image failed to load:', image);
                              e.target.style.display = 'none';
                              handleImageLoad(imageIndex);
                            }}
                          />
                        ) : (
                          <Image
                            src={image}
                            alt={`${listingData?.data?.title || "Property"} - Image ${imageIndex + 1}`}
                            width={256}
                            height={390}
                            className={`w-full h-full object-cover transition-transform duration-300 ${imageLoadingStates[imageIndex] ? 'hidden' : ''}`}
                            onClick={() => openGallery(imageIndex)}
                            loading='lazy'
                            onLoad={() => handleImageLoad(imageIndex)}
                            onLoadStart={() => handleImageStart(imageIndex)}
                            onError={(e) => {
                              console.error('Image failed to load:', image);
                              e.target.style.display = 'none';
                              handleImageLoad(imageIndex);
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
            </>
            )}
          </div>

          {/* Mobile Slider - No arrows, only swipe */}
          <div className="lg:hidden relative" ref={sliderRef}>
            <div className="relative h-[476px] sm:h-[490px] overflow-hidden rounded-2xl">
              {images[currentImageIndex] && (
                <>
                  {imageLoadingStates[currentImageIndex] && <Shimmer type="imageCard" />}
                  {isExternalImage(images[currentImageIndex]) ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${listingData?.data?.title || "Property"} - Image ${currentImageIndex + 1}`}
                      className={`w-full h-full object-cover ${imageLoadingStates[currentImageIndex] ? 'hidden' : ''}`}
                      loading='lazy'
                      onLoad={() => handleImageLoad(currentImageIndex)}
                      onLoadStart={() => handleImageStart(currentImageIndex)}
                      onError={(e) => {
                        console.error('Mobile image failed to load:', images[currentImageIndex]);
                        e.target.style.display = 'none';
                        handleImageLoad(currentImageIndex);
                      }}
                    />
                  ) : (
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${listingData?.data?.title || "Property"} - Image ${currentImageIndex + 1}`}
                      width={400}
                      height={490}
                      className={`w-full h-full object-cover ${imageLoadingStates[currentImageIndex] ? 'hidden' : ''}`}
                      loading='lazy'
                      onLoad={() => handleImageLoad(currentImageIndex)}
                      onLoadStart={() => handleImageStart(currentImageIndex)}
                      onError={(e) => {
                        console.error('Mobile image failed to load:', images[currentImageIndex]);
                        e.target.style.display = 'none';
                        handleImageLoad(currentImageIndex);
                      }}
                    />
                  )}
                </>
              )}

              {/* Image Counter */}
              {/* <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div> */}
            </div>

            {/* Dots Indicator */}
            {/* <div className="flex justify-center mt-4 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div> */}
          </div>

          {/* Show All Photos Button */}
          <button
            onClick={() => openGallery()}
            className="absolute -bottom-90 left-4 bg-white border border-gray-300 px-4 py-2 rounded-full items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm hidden lg:flex"
          >
            <Camera size={16} />
            <span className="text-sm font-bold text-[#23262F] font-dm-sans">{t('buttons.show_all_photos')} </span>
          </button>
        </div>
      </main>

      {/* Full Screen Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          {images[currentImageIndex] && (
            <img
              src={images[currentImageIndex]}
              alt={`${listingData?.data?.title || "Property"} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                console.error('Gallery image failed to load:', images[currentImageIndex]);
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}


    </div>
  );
};

export default PropertyListingUnitDetails;