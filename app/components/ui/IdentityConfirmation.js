import { useState } from "react";
import { X } from "lucide-react";

const IdentityConfirmation = ({ 
    phoneNumber, 
    email,
    onClose, 
    onContinue,
    className = "" 
}) => {
    const [selectedMethod, setSelectedMethod] = useState('sms');

    const handleContinue = () => {
        onContinue(selectedMethod);
    };

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

    const maskEmail = (email) => {
        if (!email) return '';
        const [username, domain] = email.split('@');
        if (username.length <= 3) return email;
        return username.substring(0, 3) + '.......@' + domain;
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className={`bg-white rounded-2xl shadow-xl w-[540px] p-10 relative ${className}`}>
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition cursor-pointer"
                >
                    <X size={20} />
                </button>

                <h2 className="text-[32px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center mb-2">
                    Lets confirm its really you
                </h2>
                
                <p className="text-[#777E90] text-center text-[16px] mb-8">
                    Help us secure your account. Please complete the verifications below
                </p>

                <div className="space-y-4 mb-8">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="verificationMethod"
                            value="sms"
                            checked={selectedMethod === 'sms'}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-[#141416] text-[16px]">
                            Get a text message to {maskPhoneNumber(phoneNumber)}
                        </span>
                    </label>

                    {/* <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="verificationMethod"
                            value="email"
                            checked={selectedMethod === 'email'}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-[#141416] text-[16px]">
                            Get an email message at {maskEmail(email)}
                        </span>
                    </label> */}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleContinue}
                        className="bg-[#3B71FE] text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors text-[16px]"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdentityConfirmation;
