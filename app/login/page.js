"use client";

import { useState } from "react";
import { ArrowRightIcon, X } from "lucide-react";

export default function SignInPopup() {
  const [isOpen, setIsOpen] = useState(true); // test ke liye direct open rakha hai

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-2xl shadow-xl w-[540px] h-[310px] p-16 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-0 lg:-top-4 lg:-right-4 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 p-1 transition"
            >
              <X size={20} />
            </button>

            {/* Heading */}
            <h2 className="text-[32px] lg:text-[40px] font-dm-sans text-[#141416] font-bold text-center">
              Sign in to Portal
            </h2>
            <p className="text-[#777E90] text-center text-[16px] mt-2">
              Lorem ipsum dolor imit
            </p>

            {/* Input Section */}
            <div className="flex items-center gap-2 border border-[#E6E8EC] rounded-full mx-auto max-w-xs px-3 py-2 mt-6 shadow-sm">
              {/* Country Code Dropdown */}
              <select
                className="bg-transparent outline-none font-medium text-[#23262F] text-sm"
                defaultValue="966"
              >
                <option value="966">+966</option>
                <option value="92">+92</option>
                <option value="1">+1</option>
                <option value="44">+44</option>
              </select>

              {/* Phone Input */}
              <input
                type="tel"
                placeholder="your phone number"
                className="flex-1 bg-transparent outline-none text-sm text-[#777E90]"
              />

              {/* Submit Button */}
              <button className="bg-blue-600 text-white justify-center w-6 h-6 flex items-center rounded-full hover:bg-blue-700 transition">
            <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
