"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, User, HelpCircle, HomeIcon, ChevronDown } from "lucide-react";
import logo from "../../public/portal-logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import NotificationDropdown from "./ui/NotificationDropdown";
import ProfileDropdown from "./ui/ProfileDropdown";

import { useRouter } from "next/navigation";
import { usePopup } from "../contexts/PopupContext";
import AuthModals from "./AuthModals";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setCredentials, logoutSuccess } from "../../store/actions/authActions";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { t } = useTranslation("home");
  const dropdownRef = useRef(null);
  const { openPopup } = usePopup();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [selectedLabel, setSelectedLabel] = useState("Language");
  
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token } = useAppSelector(state => state.auth);
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');
        const isAuth = localStorage.getItem('isAuthenticated');
        
        if (authToken && userData && isAuth === 'true') {
          const parsedUser = JSON.parse(userData);
          
          dispatch(setCredentials({
            user: parsedUser,
            token: authToken
          }));
        } else {
          if (isAuthenticated) {
            dispatch(logoutSuccess());
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        if (isAuthenticated) {
          dispatch(logoutSuccess());
        }
      }
    };

    checkAuthStatus();
    
    window.addEventListener('storage', checkAuthStatus);
    window.addEventListener('authStateChanged', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authStateChanged', checkAuthStatus);
    };
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageOptions = [
    { code: 'en', label: 'English', country: 'United States' },
    { code: 'ar', label: 'Arabic', country: 'Saudi Arabia' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    const lang = languageOptions.find(lang => lang.code === savedLanguage);
    setSelectedLabel(lang ? lang.label : "Language");
  }, []);

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  try {
    localStorage.setItem("i18nextLng", lng);
  } catch {}

  const lang = languageOptions.find(lang => lang.code === lng);
  setSelectedLabel(lang ? lang.label : "Language");

  setActiveDropdown(null);
};

  const handleSignupClick = () => {
    toggleMenu();
    openPopup('signup');
  };


  return (
    <nav className="bg-white  border-b border-gray-200 sticky top-0 z-[9999]">
      <div className="max-w-6xl 2xl:max-w-[1450px] mx-auto  px-8 lg:px-6 2xl:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
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

          {/* Right Section */}
          <div className="flex items-center space-x-4" ref={dropdownRef}>
            {/* Support link */}
            <Link
              href="/user-profile"
              className="text-[#777E90] hidden lg:block capitalize hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
              {t("navbar.support")}
            </Link>

            {/* Language Toggle with Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "language" ? null : "language"
                  )
                }
                className="flex items-center space-x-1 text-[#777E90] hover:text-black p-2 rounded-full bg-gray-100 transition-colors duration-200"
              >
                <Globe className="h-4.5 w-4.5" />
                {/* <span className="text-sm capitalize font-medium">
                   {selectedLabel}

                </span> */}
               
              </button>

              {/* Language Dropdown */}
              {activeDropdown === "language" && (
                <div className={`absolute top-13 mt-2 w-73  bg-white shadow-xl rounded-[20px] p-3 z-50 border border-gray-100
                  ${i18n.language === "ar" ? "left-6 md:left-6 lg:left-6 2xl:left-8" : "right-0 md:right-6 lg:right-6 2xl:right-10"}
                `}>
                  <div className={`space-x-3 flex justify-center items-center
                     ${i18n.language === "ar" ?" gap-3":" "}
                      `}>
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                          i18n.language === lang.code ? 'bg-[#F4F5F6] rounded-[8px]' : ''
                          
                        }
                        
                        `}
                      >
                        <div className="flex flex-col ">
                          <span className="font-semibold text-[#23262F] text-[14px]">
                            {lang.label}
                          </span>
                          <span className="text-[#777E90] text-xs">
                            {lang.country}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "notif" ? null : "notif"
                      )
                    }
                    className="p-2 text-[#777E90] hover:text-blue-800 rounded-full transition-all duration-200"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_433_12331)">
                        <path d="M21 18.0233C21 18.5113 20.6043 18.907 20.1163 18.907H3.88372C3.39565 18.907 3 18.5113 3 18.0233C3 17.5352 3.39566 17.1395 3.88372 17.1395H3.9V10.9809C3.9 6.57288 7.527 3 12 3C16.473 3 20.1 6.57288 20.1 10.9809V17.1395H20.1163C20.6043 17.1395 21 17.5352 21 18.0233ZM5.7 17.1395H18.3V10.9809C18.3 7.5494 15.4794 4.76744 12 4.76744C8.5206 4.76744 5.7 7.5494 5.7 10.9809V17.1395ZM9.97604 20.7558C9.73121 20.2608 10.1977 19.7907 10.75 19.7907H13.25C13.8023 19.7907 14.2688 20.2608 14.024 20.7558C13.9155 20.9751 13.7699 21.1773 13.591 21.3529C13.169 21.7672 12.5967 22 12 22C11.4033 22 10.831 21.7672 10.409 21.3529C10.2301 21.1773 10.0845 20.9751 9.97604 20.7558Z" fill="#777E91" />
                      </g>
                      <defs>
                        <clipPath id="clip0_433_12331">
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
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile"
                      )
                    }
                    className="flex items-center space-x-2 p-1 rounded-full transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {user?.profile_image ? (
                        <Image
                          src={user.profile_image}
                          alt={user?.full_name || "user image"}
                          className="object-cover"
                          width={40}
                          height={40}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-600">
                            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'G'}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                  {activeDropdown === "profile" && <ProfileDropdown user={user} />}
                </div>
              </>
            ) : (
              <>
                {/* Hamburger menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "menu" ? null : "menu"
                      )
                    }
                      className={`p-2 rounded-full bg-gray-100 text-[#777E90] hover:text-black hover:bg-gray-50
                         ${i18n.language === "ar" ?" mr-2":" mr-0"}
                        `}
                  >
                    {activeDropdown === "menu" ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                  {activeDropdown === "menu" && (
                     <div className={ `absolute top-14  mt-2 w-64 bg-white shadow-lg rounded-2xl p-4 z-50
                
                ${i18n.language === "ar" ? "left-6 md:left-6 lg:-left-10 2xl:-right-60" : "right-6 md:right-6 lg:-right-8 2xl:-left-62"}
                `}>
                  {/* Help Center */}
                  <Link
                    href="/help"
                    className={`flex items-center space-x-2  py-2  rounded-xl text-sm text-[#23262F] hover:bg-gray-50 transition-colors duration-200
                       ${i18n.language === "ar" ?" pr-0":" pl-2"}
                      `}
                  >
                    <HelpCircle className="h-5 w-5 text-gray-600 " />
                    <span className={`font-bold 
                       ${i18n.language === "ar" ?" pr-2":"pr-0 "}
                      `}>
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
                    className={`block px-4 py-2 mt-2  w-full  rounded-xl font-bold text-sm text-[#23262F] hover:bg-gray-50 transition-colors duration-200 cursor-pointer
                       ${i18n.language === "ar" ? " text-right lg:text-right  " : " text-left lg:text-left "}
                      `}
                  >
                    {t("auth_navbar.login_signup")}
                  </button>
                </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modals */}
      <AuthModals />
    </nav>
  );
};

export default Navbar;