// File: app/auth/login/page.js
"use client";

import { useState } from "react";
import { ArrowRightIcon, X } from "lucide-react";
import HomeContent from "@/app/components/HomeContent";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/app/contexts/PopupContext";
import { useRouter } from "next/navigation";
import PhoneInput from "@/app/components/ui/PhoneInput";
import OtpInput from "@/app/components/ui/OtpInput";
import axios from "@/lib/axios";
import { toast } from 'react-toastify';

export default function SignInPopup() {
  const [phoneData, setPhoneData] = useState({ countryCode: "+966", phoneNumber: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { t } = useTranslation('auth'); 
  const { popups, closePopup, openPopup } = usePopup();
  const router = useRouter();

  const handleClosePopup = () => {
    closePopup('login');
    setPhoneData({ countryCode: "+966", phoneNumber: "" });
    setError("");
    setShowOtpInput(false);
  };

  const handlePhoneChange = (data) => {
    setPhoneData(data);
  };

  const handlePhoneSubmit = async () => {
    const fullPhone = phoneData.countryCode + phoneData.phoneNumber;
    
    if (!phoneData.phoneNumber) {
      setError("Please enter your phone number");
      toast.error("Please enter your phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        otp_value: fullPhone,
        otp_type: 'sms',
        user_type: 'guest',
        request_type: 'sign_in'
      };

      const response = await axios.post('/send-otp', payload);
      console.log(response);
      
      if(response.status === 200 && response.data.success){
        toast.success("OTP sent successfully!");
        localStorage.setItem('loginPhone', fullPhone);
        closePopup('login');
        setShowOtpInput(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otp) => {
    const fullPhone = phoneData.countryCode + phoneData.phoneNumber;
    const countryCode = phoneData.countryCode.replace('+', '');
    const phoneNumber = phoneData.phoneNumber;
    
    setLoading(true);
    setError("");

    try {
      const payload = {
        otp_code: otp,
        otp_type: 'sms',
        otp_value: fullPhone,
        phone_number: phoneNumber,
        country_code: countryCode,
        request_type: 'sign_in',
        user_type: 'guest'
      };

      const response = await axios.post('/verify-otp', payload);
      console.log(response);
      
      if(response.status === 200 && response.data.success){
        const userData = response.data.data.user;
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        toast.success("Login successful!");
        
        setShowOtpInput(false);
        
        router.push('/');
        
      } else {
        toast.error("Failed to verify OTP. Please try again.");
        setError("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to verify OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpResend = async () => {
    try {
      const fullPhone = phoneData.countryCode + phoneData.phoneNumber;
      const payload = {
        otp_value: fullPhone,
        otp_type: 'sms',
        user_type: 'guest',
        request_type: 'sign_in'
      };

      const response = await axios.post('/send-otp', payload);
      
      if(response.status === 200 && response.data.success){
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCloseOtp = () => {
    setShowOtpInput(false);
  };

  return (
    <>
      <HomeContent/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {popups.login && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={handleClosePopup}
          >
            <div
              className="bg-white rounded-2xl shadow-xl w-[540px] h-[310px] p-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClosePopup}
                className="absolute -top-4 -right-0 lg:-top-4 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition"
              >
                <X size={20} />
              </button>

              <h2 className="text-[32px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center">
                {t('login.title')}
              </h2>
              <p className="text-[#777E90] text-center text-[16px] mt-2">
                {t('login.subtitle')}
              </p>

              <div className="w-full mt-6">
                <PhoneInput
                  value={phoneData}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone number"
                  className="w-full"
                  error={!!error}
                  onSubmit={handlePhoneSubmit}
                />
              </div>

              {error && (
                <div className="text-red-500 text-xs text-center mt-2">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {showOtpInput && (
          <OtpInput
            phoneNumber={phoneData.countryCode + phoneData.phoneNumber}
            onSubmit={handleOtpSubmit}
            onResend={handleOtpResend}
            onClose={handleCloseOtp}
          />
        )}
      </div>
    </>
  );
}