"use client";
import React from "react";
import { DollarSign, Calendar, Check } from "lucide-react";
import shapeBg from "../../public/images/shape bg.png";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <section className="relative w-full py-20 bg-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-[#23262F]">
          How it works
        </h2>
        <p className="mt-2 text-gray-500 text-lg">Keep calm & travel on</p>
      </div>

      {/* Steps + CSS dotted connector */}
      <div className="relative flex flex-col lg:flex-row lg:items-start md:items-center justify-center gap-12 md:gap-24">

<div className="hidden lg:block wave-line">
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none">
    <path d="M 50 150 Q 250 50, 500 150 T 950 150" />
  </svg>
</div>


        {/* Step 1 */}
        <div className="relative flex flex-col items-center group z-10">

          <section className="relative flex justify-center items-center w-full h-full py-32 bg-white">
            <div className="absolute w-[200px] h-[280px]">
              <Image
                src={shapeBg}
                alt="Background Shape"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Main tilted card */}
            <div className="relative w-[130px] h-[160px] flex justify-center items-center bg-[#3f3f42]/5 rounded-3xl shadow-3xl rotate-[-15deg] -mt-12">
              <div className="z-30 relative w-[130px] h-[160px] flex justify-center items-center bg-[#FCFCFD] rounded-3xl shadow -mt-4">
                <div className="w-16 h-16 rounded-[48px] bg-[#58C27D] flex items-center justify-center rotate-15">
                  <Calendar className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="absolute top-6 left-45 w-2 h-2 rounded-[2px] bg-[#FFD166] rotate-[-20deg]"></div>
              <div className="absolute bottom-6 right-50 w-3 h-3 rounded-[2px] bg-[#CDB4DB] rotate-[-20deg]"></div>
            </div>
          </section>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-gray-900">Browse</h3>
          <p className="mt-2 text-sm text-gray-500 font-normal text-center max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            iaculis leo sit amet
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col items-center group z-10">
          {/* Dot on the line */}

          <section className="relative flex justify-center items-center w-full h-full py-32 bg-white">
            <div className="absolute w-[200px] h-[280px]">
              <Image
                src={shapeBg}
                alt="Background Shape"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Main tilted card */}
            <div className="relative w-[130px] h-[160px] flex justify-center items-center bg-[#3f3f42]/5 rounded-3xl shadow-3xl rotate-[-15deg] -mt-12">
              <div className="z-30 relative w-[130px] h-[160px] flex justify-center items-center bg-[#FCFCFD] rounded-3xl shadow -mt-4">
                <div className="w-16 h-16 rounded-[48px] bg-[#8BC5E5] flex items-center justify-center rotate-15">
                  <DollarSign className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="absolute top-6 left-45 w-3 h-3 rounded-[2px] bg-[#CDB4DB] rotate-[-20deg]"></div>
              <div className="absolute top-6 right-45 w-2 h-2 rounded-[2px] bg-[#9AC8FF] rotate-[-20deg]"></div>
            </div>
          </section>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-gray-900">Book</h3>
          <p className="mt-2 text-sm text-gray-500 font-normal text-center max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            iaculis leo sit amet
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center group z-10">
          {/* Dot on the line */}

          <section className="relative flex justify-center items-center w-full h-full py-32 bg-white">
            <div className="absolute w-[200px] h-[280px]">
              <Image
                src={shapeBg}
                alt="Background Shape"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Main tilted card */}
            <div className="relative w-[130px] h-[160px] flex justify-center items-center bg-[#3f3f42]/5 rounded-3xl shadow-3xl -rotate-[165deg] -mt-12">
              <div className="z-30 relative w-[130px] h-[160px] flex justify-center items-center bg-[#FCFCFD] rounded-3xl shadow mt-4">
                <div className="w-16 h-16 rounded-[48px] bg-[#92A5EF] flex items-center justify-center rotate-165">
                  <Check className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="absolute top-35 right-45 w-3 h-3 rounded-[2px] bg-[#FABDC1] rotate-[-20deg]"></div>
              <div className="absolute top-40 left-40 w-2 h-2 rounded-[2px] bg-[#92A5EF] rotate-[-20deg]"></div>
            </div>
          </section>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-gray-900">Enjoy</h3>
          <p className="mt-2 text-sm text-gray-500 font-normal text-center max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            iaculis leo sit amet
          </p>
        </div>

        {/* (Removed SVG) */}
      </div>
    </section>
  );
};

export default HowItWorks;
