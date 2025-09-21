"use client";
import React, { useState } from "react";
import { ChevronRight, Loader, Star } from "lucide-react";
import Image from "next/image";
import justForYou from "../../public/images/justforyou.png";
import Link from "next/link";
import { RiArrowDropLeftLine } from "react-icons/ri";

const Wishlist = () => {
  // ✅ Dummy Data
  const placeholderImage = justForYou;
  const [isLoading, setIsLoading] = useState(false);
  const propertiesData = Array.from({ length: 36 }, (_, i) => ({
    listing: {
      listing_id: i + 1,
      thumbnails: [{ thumbnail_url: placeholderImage.src }],
      added_by_super_host: i % 2,
      rating: (Math.random() * (5 - 4) + 4).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      actual_price: "2,500",
      discounted_price: i % 2 === 0 ? "1,800" : "0",
      discount: i % 2 === 0 ? "25" : null,
    },
  }));

  const [data] = useState(propertiesData);
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // ✅ Card Component
  const PropertyCard = ({ property }) => {
    const listing = property?.listing || {};
    const imageSrc =
      listing.thumbnails?.[0]?.thumbnail_url || placeholderImage;
    const hasDiscount =
      listing.discounted_price && String(listing.discounted_price) !== "0";

    return (
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

          <div className="absolute top-4 left-4">
            {hasDiscount ? (
              <span className="bg-[#58C27D] text-white text-xs font-bold px-3 py-2 rounded">
                {listing.discount}% OFF
              </span>
            ) : listing.added_by_super_host ? (
              <span className="bg-[#FCFCFD] text-[#23262F] text-xs font-bold p-2 rounded">
                SUPERHOST
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm text-gray-900">
              {Number(listing.rating) || 0}
            </span>
            <span className="text-gray-500 text-sm">
              ({listing.reviews ?? 0} reviews)
            </span>
          </div>

          {/* Title */}
          <h3 className="text-gray-900 text-[16px] font-medium mb-4 line-clamp-2 leading-relaxed">
            {listing.title}
          </h3>
          <hr className="text-gray-200 py-2" />

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-sm font-bold text-[#B1B5C3] line-through">
                {listing.actual_price} SAR
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span
                className={`text-sm font-bold ${
                  hasDiscount ? "text-[#58C27D]" : "text-[#141416]"
                }`}
              >
                {hasDiscount ? listing.discounted_price : listing.actual_price}{" "}
                SAR
              </span>
              <span className="text-[#777E90] text-xs">/ night</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-6xl 2xl:max-w-[1450px] mx-auto  px-8 lg:px-6 2xl:px-8  pb-12">


<header className="lg:flex items-center justify-between hidden pt-10 pb-12 ">
                    <Link href="/">
                        <div className='px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px]'>
                            <button className="text-gray-700 hover:text-gray-900 transition-colors">
                                <RiArrowDropLeftLine size={24} />
                            </button>
                            <span className="font-bold text-sm text-[#23262F] font-dm-sans">Go home</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold">
                        <span>Home</span>
                        <ChevronRight size={16} />
                        <span className='text-[#B1B5C3]'> Wishlists</span>
                    </div>
                </header>

        


      {/* Section Heading */}
      <div className="mb-12">
        <div className="flex items-center gap-2">
        <RiArrowDropLeftLine size={24}  className="block md:hidden"/>
        <h2 className="heading lg:mb-2 ">Wishlist</h2>
        </div>
        <p className="text-[#777E90] text-[10px] lg:text-[15px] pl-8 md:pl-0">
        You added 8 stays in your wishlist
        </p>
      </div>

      {/* ✅ Grid for all devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.slice(0, visibleCount).map((property, idx) => (
          <PropertyCard
            key={property?.listing?.listing_id ?? idx}
            property={property}
          />
        ))}
      </div>

      {/* ✅ Load More Button */}
      {visibleCount < data.length && (
        <div className="flex justify-center mt-8">
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
Load More
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
