"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Globe, HelpCircle, HomeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/portal-logo.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import { usePopup } from "../contexts/PopupContext";
import { useRouter } from "next/navigation";

const AuthNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t,i18n } = useTranslation("auth");
  const dropdownRef = useRef(null);
  const { openPopup } = usePopup();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const handleSignupClick = () => {
    toggleMenu();
    // Pehle signup page pe navigate karein
    router.push('/auth/signup');
    // Thoda delay ke baad popup open karein
    setTimeout(() => {
      openPopup('signup');
    }, 100);
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="w-[86px] h-8 relative">
                <Image
                  src={logo}
                  alt="Portal Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right: Language + Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switch */}
            <button
              onClick={() =>
                changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
              className="flex items-center space-x-1 text-[#777E90] hover:text-gray-600 p-2 rounded-md transition"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium capitalize">
                {t("switchLang")}
              </span>
            </button>

            {/* Hamburger Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-[#777E90] hover:text-gray-500 hover:bg-gray-100 transition"
              >
                <Menu className="h-6 w-6" />
              </button>


              {isMenuOpen && (
                <div className={ `absolute top-14  mt-2 w-64 bg-white shadow-lg rounded-2xl p-4 z-50
                
                ${i18n.language === "ar" ? "left-0 md:left-2 lg:-left-12" : "right-3 md:right-2 lg:-right-12"}
                `}>
                  {/* Help Center */}
                  <Link
                    href="/help"
                    className="flex items-center space-x-3 pr-4 py-2  rounded-xl text-sm text-[#23262F] hover:bg-gray-50 transition-colors duration-200"
                  >
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                    <span className="font-bold ">
                      {t("auth_navbar.help_center")}

                    </span>
                  </Link>
                  <hr className="text-gray-300  my-2" />
                  {/* Become a host */}
                  <Link
                    href="/become-a-host"
                    className="flex flex-col px-4 pt-2 pb-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#23262F]">
                        {t("auth_navbar.become_host")}
                      </span>
                      <HomeIcon className="h-4 w-4 text-gray-600" />
                    </div>
                    <p className="text-xs text-[#777E90] mt-1">
                      {t("auth_navbar.become_host_desc")}
                    </p>
                  </Link>
                  <hr className="text-gray-300  my-2" />
                  {/* Login / Sign Up */}
                  <button
                  
                     onClick={handleSignupClick}
                    className={`block px-4 py-2 mt-2  w-full  rounded-xl font-bold text-sm text-[#23262F] hover:bg-gray-50 transition-colors duration-200
                       ${i18n.language === "ar" ? " text-right lg:text-right  " : " text-left lg:text-left "}
                      `}
                  >
                    {t("auth_navbar.login_signup")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
