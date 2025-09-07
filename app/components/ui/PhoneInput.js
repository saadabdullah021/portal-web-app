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
    errorMessage = "",
    loading = false,
    onSubmit
}) => {
    const [countryCode, setCountryCode] = useState(value?.countryCode || "+966");
    const [phoneNumber, setPhoneNumber] = useState(value?.phoneNumber || "");

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
        setPhoneNumber(value);
        onChange?.({ countryCode, phoneNumber: value });
    };

    const handleCountryChange = (phone) => {
        setCountryCode(phone);
        onChange?.({ countryCode: phone, phoneNumber });
    };

    return (
        <div className="w-full">
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
                        disableDropdown={disabled || loading}
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
                    maxLength={11}
                    disabled={disabled || loading}
                />

                {error && (
                    <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}

                <button 
                    onClick={onSubmit}
                    disabled={disabled || loading}
                    className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 ml-2 cursor-pointer"
                >
                    {loading ? (
                        <svg className="animate-spin" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    ) : (
<svg width="14" height="8" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clip-rule="evenodd" d="M9.09094 0.26716C9.49676 -0.107446 10.1294 -0.0821431 10.504 0.323675L13.7348 3.82364C14.0884 4.2067 14.0884 4.79713 13.7348 5.1802L10.504 8.68024C10.1294 9.08606 9.49677 9.11137 9.09095 8.73677C8.68513 8.36217 8.65982 7.72951 9.03442 7.32368L10.716 5.50192L0.999999 5.50192C0.447714 5.50192 -7.64154e-07 5.0542 -7.86799e-07 4.50192C-8.09444e-07 3.94964 0.447714 3.50192 0.999999 3.50192L10.716 3.50192L9.03443 1.68024C8.65982 1.27443 8.68513 0.641767 9.09094 0.26716Z" fill="#FCFCFD"/>
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
