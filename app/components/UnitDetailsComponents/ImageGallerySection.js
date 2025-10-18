'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function PinterestGallery({ images, title, openLightbox }) {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef(null);

  /* ----------  responsive detection  ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ----------  touch / mouse drag  ---------- */
  const [down, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setDown(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onMouseUp = () => setDown(false);
  const onMouseMove = (e) => {
    if (!down) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // sensitivity
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  /* ----------  snap-to-slide after drag  ---------- */
  useEffect(() => {
    if (!trackRef.current) return;
    const node = trackRef.current;
    const onScrollEnd = () => {
      const slideWidth = node.scrollWidth / images.length;
      const newIndex = Math.round(node.scrollLeft / slideWidth);
      setIdx(Math.max(0, Math.min(newIndex, images.length - 1)));
    };
    node.addEventListener('scrollend', onScrollEnd);
    return () => node.removeEventListener('scrollend', onScrollEnd);
  }, [images.length]);

  /* ----------  MOBILE UI  ---------- */
  if (isMobile)
    return (
      <div className="relative w-full overflow-hidden select-none">
        {/* track */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {images.map((src, i) => {
            const ext = src?.startsWith('http');
            return (
              <div
                key={i}
                className="w-full flex-shrink-0 snap-center px-2"
                onClick={() => openLightbox(i)}
              >
                {ext ? (
                  <img
                    src={src}
                    alt={`${title} – ${i + 1}`}
                    className="w-full h-80 object-cover rounded-lg"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`${title} – ${i + 1}`}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover rounded-lg"
                    loading="lazy"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIdx(i);
                trackRef.current.scrollTo({ left: i * trackRef.current.clientWidth, behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition ${i === idx ? 'bg-black' : 'bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    );

/* ----------  PINTEREST-STYLE MASONRY LAYOUT (INDUSTRY STANDARD)  ---------- */

// Stable random height generator - same image always gets same height
const getImageHeight = (index, totalImages) => {
  // Simple hash function for consistent randomization
  const hash = (index * 2654435761) % totalImages;
  
  const heightMap = {
    0: 'h-[320px]',
    1: 'h-[380px]',
    2: 'h-[420px]',
    3: 'h-[350px]',
    4: 'h-[400px]',
    5: 'h-[340px]',
    6: 'h-[390px]',
    7: 'h-[360px]',
  };
  
  return heightMap[hash % 8];
};

return (
  <div className="w-full">
    {/* Hero Image - First Image Full Width */}
    {images.length > 0 && (
      <div
        onClick={() => openLightbox(0)}
        className="relative w-full mb-4 sm:mb-6 overflow-hidden rounded-xl cursor-pointer group"
        aria-label={`View ${title} image 1`}
      >
        <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] overflow-hidden rounded-xl bg-gray-100">
          {images[0]?.startsWith('http') ? (
            <img
              src={images[0]}
              alt={`${title} – Gallery hero image`}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out "
            />
          ) : (
            <Image
              src={images[0]}
              alt={`${title} – Gallery hero image`}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-500 ease-out "
            />
          )}
          
          
        </div>
      </div>
    )}

    {/* Masonry Grid - Remaining Images */}
    {images.length > 1 && (
      <div 
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5"
        style={{ columnFill: 'balance' }}
      >
        {images.slice(1).map((src, idx) => {
          const actualIndex = idx + 1;
          const isExternal = src?.startsWith('http');
          
          // Randomized but consistent height
          const heightClass = getImageHeight(actualIndex, images.length);

          return (
            <div
              key={`gallery-image-${actualIndex}`}
              onClick={() => openLightbox(actualIndex)}
              className="relative break-inside-avoid mb-4 sm:mb-5 overflow-hidden rounded-xl cursor-pointer group"
              aria-label={`View ${title} image ${actualIndex + 1}`}
            >
              <div className={`relative w-full ${heightClass} overflow-hidden rounded-xl bg-gray-100`}>
                {isExternal ? (
                  <img
                    src={src}
                    alt={`${title} – Image ${actualIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out "
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`${title} – Image ${actualIndex + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 ease-out "
                  />
                )}
                
       
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

}