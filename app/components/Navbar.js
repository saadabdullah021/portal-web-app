'use client';
import React, { useState } from 'react';
import { Menu, X, Bell, Globe, ChevronDown, User } from 'lucide-react';
import logo from '../../public/portal-logo.svg';
import Link from 'next/link';
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n"; // config import karo
import NotificationDropdown from './ui/NotificationDropdown';
import ProfileDropdown from './ui/ProfileDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { t } = useTranslation("common");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // ✅ language change function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === "ar") {
      document.dir = "rtl"; // arabic = RTL
    } else {
      document.dir = "ltr"; // english = LTR
    }
    setIsLanguageOpen(false);
  };


  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto  px-4 ">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
 

<div className="flex items-center">
  <div className="flex-shrink-0">
    <div className="flex items-center space-x-2">
      {/* Next.js logo */}
      <div className="w-[86px] h-8 relative">
        <Image 
          src={logo} 
          alt="Portal Logo" 
          fill 
          className="object-contain"
        />
      </div>
    </div>
  </div>
</div>


     
   

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Support Link */}
            <Link href="/login" className="text-gray-600 capitalize hover:text-purple-600 text-sm font-medium transition-colors duration-200">
           {t("navbar.support")}
            </Link>

    
          
     {/* Language Toggle Button */}
<div className="relative">
  <button
    onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 p-2 rounded-md transition-colors duration-200"
  >
    <Globe className="h-4 w-4" />
    <span className="text-sm capitalize font-medium">{t("switchLang")}</span>
  </button>
</div>


            {/* Notification Bell */}
            <div className="relative">
              <button
               onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-gray-600 hover:text-purple-600  rounded-full transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-[#58C27D] rounded-full"></span>
              </button>
               {isNotifOpen && <NotificationDropdown />}
            </div>

          
         {/* Profile Dropdown */}
<div className="relative">
  <button
    onClick={toggleProfile}
    className="flex items-center space-x-2 p-1 rounded-full hover:bg-purple-50 transition-colors duration-200"
  >
    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <User className="h-4 w-4 text-white" />
    </div>
  </button>

  {isProfileOpen && <ProfileDropdown />}
</div>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
          
          
              {/* Mobile Notifications */}
         <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-gray-600 hover:text-purple-600  rounded-full transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-[#58C27D] rounded-full"></span>
              </button>
                {isNotifOpen && <NotificationDropdown />}
            </div>
    <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              
           {isProfileOpen && <ProfileDropdown />}
              
            </div>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
         
         
              
              {/* Mobile Language Selector */}
              <div className=" py-2 space-y-4">
              {/* Language Toggle Button */}
<div className="relative">
  <button
    onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 py-2 rounded-md transition-colors duration-200"
  >
    <Globe className="h-4 w-4" />
    <span className="text-sm capitalize font-medium">{t("switchLang")}</span>
  </button>
</div>

                      {/* Support Link */}
                      <div>
       <Link href="/login" className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200">
              {t("navbar.support")}
            </Link>
                      </div>
     
              </div>
    
              
             
              
    
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;