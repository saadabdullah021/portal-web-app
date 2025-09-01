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
    const [countryCode, setCountryCode] = useState(value?.countryCode || "+966");
    const [phoneNumber, setPhoneNumber] = useState(value?.phoneNumber || "");

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
        onChange?.({ countryCode, phoneNumber: value });
    };

    const handleCountryChange = (phone) => {
        setCountryCode(phone);
        onChange?.({ countryCode: phone, phoneNumber });
    };

    return (
        <div className={`flex items-center bg-white border ${error ? 'border-red-500' : 'border-gray-200'} rounded-full px-3 py-1.5 shadow-sm ${className}`}>
            <div className="flex-shrink-0">
                <IntlPhoneInput
                    defaultCountry="sa"
                    value={countryCode}
                    onChange={handleCountryChange}
                    className="!flex !items-center !m-0 !p-0"
                    inputClass="!hidden"
                    placeholder=""
                    hideDropdown={false}
                    disableDropdown={disabled}
                    style={{
                        width: '10px',
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
            
            <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={placeholder}
                className="flex-1 outline-none text-sm bg-transparent text-gray-900 placeholder-gray-400"
                maxLength={15}
                disabled={disabled}
            />

            <button 
                onClick={onSubmit}
                disabled={disabled}
                className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 ml-2"
            >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default PhoneInput;
