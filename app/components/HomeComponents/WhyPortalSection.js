'use client'
import React, { useState, useRef, useEffect } from 'react';
import {  Play, Pause, MoveLeft, MoveRight } from 'lucide-react';

import AuthorCard from '../ui/AuthorCard';
const WhyPortalSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const videos = [
    {
      id: 1,
      src: "https://www.w3schools.com/html/mov_bbb.mp4", // dummy video
      thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=600&fit=crop",
      title: "Pov: صنعت وسایل پودها مصری",
      author: "Al Fares Dhafer",
      rating: "5.0"
    },
    {
      id: 2,
      src: "https://www.w3schools.com/html/movie.mp4", // dummy video
      thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=600&fit=crop",
      title: "Amazing Travel Experience",
      author: "Mohamed Ahmed", 
      rating: "5.0"
    },
    {
      id: 3,
      src: "https://www.w3schools.com/html/mov_bbb.mp4", // dummy video again
      thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=600&fit=crop",
      title: "Luxury Desert Safari",
      author: "Sarah Al Rajhi",
      rating: "5.0"
    }
  ];

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Auto pause when video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentVideo]);

  return (
    <section className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#23262F]  font-dm-sans mb-4">
            Why Portal?
          </h2>
          <p className="text-lg text-[#777E90] max-w-full lg:max-w-lg lg:text-2xl mx-auto">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis leo sit amet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Features */}
            <div className="flex items-start flex-col space-y-4">
              <span className="flex-shrink-0 inline-flex items-center justify-center px-3 py-[2px] bg-[#8BC5E5] text-[#FCFCFD] text-sm font-medium rounded-full">01</span>
              <div>
                <h3 className="text-[24px] font-semibold text-[#23262F] mb-2">Tailored for Flexible Living</h3>
                <p className="text-[#777E90] text-sm font-normal max-w-sm font-poppins mx-auto">Portal helps you unearth incredible trips that <br/> adapt to your schedule and preferences, making spontaneity a breeze.</p>
              </div>
            </div>

         <div className="flex items-start flex-col space-y-4">
              <span className="flex-shrink-0 inline-flex items-center justify-center px-3 py-[2px] bg-[#92A5EF] text-[#FCFCFD] text-sm font-medium rounded-full">02</span>
              <div>
                <h3 className="text-[24px] font-semibold text-[#23262F] mb-2">Assured Travel Experiences</h3>
                <p className="text-[#777E90] text-sm font-normal max-w-sm font-poppins mx-auto">With genuine reviews and secure bookings, we <br/> empower you to explore with peace of mind, every time.</p>
              </div>
            </div>

                 <div className="flex items-start flex-col space-y-4">
              <span className="flex-shrink-0 inline-flex items-center justify-center px-3 py-[2px] bg-[#58C27D] text-[#FCFCFD] text-sm font-medium rounded-full">03</span>
              <div>
                <h3 className="text-[24px] font-semibold text-[#23262F] mb-2">Always Transparent</h3>
                <p className="text-[#777E90] text-sm font-normal max-w-sm font-poppins mx-auto">We lay out every detail upfront, so you know <br/> exactly what you are getting and can focus purely on enjoying your adventure.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="bg-[#3B71FE] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-[90px] transition-colors duration-200 transform text-[16px]">
                Start your search
              </button>
            </div>
          </div>

          {/* Right Video Player */}
          <div className="relative flex justify-center">
            <div className="relative w-full  lg:w-[450px] h-[600px] bg-black rounded-3xl  shadow-2xl">
              <video
                ref={videoRef}
                src={videos[currentVideo].src}
                poster={videos[currentVideo].thumbnail}
                className="w-full h-full object-cover rounded-3xl"
                controls={false}
              />

              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className=" transition-all duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-[#E6E8EC]" />
                  ) : (
                    <Play className="w-8 h-8 text-[#E6E8EC]" />
                  )}
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={prevVideo}
                    className="border-[2px] border-[#E6E8EC] rounded-[40px] p-3"
                  >
               <MoveLeft className="w-5 h-5 text-[#E6E8EC]" />
                  </button>
                  <button
                    onClick={nextVideo}
                    className="border-[2px] border-[#E6E8EC] rounded-full p-3"
                  >
                       <MoveRight className="w-5 h-5 text-[#E6E8EC]" />
                  </button>
                </div>
              </div>

              {/* Video Title */}
              <div className="absolute top-20 left-0 right-0 text-center text-white px-2">
                <h4 className="font-bold text-lg">{videos[currentVideo].title}</h4>
                {/* <p className="text-sm opacity-80 mt-1">By {videos[currentVideo].author} ★ {videos[currentVideo].rating}</p> */}
              </div>
              
    {/* Floating Author Cards */}
<div className="absolute inset-0 pointer-events-none hidden lg:block">
  <AuthorCard
    name="Al Fares Dhafer"
    rating="5.0"
    position="top-54 -left-12"
  />
  <AuthorCard
    name="Muhammad Ahmed"
    rating="5.0"
    position="top-76 -right-24"
  />
  <AuthorCard
    name="Sarah Al Rajhi"
    rating="5.0"
    position="bottom-28 -left-20"
  />
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPortalSection;
