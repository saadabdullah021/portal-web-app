// File: app/auth/confirm-identity-method/page.js
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import HomeContent from "@/app/components/HomeContent";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/app/contexts/PopupContext";

export default function ConfirmIdentityPopup() {
  const { t } = useTranslation('auth');
  const { popups, closePopup } = usePopup();
  const [selectedOption, setSelectedOption] = useState("sms");

  const handleClosePopup = () => {
    closePopup('confirmIdentity');
  };

  const handleContinue = () => {
    
    alert(`Selected option: ${selectedOption}`);
    // Example: Navigate to dashboard or next step
    // router.push('/dashboard');
  };

  return (
    <>
    
      <HomeContent/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {popups.confirmIdentity && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-2xl shadow-xl w-[560px] p-12 lg:p-16 relative mx-auto"
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
            <h2 className="text-[32px] lg:text-[40px] font-dm-sans leading-[45px] text-[#141416] font-bold text-center mb-2">
              {t('confirm_identity.title')}
            </h2>
            {/* Subtitle */}
            <p className="text-center text-[#777E90] text-[16px] my-6 max-w-[350px] mx-auto">
              {t('confirm_identity.subtitle')}
            </p>
            {/* Radio Options */}
            <div className="space-y-3 mb-6">
              {/* SMS Option */}
              <label
                className={`flex items-center gap-3 p-3 max-w-[360px] mx-auto rounded-lg cursor-pointer transition ${
                  selectedOption === "sms"
                    ? " "
                    : "border-[#E6E8EC] hover:border-gray-300"
                }`}
                onClick={() => setSelectedOption("sms")}
              >
                <input
                  type="radio"
                  name="verification"
                  value="sms"
                  checked={selectedOption === "sms"}
                  onChange={() => {}}
                  className="sr-only"
                />
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  {selectedOption === "sms" && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span className="text-[#141416] text-[16px] ">
                  {t('confirm_identity.sms_option')} <span className="font-normal">+966 55 •••• 84</span>
                </span>
              </label>
            </div>
            {/* Continue Button */}
            <button
              className="w-full bg-[#3B71FE] text-white py-3 rounded-full font-bold text-[16px] font-dm-sans flex justify-center max-w-[360px] mx-auto text-base hover:bg-blue-700 transition"
              onClick={handleContinue}
            >
              {t('confirm_identity.continue')}
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}