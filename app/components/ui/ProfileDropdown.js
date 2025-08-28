"use client";
import React from "react";
import {
  MessageSquare,
  Home,
  Heart,
  Settings,
  Info,
  LogOut,
} from "lucide-react";

const menuItems = [
  { id: 1, label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
  { id: 2, label: "Bookings", icon: <Home className="w-5 h-5" /> },
  { id: 3, label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
  { divider: true },
  { id: 4, label: "Settings", icon: <Settings className="w-5 h-5" /> },
  { id: 5, label: "Support", icon: <Info className="w-5 h-5" /> },
];

const ProfileDropdown = () => {
  return (
    <div
      className={`
        bg-white shadow-lg border border-gray-100 py-2 z-50

        /* Mobile: fixed half screen */
        fixed top-16 left-0 w-full rounded-r-2xl h-[40%]

        
        md:fixed-none md:absolute md:top-14 md:-right-10 lg:-left-52 lg:absolute lg:top-16 
        md:w-74 md:h-85 md:rounded-3xl
      `}
    >
      <div className="px-2">
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr key={`divider-${index}`} className="my-2 border-gray-200" />
          ) : (
            <a
              href="#"
              key={item.id}
              className="flex items-center space-x-3  pr-3 pl-5 font-bold font-dm-sans py-[15px] text-sm text-[#777E90] hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              {item.icon}
              <span className="space-y-12">{item.label}</span>
            </a>
          )
        )}

        {/* Logout Button */}
        <button className="w-full mt-2 flex items-center justify-center lg:mx-auto px-2 py-2 font-bold text-sm text-[#23262F] border-[1.5px] border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200">
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
