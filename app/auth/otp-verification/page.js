// File: app/auth/otp-verification/page.js
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import HomeContent from "@/app/components/HomeContent";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/app/contexts/PopupContext";
import { useRouter } from "next/navigation";

export default function OtpVerificationPopup() {
  const { t } = useTranslation('auth');
  const { popups, closePopup, openPopup } = usePopup();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]); // Array of 4 digits

  const handleClosePopup = () => {
    closePopup('otpVerification');
  };

  // Handle input change
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    // Auto-focus next input if digit entered
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    setOtp(newOtp);

    // Check if OTP is complete (4 digits entered)
    if (newOtp.every(digit => digit !== "") && index === 3) {
      // OTP complete, navigate to confirm identity
      setTimeout(() => {
        closePopup('otpVerification');
        router.push('/auth/confirm-identity-method');
        setTimeout(() => {
          openPopup('confirmIdentity');
        }, 100);
      }, 500);
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <>
    
      <HomeContent/>
    <div className="flex justify-center items-center  bg-gray-100">
      {popups.otpVerification && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-2xl shadow-xl w-[560px] leading-[48px] p-8 lg:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute -top-4 -right-1 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition"
            >
              <X size={20} />
            </button>
            {/* Title */}
            <h2 className="text-[40px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center mb-2">
              {t('otp.title')}
            </h2>
            {/* Subtitle */}
            <p className="text-center text-[#777E90] text-[16px] mb-3 lg:mb-8">
              {t('otp.subtitle')}
              <span className="font-medium">+966 55 555 5555</span>
            </p>
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-6 lg:gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-16 border border-[#E6E8EC] bg-[#F4F5F6] rounded-lg text-center text-[20px] font-semibold focus:outline-none transition"
                  placeholder=" "
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}