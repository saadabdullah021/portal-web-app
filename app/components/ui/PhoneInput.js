"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput as IntlPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const PhoneInput = ({
    value,
    onChange,
    placeholder = "Enter phone number",
    className = "",
    disabled = false,
    error = false,
    errorMessage = "",
    loading = false,
    onSubmit
}) => {
    const [countryCode, setCountryCode] = useState(value?.countryCode || "+966");
    const [phoneNumber, setPhoneNumber] = useState(value?.phoneNumber || "");
    const [isFocused, setIsFocused] = useState(false);
    const { t, i18n } = useTranslation("");
    const isRTL = i18n.language === "ar";
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
        setPhoneNumber(value);
        onChange?.({ countryCode, phoneNumber: value });
    };

    const handleCountryChange = (phone) => {
        setCountryCode(phone);
        onChange?.({ countryCode: phone, phoneNumber });
    };

    // ✅ Generate a format-aware placeholder based on country (optional enhancement)
    // For Saudi Arabia (+966), typical mobile numbers start with 5 and are 9 digits
    const getPlaceholder = () => {
        if (placeholder !== undefined) return placeholder;
        // Only show example if no explicit placeholder passed
        if (countryCode === '+966') {
            return '501234567'; // Example Saudi mobile number (9 digits, starts with 5)
        }
        return '123456789'; // Generic fallback
    };

    return (
        <div className="w-full " dir="ltr">
            <div className={`flex pl-6 items-center bg-white border ${error ? 'border-red-500' : 'border-gray-200'} rounded-full px-3 py-1.5 shadow-sm transition-colors duration-200 ${className}`}>
                <div className="flex-shrink-0">
                    <IntlPhoneInput
                        defaultCountry="sa"
                        value={countryCode}
                        onChange={handleCountryChange}
                        className="!flex !items-center !m-0 !p-0"
                        inputClass="!hidden"
                        placeholder="asdasdasdasd"
                        hideDropdown={false}
                        disableDropdown={disabled || loading}
                        style={{
                            width: '10px',
                        }}
                        inputProps={{
                            readOnly: true,
                        }}
                        countrySelectorStyleProps={{
                            buttonStyle: {
                                backgroundColor: '#10B981',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '11px'
                            }
                        }}
                    />
                </div>

                <div className="w-px h-5 bg-gray-300 mx-2"></div>

                {/* ✅ FIXED: Input with proper placeholder styling */}
                <div className="flex-1 relative">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={getPlaceholder()}
                        className="w-full outline-none text-sm bg-transparent text-[#141416] placeholder-[#777E90] font-normal"
                        maxLength={11}
                        disabled={disabled || loading}
                    />
                </div>

                {error && (
                    <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}

                <button
                    onClick={onSubmit}
                    disabled={disabled || loading || !phoneNumber.trim()}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-2 cursor-pointer ${disabled || loading || !phoneNumber.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    {loading ? (
                        <svg
                            className="animate-spin"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : isRTL ? (
                        // 🔹 RTL: Arrow Left
                        <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.90906 8.73677C4.50324 9.11137 3.8706 9.08606 3.496 8.68024L0.265165 5.1802C-0.0883881 4.79713 -0.0883881 4.2067 0.265165 3.82364L3.496 0.323675C3.8706 -0.0821431 4.50323 -0.107446 4.90905 0.26716C5.31487 0.641767 5.34018 1.27443 4.96558 1.68024L3.284 3.50192L13 3.50192C13.5523 3.50192 14 3.94964 14 4.50192C14 5.0542 13.5523 5.50192 13 5.50192L3.284 5.50192L4.96557 7.32368C5.34018 7.72951 5.31487 8.36217 4.90906 8.73677Z"
                                fill="currentColor"
                            />
                        </svg>
                    ) : (
                        // 🔹 LTR: Arrow Right (aapka pehle wala)
                        <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.09094 0.26716C9.49676 -0.107446 10.1294 -0.0821431 10.504 0.323675L13.7348 3.82364C14.0884 4.2067 14.0884 4.79713 13.7348 5.1802L10.504 8.68024C10.1294 9.08606 9.49677 9.11137 9.09095 8.73677C8.68513 8.36217 8.65982 7.72951 9.03442 7.32368L10.716 5.50192L0.999999 5.50192C0.447714 5.50192 -7.64154e-07 5.0542 -7.86799e-07 4.50192C-8.09444e-07 3.94964 0.447714 3.50192 0.999999 3.50192L10.716 3.50192L9.03443 1.68024C8.65982 1.27443 8.68513 0.641767 9.09094 0.26716Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}

                </button>
            </div>
            {error && errorMessage && (
                <p className="text-red-500 text-sm mt-1 px-3">{errorMessage}</p>
            )}
        </div>
    );
};

export default PhoneInput;