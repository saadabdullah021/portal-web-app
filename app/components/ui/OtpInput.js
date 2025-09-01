import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const OtpInput = ({ 
    phoneNumber, 
    onClose, 
    onSubmit, 
    onResend,
    className = "" 
}) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);

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

        if (newOtp.every(digit => digit !== '') && index === 3) {
            handleSubmit(newOtp.join(''));
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className={`bg-white rounded-2xl shadow-xl w-[540px] p-10 relative ${className}`}>
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-0 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-[32px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center mb-2">
                    Enter your security code
                </h2>
                
                <p className="text-[#777E90] text-center text-[16px] mb-8">
                    We texted you on {phoneNumber}
                </p>

                <div className="flex justify-center gap-4 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none bg-gray-50"
                            disabled={loading}
                        />
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="text-[#3B71FE] text-sm hover:underline font-semibold disabled:opacity-50"
                    >
                        Didn't receive the code? Resend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpInput;
