"use client";
import React from "react";
import { Calendar } from "lucide-react"; // Icon as placeholder
import shapeBg from '../../../public/images/shape bg.png'
import Image from "next/image";
const TiltedCardSection = () => {
  return (
    <section className="relative flex justify-center items-center w-full h-full py-32 bg-white ">
      {/* Background floating shapes */}


      {/* Blob background shape */}
   

      <div className=" absolute w-[200px] h-[280px]">
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
        <div className=" w-16 h-16 rounded-[48px] bg-[#58C27D] flex items-center justify-center rotate-15">
          <Calendar className="text-white w-6 h-6" />
        </div>
      </div>
         <div className="absolute top-6 left-60 w-2 h-2 rounded-[2px] bg-[#FFD166] rotate-[-20deg]"></div>
      <div className="absolute bottom-6 right-60 w-3 h-3 rounded-[2px] bg-[#CDB4DB] rotate-[-20deg]"></div>
      </div>
    </section>
  );
};

export default TiltedCardSection;
