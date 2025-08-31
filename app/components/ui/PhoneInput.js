import { useState } from "react";
import { PhoneInput as IntlPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const PhoneInput = ({ 
    value, 
    onChange, 
    placeholder = "your phone number",
    className = "",
    disabled = false,
    error = false,
    onSubmit
}) => {
    const [countryCode, setCountryCode] = useState("+966");
    const [phoneNumber, setPhoneNumber] = useState(value || "");

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
        onChange?.(countryCode + value);
    };

    const handleCountryChange = (phone) => {
        setCountryCode(phone);
        onChange?.(phone + phoneNumber);
    };

    return (
        <div className={`flex items-center bg-white border ${error ? 'border-red-500' : 'border-gray-200'} rounded-full px-4 py-3 shadow-sm ${className}`}>
            <div className="flex-shrink-0">
                <IntlPhoneInput
                    defaultCountry="sa"
                    value={countryCode}
                    onChange={handleCountryChange}
                    className="!flex !items-center !w-auto !m-0 !p-0"
                    inputClass="!hidden"
                    placeholder=""
                    hideDropdown={false}
                    disableDropdown={disabled}
                    countrySelectorStyleProps={{
                        buttonStyle: {
                            backgroundColor: '#10B981',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }}
                />
            </div>
            
            <div className="w-px h-8 bg-gray-300 mx-4"></div>
            
            <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={placeholder}
                className="flex-1 outline-none text-base bg-transparent text-gray-900 placeholder-gray-400"
                maxLength={15}
                disabled={disabled}
            />

            <button 
                onClick={onSubmit}
                disabled={disabled}
                className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 ml-3"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default PhoneInput;
