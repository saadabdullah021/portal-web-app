// File: app/auth/login/page.js
"use client";

import { useState } from "react";
import { ArrowRightIcon, X } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import HomeContent from "@/app/components/HomeContent";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/app/contexts/PopupContext";
import { useRouter } from "next/navigation";

export default function SignInPopup() {
  const [phone, setPhone] = useState("");
  const { t } = useTranslation('auth'); 
  const { popups, closePopup, openPopup } = usePopup();
  const router = useRouter();

  const handleClosePopup = () => {
    closePopup('login');
  };

  const handlePhoneSubmit = () => {
    if (phone.trim()) {
      closePopup('login');
      // OTP verification page pe navigate aur popup open
      router.push('/auth/otp-verification');
      setTimeout(() => {
        openPopup('otpVerification');
      }, 100);
    }
  };

  return (
    <>
      <HomeContent/>
      <div className="flex justify-center items-center  bg-gray-100">
        {popups.login && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={handleClosePopup}
          >
            {/* Modal Container */}
            <div
              className="bg-white rounded-2xl shadow-xl w-[540px] h-[310px] p-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClosePopup}
                className="absolute -top-4 -right-0 lg:-top-4 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition"
              >
                <X size={20} />
              </button>

              {/* Heading */}
              <h2 className="text-[32px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center">
                {t('login.title')}
              </h2>
              <p className="text-[#777E90] text-center text-[16px] mt-2">
                {t('login.subtitle')}
              </p>

              {/* Input Section */}
              <div  dir="ltr"  className="flex items-center gap-2 border border-[#E6E8EC] rounded-full mx-auto max-w-xs px-3 py-2 mt-6 shadow-sm">
                {/* Phone Input */}
                <PhoneInput
                  defaultCountry="sa"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  className="flex-1"
                  inputClass="custom-phone-input"
                  placeholder="Enter your phone number"
                />

                {/* Submit Button */}
                <button 
                  onClick={handlePhoneSubmit}
                  className="bg-blue-600 text-white justify-center w-6 h-6 flex items-center rounded-full hover:bg-blue-700 transition"
                >
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}