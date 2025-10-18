'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, ChevronRight, Star, Heart, MoreHorizontal, ChevronLeft, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { HiOutlineFlag } from "react-icons/hi2";
import { TiLocationArrowOutline } from "react-icons/ti";
import { RiArrowDropLeftLine } from "react-icons/ri";
import MapLocationPopup from '../ui/MapLocationPopup';
import ShareModal from '../ui/ShareModal';
import ImageGallerySection from './ImageGallerySection';

const fallbackImages = [
  '/images/unit_details_hero.png',
  '/images/unit_details_2nd.png',
  '/images/unit_details_3rd.png',
  '/images/unit_details_4th.jpg',
  '/images/unit_details_hero.png',
  '/images/unit_details_2nd.png',
  '/images/unit_details_3rd.png',
  '/images/unit_details_4th.jpg',
];

const hostImagePlaceholder = '/images/hostImage.png';

const GalleryPage = ({ listingData }) => {
  const { t } = useTranslation('home');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const slug = searchParams.get('slug');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const apiImages = listingData?.data?.listing_images?.map(img => img.url).filter(url => url && url.trim() !== '') || [];
  const images = apiImages.length > 0 ? apiImages : fallbackImages;
  
  const title = listingData?.data?.title || "Property Title";
  const location = listingData?.data?.location || "City, Area";
  const rating = listingData?.data?.rating || "0";
  const reviews = listingData?.data?.reviews || 0;
  const isSuperhost = listingData?.data?.added_by_super_host || false;

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="max-w-6xl 2xl:max-w-[1280px] mx-auto px-4 bg-white ">
      {/* Header */}
      <header className="lg:flex items-center justify-between hidden pt-6 pb-3">
        <Link href="/">
          <div className="px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px] hover:bg-gray-50 transition-colors">
            <RiArrowDropLeftLine size={24} className="text-gray-700" />
            <span className="font-bold text-sm text-[#23262F] font-dm-sans">{t('buttons.go_Home')}</span>
          </div>
        </Link>

        <div className="flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold">
          <span>{location.split(', ')[1] || "City"}</span>
          <ChevronRight size={16} />
          <span className="text-[#B1B5C3]">{location.split(', ')[0] || "Area"}</span>
        </div>
      </header>

      {/* Title Section */}
      <main className="py-6">
        <div className="flex lg:flex-row flex-col gap-5 lg:items-start lg:justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-start justify-start">
              <button onClick={() => router.back()} className="lg:hidden block">
                <RiArrowDropLeftLine size={70} />
              </button>
              <h1 className="text-3xl md:text-5xl lg:leading-16 font-bold text-[#23262F] font-dm-sans mb-4">
                {title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4 lg:gap-1">
                <div className="flex items-center mr-4 gap-2 w-6 h-6 rounded-full">
                  <img src={hostImagePlaceholder} alt="host" className="w-full h-full object-center rounded-full" loading="lazy" />
                </div>
                <div className="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1128 1.28584L13.9159 4.83396L17.9638 5.40522C19.8601 5.67275 20.7269 8.01285 19.2651 9.39572L16.3576 12.1438L17.0419 16.016C17.3923 17.9996 15.287 19.3318 13.6291 18.4871L9.99981 16.6358L6.37157 18.4865C4.71128 19.334 2.60769 17.9973 2.95771 16.016L3.64202 12.1438L0.734896 9.3961C-0.727985 8.01223 0.141887 5.67263 2.03558 5.40525L6.08384 4.83394L7.88786 1.28584C8.75914 -0.428539 11.2417 -0.428688 12.1128 1.28584Z" fill="#FFD166" />
                  </svg>
                  <span className="font-semibold lg:font-medium text-sm text-[#23262F]">{rating}</span>
                  <span className="text-sm text-[#777E90] font-normal pl-1 lg:block hidden">({reviews} {t('buttons.reviews')})</span>
                </div>
              </div>

              {isSuperhost && (
                <div className="flex items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.9928 3.47598L9.99978 3.47236L10.0071 3.47614L13.7183 5.70286L14.9998 6.47496V15.6667C14.9998 16.1609 14.9985 16.4313 14.9826 16.6256L14.9807 16.6476L14.9587 16.6495C14.7644 16.6654 14.494 16.6667 13.9998 16.6667H5.99978C5.50556 16.6667 5.23514 16.6654 5.04083 16.6495L5.01886 16.6476L5.01695 16.6256C5.00107 16.4313 4.99978 16.1609 4.99978 15.6667V6.47498L6.27658 5.70571L9.9928 3.47598ZM5.41785 4.2773L1.23772 6.78538C0.84307 7.02217 0.715099 7.53405 0.95189 7.9287C1.18868 8.32335 1.70056 8.45132 2.09521 8.21453L3.33311 7.4718V15.6667C3.33311 16.6001 3.33311 17.0668 3.51477 17.4233C3.67455 17.7369 3.92952 17.9919 4.24313 18.1517C4.59964 18.3334 5.06636 18.3334 5.99978 18.3334H13.9998C14.9332 18.3334 15.3999 18.3334 15.7564 18.1517C16.07 17.9919 16.325 17.7369 16.4848 17.4233C16.6664 17.0668 16.6664 16.6001 16.6664 15.6667V7.47177L17.9044 8.21453C18.299 8.45132 18.8109 8.32335 19.0477 7.9287C19.2845 7.53405 19.1565 7.02217 18.7619 6.78538L14.5769 4.27441L11.376 2.34585C11.1432 2.20563 10.9646 2.09803 10.8133 2.01712C10.778 1.99736 10.7421 1.97898 10.7058 1.96199C10.5798 1.90052 10.4706 1.85961 10.3584 1.83489C10.1222 1.78282 9.87738 1.78282 9.6411 1.83489C9.52864 1.85967 9.41918 1.90074 9.29281 1.96247C9.25714 1.97919 9.22192 1.99723 9.18722 2.01662C9.03567 2.09758 8.85682 2.20534 8.62361 2.34584L5.41785 4.2773Z" fill="#777E91" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.8333 16.6666V13.3333C10.8333 12.8731 10.4602 12.5 10 12.5C9.53976 12.5 9.16667 12.8731 9.16667 13.3333V16.6666H10.8333ZM10 10.8333C8.61929 10.8333 7.5 11.9526 7.5 13.3333V18.3333H12.5V13.3333C12.5 11.9526 11.3807 10.8333 10 10.8333Z" fill="#777E91" />
                  </svg>
                  <span className="text-sm text-[#777E90] font-normal pl-1">{t('buttons.Superhost')}</span>
                </div>
              )}

              <div className="lg:flex items-center gap-1 hidden">
                <HiOutlineFlag size={20} />
                <span className="text-sm text-[#777E90] font-normal pl-1">{location}</span>
              </div>
            </div>
          </div>

          <hr className="text-gray-300 lg:hidden" />

          {/* Action Buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-8 lg:gap-2 lg:ml-4">
            <button onClick={() => setIsMapOpen(true)} className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
              <TiLocationArrowOutline size={24} color="#777E90" />
            </button>
            <MapLocationPopup isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

            <button onClick={() => setIsModalOpen(true)} className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.99858 10.0399C9.02798 10.5914 8.60474 11.0623 8.05324 11.0917C7.30055 11.1318 6.7044 11.1809 6.23854 11.23C5.61292 11.296 5.23278 11.6803 5.16959 12.2331C5.07886 13.0267 5 14.2278 5 16C5 17.7723 5.07886 18.9733 5.16959 19.7669C5.23289 20.3207 5.61207 20.7039 6.23675 20.7698C7.33078 20.8853 9.13925 21 12 21C14.8608 21 16.6692 20.8853 17.7632 20.7698C18.3879 20.7039 18.7671 20.3207 18.8304 19.7669C18.9211 18.9733 19 17.7723 19 16C19 14.2278 18.9211 13.0267 18.8304 12.2331C18.7672 11.6803 18.3871 11.296 17.7615 11.23C17.2956 11.1809 16.6995 11.1318 15.9468 11.0917C15.3953 11.0623 14.972 10.5914 15.0014 10.0399C15.0308 9.48837 15.5017 9.06512 16.0532 9.09452C16.8361 9.13626 17.4669 9.18787 17.9712 9.24106C19.4556 9.39761 20.6397 10.4507 20.8175 12.0059C20.9188 12.8923 21 14.1715 21 16C21 17.8285 20.9188 19.1077 20.8175 19.9941C20.6398 21.5484 19.4585 22.602 17.9732 22.7588C16.7919 22.8834 14.9108 23 12 23C9.08922 23 7.20806 22.8834 6.02684 22.7588C4.54151 22.602 3.36021 21.5484 3.18253 19.9941C3.0812 19.1077 3 17.8285 3 16C3 14.1715 3.0812 12.8923 3.18253 12.0059C3.36031 10.4507 4.54436 9.39761 6.02877 9.24106C6.53306 9.18787 7.16393 9.13626 7.94676 9.09452C8.49827 9.06512 8.96918 9.48837 8.99858 10.0399Z" fill="#777E91" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 6.20711C8.81658 6.59763 8.18342 6.59763 7.79289 6.20711C7.40237 5.81658 7.40237 5.18342 7.79289 4.79289L11.2929 1.29289C11.6834 0.902369 12.3166 0.902369 12.7071 1.29289L16.2071 4.79289C16.5976 5.18342 16.5976 5.81658 16.2071 6.20711C15.8166 6.59763 15.1834 6.59763 14.7929 6.20711L13 4.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V4.41421L9.20711 6.20711Z" fill="#777E91" />
              </svg>
            </button>
            <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Share This Place" host_share_code={slug} />

            <button onClick={() => setIsLiked(!isLiked)} className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
              <Heart className={`${isLiked ? 'w-5 h-5 fill-red-500 text-red-500' : 'text-[#777E90]'}`} />
            </button>

            <button className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
              <MoreHorizontal size={20} color="#777E90" />
            </button>

            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 lg:flex items-center rounded-full hidden border-2 border-[#E6E8EC] transition-colors">
              <X size={20} color="#777E90" />
            </button>
          </div>
        </div>

 
     {/* ----------  Pinterest Masonry (1×1 copy)  ---------- */}
{/* <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
  {images.map((src, i) => {
    const isExternal = src?.startsWith('http');
    const h = 300 + (i % 3) * 100; // 300 | 400 | 500 cycle

    return (
      <div
        key={i}
        onClick={() => openLightbox(i)}
        className="break-inside-avoid rounded-lg overflow-hidden cursor-pointer group"
      >
        {isExternal ? (
          <img
            src={src}
            alt={`${title} – ${i + 1}`}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <Image
            src={src}
            alt={`${title} – ${i + 1}`}
            width={400}
            height={h}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}
      </div>
    );
  })}
</div> */}
<ImageGallerySection images={images} title={title} openLightbox={openLightbox} />

      </main>

      {/* Lightbox - Airbnb Style */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Header */}
          <div className="absolute top-15 lg:top-12 left-0 right-0 z-10 flex items-center justify-between p-4 ">
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
        
              <span className="text-white font-medium text-sm">{currentImageIndex + 1} / {images.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-2xl transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-2xl transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Image Container */}
          <div className="flex items-center justify-center flex-col gap-2 w-full h-full p-4 md:p-8">
            <div className="relative max-w-7xl max-h-[85vh] flex items-center justify-center">
              {images[currentImageIndex] && (
                <>
                  {(images[currentImageIndex].startsWith('http://') || images[currentImageIndex].startsWith('https://')) ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${title} - Photo ${currentImageIndex + 1}`}
                      className="max-w-full max-h-[85vh] w-[80vw] h-auto object-cover rounded-lg object-center"
                    />
                  ) : (
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${title} - Photo ${currentImageIndex + 1}`}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-[85vh] w-[80vw] h-auto object-cover rounded-lg object-center"
                      priority
                    />
                  )}
                </>
              )}
            </div>
                 <p className="text-white/40 text-sm pt-4">
                Living Room
              </p>
        
          </div>

    

          {/* Thumbnail Strip (Bottom) */}
          {/* <div className="absolute bottom-20 left-0 right-0 overflow-x-auto py-4 px-4 scrollbar-hide">
            <div className="flex gap-2 justify-center min-w-max mx-auto">
              {images.map((src, idx) => {
                const isExternal = src?.startsWith('http://') || src?.startsWith('https://');
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      idx === currentImageIndex 
                        ? 'ring-2 ring-white scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {isExternal ? (
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <Image
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div> */}
        </div>
      )}


    </div>
  );
};

export default GalleryPage;