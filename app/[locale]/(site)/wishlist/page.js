"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ChevronRight, Loader, Star, Heart } from "lucide-react";
import Image from "next/image";
import justForYou from "../../public/images/justforyou.png";
import Link from "next/link";
import { RiArrowDropLeftLine } from "react-icons/ri";
import axios from "../../lib/axios";
import { useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import Loading from "../loading";

const Wishlist = () => {
  const { t, i18n } = useTranslation("home");
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const placeholderImage = justForYou;
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 12;

  const fetchWishlist = async (offset = 0, append = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const response = await axios.get('/wishlist', {
        params: {
          perPage: perPage,
          offset: offset
        },
        headers: {
          'Accept-Language': i18n.language || 'en'
        }
      });
      console.log(response.data,'response.data');
      if (response.data) {
        const wishlistData = response.data.records || [];
        const totalRecords = response.data.totalRecords || 0;
        
        if (append) {
          setData(prev => [...prev, ...wishlistData]);
          setCurrentOffset(prev => prev + perPage);
        } else {
          setData(wishlistData);
          setCurrentOffset(perPage);
        }
        
        setTotalCount(totalRecords);
        setHasMore(totalRecords > perPage && (offset + perPage) < totalRecords);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      if (!append) {
        setData([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchWishlist(currentOffset, true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, i18n.language]);

  const removeFromWishlist = async (listingId) => {
    try {
      const formData = new FormData();
      formData.append('listing_id', listingId.toString());

      const response = await axios.post('/wishlist/delete', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        setData(prev => prev.filter(item => item.listing_id !== listingId));
        setTotalCount(prev => prev - 1);
        console.log('Removed from wishlist successfully');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // ✅ Card Component
  const PropertyCard = ({ property }) => {
    const listing = property || {};
    const imageSrc = listing.thumbnail?.thumbnail_url || placeholderImage;
    const hasDiscount = listing.discounted_price && String(listing.discounted_price) !== "0";

    return (
      <Link href={`/unit-details?slug=${listing.unique_id}`}>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm transition-all  duration-300 transform flex-shrink-0 w-full md:w-auto cursor-pointer hover:shadow-lg">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={imageSrc}
              alt={listing.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <div className={`absolute top-4 ${i18n.language === 'ar' ? 'right-4' : 'left-4'}`}>
            {hasDiscount ? (
              <span className="bg-[#58C27D] text-white text-xs font-bold px-3 py-2 rounded">
                {listing.discount}% {i18n.language === 'ar' ? 'خصم' : 'OFF'}
              </span>
            ) : listing.added_by_super_host ? (
              <span className="bg-[#FCFCFD] text-[#23262F] text-xs font-bold p-2 rounded">
                {t('buttons.Superhost')}
              </span>
            ) : null}
          </div>

          {/* Heart Icon for Remove from Wishlist */}
          <div className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromWishlist(listing.listing_id);
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Rating */}
          <div className={`flex items-center gap-2 mb-3 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm text-gray-900">
              {Number(listing.rating) || 0}
            </span>
            <span className="text-gray-500 text-sm">
              ({listing.reviews ?? 0} {t('buttons.reviews')})
            </span>
          </div>

          {/* Title */}
          <h3 className="text-gray-900 text-[16px] font-medium mb-4 line-clamp-2 leading-relaxed">
            {listing.title}
          </h3>
          <hr className="text-gray-200 py-2" />

          {/* Price */}
          <div className={`flex items-baseline gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {hasDiscount && (
              <span className="text-sm font-bold text-[#B1B5C3] line-through">
                {listing.actual_price} {i18n.language === 'ar' ? 'ريال' : 'SAR'}
              </span>
            )}
            <div className={`flex items-baseline gap-1 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span
                className={`text-sm font-bold ${
                  hasDiscount ? "text-[#58C27D]" : "text-[#141416]"
                }`}
              >
                {hasDiscount ? listing.discounted_price : listing.actual_price}{" "}
                {i18n.language === 'ar' ? 'ريال' : 'SAR'}
              </span>
              <span className="text-[#777E90] text-xs">
                {i18n.language === 'ar' ? '/ ليلة' : '/ night'}
              </span>
            </div>
          </div>
        </div>
        </div>
      </Link>
    );
  };

  if (!isAuthenticated) {
    return (
      <section className="max-w-6xl 2xl:max-w-[1450px] mx-auto px-8 lg:px-6 2xl:px-8 pb-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
            <p className="text-gray-600">You need to be logged in to view your wishlist.</p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section 
      className={`max-w-6xl 2xl:max-w-[1450px] mx-auto px-8 lg:px-6 2xl:px-8 pb-12 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <header className="lg:flex items-center justify-between hidden pt-10 pb-12">
        <Link href="/">
          <div className={`px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px] ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <RiArrowDropLeftLine 
                size={24} 
                className={i18n.language === 'ar' ? 'rotate-180' : ''} 
              />
            </button>
            <span className="font-bold text-sm text-[#23262F] font-dm-sans">
              {t('buttons.go_Home')}
            </span>
          </div>
        </Link>

        <div className={`flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <span>{t('navbar.home')}</span>
          <ChevronRight 
            size={16} 
            className={i18n.language === 'ar' ? 'rotate-180' : ''} 
          />
          <span className='text-[#B1B5C3]'>{t('buttons.Wishlist')}</span>
        </div>
      </header>

        


      {/* Section Heading */}
      <div className="mb-12">
        <div className={`flex items-center gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <RiArrowDropLeftLine 
            size={24}  
            className={`block md:hidden ${i18n.language === 'ar' ? 'rotate-180' : ''}`}
          />
          <h2 className="heading lg:mb-2">{t('buttons.Wishlist')}</h2>
        </div>
        <p className={`text-[#777E90] text-[10px] lg:text-[15px] ${i18n.language === 'ar' ? 'pr-8 md:pr-0' : 'pl-8 md:pl-0'}`}>
          {i18n.language === 'ar' 
            ? `لقد أضفت ${totalCount} إقامة في قائمة رغباتك`
            : `You added ${totalCount} stays in your wishlist`
          }
        </p>
      </div>

      {/* ✅ Grid for all devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((property, idx) => (
          <PropertyCard
            key={property?.listing_id ?? idx}
            property={property}
          />
        ))}
      </div>

      {/* ✅ Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`inline-flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-[90px] text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {isLoadingMore ? (
                <>
                  <Loader className="animate-spin" />
                  <span>{i18n.language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</span>
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
    </section>
  );
};

export default Wishlist;
