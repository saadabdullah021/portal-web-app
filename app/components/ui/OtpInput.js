import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const OtpInput = ({ 
    phoneNumber, 
    onClose, 
    onSubmit, 
    onResend,
    error = false,
    errorMessage = "",
    successMessage = "",
    className = "" 
}) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);

    const maskPhoneNumber = (phone) => {
        if (!phone) return '';
        const length = phone.length;
        if (length <= 8) return phone;
        
        // Keep country code and first 2 digits, mask the rest
        const countryCode = phone.substring(0, 4); // +966
        const firstDigits = phone.substring(4, 6); // 55
        const maskedDigits = '•••';
        const lastDigits = phone.substring(length - 2); // 84
        
        return `${countryCode} ${firstDigits} ${maskedDigits} ${lastDigits}`;
    };

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInputChange = (index, value) => {
        if (value.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (otpValue) => {
        if (otpValue.length !== 4) return;
        
        setLoading(true);
        try {
            await onSubmit(otpValue);
        } catch (error) {
            console.error('OTP submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            await onResend();
        } catch (error) {
            console.error('Resend error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-2xl shadow-2xl w-[480px] p-8 relative ${className}`}>
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-0 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                    Confirm your number
                </h2>
                
                <p className="text-gray-600 text-center text-sm mb-8">
                    Enter the code we sent over SMS to {maskPhoneNumber(phoneNumber)}:
                </p>

                <div className="flex justify-center gap-3 mb-8">
                    {otp.map((digit, index) => (
                        <div key={index} className="relative">
                            <input
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                placeholder="-"
                                className={`w-14 h-14 text-center text-2xl font-semibold border-2 rounded-xl focus:outline-none bg-white transition-colors ${
                                    error ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                                }`}
                                disabled={loading}
                            />
                            {error && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {error && errorMessage && (
                    <p className="text-red-500 text-sm text-center mb-6 font-medium">{errorMessage}</p>
                )}

                {successMessage && !error && (
                    <p className="text-green-600 text-sm text-center mb-6 font-medium">{successMessage}</p>
                )}

                <div className="text-center mb-6">
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="text-[#3B71FE] text-sm hover:underline font-semibold disabled:opacity-50"
                    >
                        Didnt receive the code? Resend
                    </button>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => handleSubmit(otp.join(''))}
                        disabled={loading || otp.some(digit => digit === '')}
                        className="bg-gray-200 text-gray-600 font-medium py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpInput;
