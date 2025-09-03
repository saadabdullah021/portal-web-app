'use client'
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share, 
  Download, 
  Heart, 
  MoreHorizontal, 
  X, 
  Star,
  MapPin,
  Crown,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PropertyListing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Dummy images - replace with your API images later
  const images = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
  ];

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">Go home</span>
        </button>
        
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>Riyadh</span>
          <ChevronRight size={16} />
          <span>Al Rawdah</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Title Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              2-Bed Exquisite Villa in Al Rawdah Villa
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <Crown size={12} />
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">4.8</span>
                  <span>(256 reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Crown size={16} />
                <span>Superhost</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>Al Rawdah, Riyadh</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Download size={20} />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart 
                size={20} 
                className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
              />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Images Section */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-2 lg:h-96">
            {/* Main Image */}
            <div className="col-span-2 row-span-2 relative overflow-hidden rounded-l-lg group cursor-pointer">
              <img
                src={images[0]}
                alt="Main villa interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => openGallery(0)}
              />
            </div>
            
            {/* Side Images */}
            <div className="relative overflow-hidden group cursor-pointer">
              <img
                src={images[1]}
                alt="Villa pool"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => openGallery(1)}
              />
            </div>
            
            <div className="relative overflow-hidden rounded-tr-lg group cursor-pointer">
              <img
                src={images[2]}
                alt="Villa bedroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => openGallery(2)}
              />
            </div>
            
            <div className="relative overflow-hidden group cursor-pointer">
              <img
                src={images[3]}
                alt="Villa dining"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => openGallery(3)}
              />
            </div>
            
            <div className="relative overflow-hidden rounded-br-lg group cursor-pointer">
              <img
                src={images[4]}
                alt="Villa amenities"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => openGallery(4)}
              />
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="lg:hidden relative">
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-lg">
              <img
                src={images[currentImageIndex]}
                alt={`Villa image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Show All Photos Button */}
          <button
            onClick={() => openGallery()}
            className="absolute bottom-4 left-4 bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm hidden lg:flex"
          >
            <Camera size={16} />
            <span className="text-sm font-medium">Show all photos</span>
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

          <img
            src={images[currentImageIndex]}
            alt={`Villa image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;