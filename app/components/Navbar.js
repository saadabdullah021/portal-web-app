"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, User } from "lucide-react";
import logo from "../../public/portal-logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import NotificationDropdown from "./ui/NotificationDropdown";
import ProfileDropdown from "./ui/ProfileDropdown";

const Navbar = () => {
  
  const [activeDropdown, setActiveDropdown] = useState(null); // "notif" | "profile" | null
  const { t } = useTranslation("home");


  const dropdownRef = useRef(null);

  // ✅ Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ language change function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {}
                 // 👈 ye re-render force karega
  setActiveDropdown(null); // 👈 menu close
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl 2xl:max-w-[1280px] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="w-[86px] h-8 relative">
                <Image src={logo} alt="Portal Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4" ref={dropdownRef}>
            {/* Support */}
            <Link
              href="#"
              className="text-[#777E90] capitalize hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
              {t("navbar.support")}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
              className="flex items-center space-x-1 text-[#777E90] hover:text-blue-800 p-2 rounded-md transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm capitalize font-medium">{t("switchLang")}</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "notif" ? null : "notif")
                }
                className="p-2 text-[#777E90] hover:text-blue-800 rounded-full transition-all duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_284_12331)">
                    <path d="M21 18.0233C21 18.5113 20.6043 18.907 20.1163 18.907H3.88372C3.39565 18.907 3 18.5113 3 18.0233C3 17.5352 3.39566 17.1395 3.88372 17.1395H3.9V10.9809C3.9 6.57288 7.527 3 12 3C16.473 3 20.1 6.57288 20.1 10.9809V17.1395H20.1163C20.6043 17.1395 21 17.5352 21 18.0233ZM5.7 17.1395H18.3V10.9809C18.3 7.5494 15.4794 4.76744 12 4.76744C8.5206 4.76744 5.7 7.5494 5.7 10.9809V17.1395ZM9.97604 20.7558C9.73121 20.2608 10.1977 19.7907 10.75 19.7907H13.25C13.8023 19.7907 14.2688 20.2608 14.024 20.7558C13.9155 20.9751 13.7699 21.1773 13.591 21.3529C13.169 21.7672 12.5967 22 12 22C11.4033 22 10.831 21.7672 10.409 21.3529C10.2301 21.1773 10.0845 20.9751 9.97604 20.7558Z" fill="#777E91" />
                  </g>
                  <defs>
                    <clipPath id="clip0_284_12331">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="absolute top-0 right-0 h-3 w-3 bg-[#58C27D] rounded-full"></span>

              </button>
              {activeDropdown === "notif" && <NotificationDropdown />}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "profile" ? null : "profile")
                }
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              {activeDropdown === "profile" && <ProfileDropdown />}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3" ref={dropdownRef}>
            {/* Mobile Notifications */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "notif" ? null : "notif")
                }
                className="p-2 text-[#777E90] hover:text-blue-800 rounded-full transition-all duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_284_12331)">
                    <path d="M21 18.0233C21 18.5113 20.6043 18.907 20.1163 18.907H3.88372C3.39565 18.907 3 18.5113 3 18.0233C3 17.5352 3.39566 17.1395 3.88372 17.1395H3.9V10.9809C3.9 6.57288 7.527 3 12 3C16.473 3 20.1 6.57288 20.1 10.9809V17.1395H20.1163C20.6043 17.1395 21 17.5352 21 18.0233ZM5.7 17.1395H18.3V10.9809C18.3 7.5494 15.4794 4.76744 12 4.76744C8.5206 4.76744 5.7 7.5494 5.7 10.9809V17.1395ZM9.97604 20.7558C9.73121 20.2608 10.1977 19.7907 10.75 19.7907H13.25C13.8023 19.7907 14.2688 20.2608 14.024 20.7558C13.9155 20.9751 13.7699 21.1773 13.591 21.3529C13.169 21.7672 12.5967 22 12 22C11.4033 22 10.831 21.7672 10.409 21.3529C10.2301 21.1773 10.0845 20.9751 9.97604 20.7558Z" fill="#777E91" />
                  </g>
                  <defs>
                    <clipPath id="clip0_284_12331">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="absolute top-0 right-0 h-3 w-3 bg-[#58C27D] rounded-full"></span>


              </button>
              {activeDropdown === "notif" && <NotificationDropdown />}
            </div>

            {/* Mobile Profile */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "profile" ? null : "profile")
                }
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              {activeDropdown === "profile" && <ProfileDropdown />}
            </div>

                {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "menu" ? null : "menu")
              }
              className="p-2 rounded-md text-[#777E90] hover:text-blue-800 hover:bg-purple-50"
            >
              {activeDropdown === "menu" ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

      
  {/* ---- Mobile Menu ---- */}
 {/* ---- Mobile Menu ---- */}
{activeDropdown === "menu" && (
  <div key={i18n.language} className="md:hidden border-t border-gray-200">
    <div className="px-2 pt-2 pb-3 space-y-1">
      <button
        onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
        className="flex items-center space-x-1 text-[#777E90] hover:text-blue-800 py-2 rounded-md"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm capitalize font-medium">{t("switchLang")}</span>
      </button>
      <Link
        href="#"
        className="text-[#777E90] hover:text-blue-800 text-sm font-medium"
      >
        {t("navbar.support")}
      </Link>
    </div>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;
