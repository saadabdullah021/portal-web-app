"use client";
import React from "react";

import shapeBg from "../../../public/images/shape bg.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t,i18n } = useTranslation("home");
  return (
    <section className="relative w-full pt-12 pb-20 bg-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-[#23262F]">
          {t("howItWorks.title")}
        </h2>
        <p className="mt-2 text-gray-500 text-lg">
          {t("howItWorks.subtitle")}
        </p>
      </div>

      {/* Steps + CSS dotted connector */}
      <div className={`relative flex flex-col lg:flex-row lg:items-start md:items-center justify-center gap-12 
         ${i18n.language === "ar" ?"md:gap-48 ":"md:gap-24"}
        `}>

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 2C6.44772 2 6 2.44772 6 3V4H5C3.34315 4 2 5.34315 2 7V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V7C22 5.34315 20.6569 4 19 4H18V3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3V4H8V3C8 2.44772 7.55228 2 7 2ZM9 13C9 12.4477 9.44772 12 10 12H17C17.5523 12 18 12.4477 18 13C18 13.5523 17.5523 14 17 14H10C9.44772 14 9 13.5523 9 13ZM6 17C6 16.4477 6.44772 16 7 16H13C13.5523 16 14 16.4477 14 17C14 17.5523 13.5523 18 13 18H7C6.44772 18 6 17.5523 6 17Z" fill="#FCFCFD" />
                  </svg>

                </div>
              </div>
              <div className="absolute top-6 left-45 w-2 h-2 rounded-[2px] bg-[#FFD166] rotate-[-20deg]"></div>
              <div className="absolute bottom-6 right-50 w-3 h-3 rounded-[2px] bg-[#CDB4DB] rotate-[-20deg]"></div>
            </div>
          </section>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-[#23262F]">
            {t("howItWorks.step1.title")}
          </h3>
          <p className="mt-2 text-sm text-[#777E90] font-normal text-center max-w-xs">
            {t("howItWorks.step1.description")}
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10 2C9.44772 2 9 2.44772 9 3V4C7.34315 4 6 5.34315 6 7V7.55848C6 8.84977 6.82629 9.99619 8.05132 10.4045L11.3162 11.4928C11.7246 11.6289 12 12.0111 12 12.4415V13C12 13.5523 11.5523 14 11 14H9C8.44772 14 8 13.5523 8 13C8 12.4477 7.55229 12 7 12C6.44771 12 6 12.4477 6 13C6 14.6569 7.34315 16 9 16V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V16C12.6569 16 14 14.6569 14 13V12.4415C14 11.1502 13.1737 10.0038 11.9487 9.59547L8.68377 8.50716C8.27543 8.37105 8 7.98891 8 7.55848V7C8 6.44771 8.44772 6 9 6H11C11.5523 6 12 6.44772 12 7C12 7.55229 12.4477 8 13 8C13.5523 8 14 7.55229 14 7C14 5.34315 12.6569 4 11 4V3C11 2.44772 10.5523 2 10 2Z" fill="#FCFCFD" />
                  </svg>

                </div>
              </div>
              <div className="absolute top-6 left-45 w-3 h-3 rounded-[2px] bg-[#CDB4DB] rotate-[-20deg]"></div>
              <div className="absolute top-6 right-45 w-2 h-2 rounded-[2px] bg-[#9AC8FF] rotate-[-20deg]"></div>
            </div>
          </section>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-[#23262F]">
            {t("howItWorks.step2.title")}
          </h3>
          <p className="mt-2 text-sm text-[#777E90] font-normal text-center max-w-xs">
            {t("howItWorks.step2.description")}
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
            <div  className="relative w-[130px] h-[160px] flex justify-center items-center bg-[#3f3f42]/5 rounded-3xl shadow-3xl -rotate-[165deg] -mt-12">
              <div className="z-30 relative w-[130px] h-[160px] flex justify-center items-center bg-[#FCFCFD] rounded-3xl shadow mt-4">
                <div className="w-16 h-16 rounded-[48px] bg-[#92A5EF] flex items-center justify-center rotate-165">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM17.707 8.29297C17.3165 7.90244 16.6835 7.90244 16.293 8.29297L11 13.5859L8.70703 11.293C8.31651 10.9024 7.68349 10.9024 7.29297 11.293C6.90244 11.6835 6.90244 12.3165 7.29297 12.707L10.293 15.707C10.6835 16.0976 11.3165 16.0976 11.707 15.707L17.707 9.70703C18.0976 9.31651 18.0976 8.68349 17.707 8.29297Z" fill="#FCFCFD" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-35 right-45 w-3 h-3 rounded-[2px] bg-[#FABDC1] rotate-[-20deg]"></div>
              <div className="absolute top-40 left-40 w-2 h-2 rounded-[2px] bg-[#92A5EF] rotate-[-20deg]"></div>
            </div>
          </section>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-[#23262F]">
            {t("howItWorks.step3.title")}
          </h3>
          <p className="mt-2 text-sm text-[#777E90] font-normal text-center max-w-xs">
           {t("howItWorks.step3.description")}  
          </p>
        </div>

        {/* (Removed SVG) */}
      </div>
    </section>
  );
};

export default HowItWorks;
