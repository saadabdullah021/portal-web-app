//app/auth/signup/page.js
"use client";

import { useState } from "react";
import { ArrowRightIcon, X } from "lucide-react";
import Link from "next/link";
import HomeContent from "@/app/components/HomeContent";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/app/contexts/PopupContext";
import axios from "@/lib/axios";
import { showToast } from 'nextjs-toast-notify';
import PhoneInput from "@/app/components/ui/PhoneInput";
import OtpInput from "@/app/components/ui/OtpInput";
import IdentityConfirmation from "@/app/components/ui/IdentityConfirmation";

export default function SignUpPage() {
    const { t } = useTranslation('auth');
    const { popups, closePopup, openPopup } = usePopup();
    const [phoneData, setPhoneData] = useState({ countryCode: "+966", phoneNumber: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showIdentityConfirmation, setShowIdentityConfirmation] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);

    const handleClosePopup = () => {
        closePopup('signup');
        setPhoneData({ countryCode: "+966", phoneNumber: "", email: "" });
        setError("");
        setShowOtpInput(false);
        setShowIdentityConfirmation(false);
    };

    const handleLoginClick = () => {
        closePopup('signup');
        openPopup('login');
    };

    const handlePhoneChange = (data) => {
        setPhoneData(data);
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
                request_type: 'sign_up',
                user_type: 'guest'
            };

            const response = await axios.post('/verify-otp', payload);
            console.log(response);
            
            if(response.status === 200 && response.data.success){
                const userData = response.data.data.user;
                
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('isAuthenticated', 'true');
                
                showToast.success(response.data.message || "Profile created successfully!", { position: "top-center" });
                
                setShowOtpInput(false);
                handleClosePopup()
                
                console.log('User profile created:', userData);
                
            } else {
                showToast.error("Failed to verify OTP. Please try again.", { position: "top-center" });
                setError("Failed to verify OTP. Please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to verify OTP. Please try again.";
            setError(errorMessage);
            showToast.error(errorMessage, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const handleOtpResend = async () => {
        const fullPhone = phoneData.countryCode + phoneData.phoneNumber;
        setLoading(true);
        setError("");

        try {
            const payload = {
                otp_value: fullPhone,
                otp_type: 'sms',
                user_type: 'guest',
                request_type: 'sign_up'
            };

            const response = await axios.post('/send-otp', payload);
            console.log(response);
            
            if(response.status === 200 && response.data.success){
                showToast.success("OTP resent successfully!", { position: "top-center" });
                localStorage.setItem('signupPhone', fullPhone);
            } else {
                showToast.error("Failed to resend OTP. Please try again.", { position: "top-center" });
                setError("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to resend OTP. Please try again.";
            setError(errorMessage);
            showToast.error(errorMessage, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseOtp = () => {
        setShowOtpInput(false);
    };

    const handleSubmit = async () => {
        const fullPhone = phoneData.countryCode + phoneData.phoneNumber;
        
        if (!phoneData.phoneNumber) {
            setError("Please enter your phone number");
            showToast.error("Please enter your phone number", { position: "top-center" });
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                otp_value: fullPhone,
                otp_type: 'sms',
                user_type: 'guest',
                request_type: 'sign_up'
            };

            const response = await axios.post('/send-otp', payload);
            console.log(response);
            
            if(response.status === 200 && response.data.success){
                showToast.success("Phone number verified!", { position: "top-center" });
                localStorage.setItem('signupPhone', fullPhone);
                closePopup('signup');
                setShowIdentityConfirmation(true);
            } else {
                showToast.error("Failed to verify phone number. Please try again.", { position: "top-center" });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to verify phone number. Please try again.";
            setError(errorMessage);
            showToast.error(errorMessage, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const handleIdentityConfirmationContinue = async (method) => {
        const fullPhone = phoneData.countryCode + phoneData.phoneNumber;
        
        try {
            const payload = {
                otp_value: fullPhone,
                otp_type: method,
                user_type: 'guest',
                request_type: 'sign_up'
            };

            const response = await axios.post('/send-otp', payload);
            
            if(response.status === 200 && response.data.success){
                showToast.success("OTP sent successfully!", { position: "top-center" });
                setShowIdentityConfirmation(false);
                setShowOtpInput(true);
            } else {
                showToast.error("Failed to send OTP. Please try again.", { position: "top-center" });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
            showToast.error(errorMessage, { position: "top-center" });
        }
    };

    const handleCloseIdentityConfirmation = () => {
        setShowIdentityConfirmation(false);
        handleClosePopup();
    };

    return (
        <>
            <HomeContent/>
            <div className="flex justify-center items-center  bg-gray-100">
                {popups.signup && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        onClick={handleClosePopup}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-xl w-[540px] h-[400px] p-10 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleClosePopup}
                                className="absolute -top-4 -right-0 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-[32px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center mb-2">
                                {t('signup.title') || 'Sign up to Portal'}
                            </h2>
                            <p className="text-[#777E90] text-center text-[16px] mb-6">
                                {t('signup.subtitle') || 'Lorem ipsum dolor imit'}
                            </p>

                            <div className="flex gap-3 justify-center mb-4">
                                <button className="flex items-center gap-2 font-bold text-[16px] font-dm-sans px-6 py-2.5 bg-[#3B71FE] text-[#FCFCFD] rounded-full hover:bg-blue-700 transition">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3982 5.7901H7.03484V8.5176H10.6415C10.0648 10.3359 8.64067 10.9418 7.00567 10.9418C6.37208 10.9426 5.74765 10.7905 5.18536 10.4985C4.62306 10.2065 4.1395 9.78323 3.77569 9.26451C3.41187 8.74578 3.17856 8.14696 3.09552 7.51883C3.01249 6.89071 3.0822 6.25183 3.29873 5.65639C3.51526 5.06095 3.87222 4.52652 4.33933 4.09846C4.80644 3.67039 5.36992 3.36132 5.98195 3.19746C6.59398 3.0336 7.23651 3.01978 7.85502 3.15719C8.47353 3.2946 9.04976 3.57917 9.53484 3.98677L11.5165 2.09927C10.7185 1.36413 9.75305 0.834893 8.70408 0.557494C7.65511 0.280094 6.55428 0.262919 5.49717 0.507459C4.44005 0.752 3.4586 1.25086 2.63801 1.96075C1.81743 2.67063 1.18251 3.57007 0.788379 4.58099C0.394249 5.5919 0.25282 6.68374 0.376369 7.76172C0.499918 8.83969 0.884712 9.87122 1.49734 10.7667C2.10998 11.6623 2.93193 12.3947 3.89185 12.9006C4.85177 13.4064 5.92064 13.6702 7.00567 13.6693C10.6815 13.6693 14.0057 11.2451 13.3982 5.7901Z" fill="#FCFCFD" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 font-bold text-[16px] font-dm-sans bg-[#141416] text-[#FCFCFD] rounded-full hover:bg-[#19191c] transition">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_261_10382)">
                                            <path d="M6.05989 3.97756C5.72934 3.82947 5.37322 3.66992 4.77778 3.66992C2.55556 3.66992 2.00002 5.89226 2 8.11437C1.99998 10.3365 3.66667 13.1144 4.77778 13.1144C5.42865 13.1144 5.88889 12.9238 6.27017 12.7658C6.53978 12.6541 6.76989 12.5588 7 12.5588C7.23011 12.5588 7.46022 12.6541 7.72983 12.7658C8.11111 12.9238 8.57133 13.1144 9.22222 13.1144C10.0154 13.1144 11.0917 11.6989 11.6427 10.0803C11.6982 9.91731 11.585 9.7492 11.4188 9.70426C10.4734 9.44876 9.77778 8.58503 9.77778 7.55881C9.77778 6.59048 10.3972 5.76676 11.2614 5.46229C11.4255 5.40447 11.5268 5.22474 11.4494 5.06884C11.0333 4.22995 10.3378 3.66992 9.22222 3.66992C8.62678 3.66992 8.27067 3.82947 7.94011 3.97756C7.65383 4.10582 7.38678 4.22548 7 4.22548C6.61322 4.22548 6.34617 4.10582 6.05989 3.97756Z" fill="#FCFCFD" />
                                            <path d="M7 2.97396C7 1.82336 7.93272 0.890625 9.08333 0.890625C9.16006 0.890625 9.22222 0.952808 9.22222 1.02951C9.22222 2.18011 8.2895 3.11285 7.13889 3.11285C7.06217 3.11285 7 3.05066 7 2.97396Z" fill="#FCFCFD" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_261_10382">
                                                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333496 0.335938)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Apple
                                </button>
                            </div>

                            <div className="text-center text-[#777E90] text-xs mb-4">
                                {t('signup.or_continue') || 'Or continue with phone'}
                            </div>

                            <div className="w-full mt-6">
                                <PhoneInput
                                    value={phoneData}
                                    onChange={handlePhoneChange}
                                    placeholder="your phone number"
                                    className="w-full"
                                    error={!!error}
                                    onSubmit={handleSubmit}
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-xs text-center mt-2">
                                    {error}
                                </div>
                            )}

                            <div className="text-center mt-6 text-[#353945] text-xs">
                                {t('signup.already_account') || 'Already have an account?'} {" "}
                                <Link href="/auth/login">
                                    <button 
                                        onClick={handleLoginClick}
                                        className="text-[#3B71FE] text-xs hover:underline font-semibold"
                                    >
                                        {t('signup.login') || 'Login'}
                                    </button>
                                </Link>
                            </div>
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

                {showIdentityConfirmation && (
                    <IdentityConfirmation
                        phoneNumber={phoneData.countryCode + phoneData.phoneNumber}
                        email={phoneData.email}
                        onContinue={handleIdentityConfirmationContinue}
                        onClose={handleCloseIdentityConfirmation}
                    />
                )}
            </div>
        </>
    );
}