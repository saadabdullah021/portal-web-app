"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import notificationImage from '../../../public/images/hostImage.png';

const placeholderAvatar = notificationImage;

const notifications = [
  {
    id: 1,
    name: "Ahmed Taha",
    message: "just sent you a message",
    time: "1 minute ago",
    avatar: placeholderAvatar,
    unread: true,
  },
  {
    id: 2,
    name: "Ahmed Taha",
    message: "Confirmed your booking",
    time: "1 minute ago",
    avatar: placeholderAvatar,
    unread: true,
  },
];

const NotificationDropdown = () => {
  const { i18n } = useTranslation();

  return (
 <div
      className={`
        bg-white shadow-lg border border-gray-100 py-2 z-50

        
        fixed top-16 left-0 w-full  h-[40%]

        
        md:fixed-none 
        md:w-92 md:h-88 md:rounded-3xl
      md:absolute lg:absolute
        ${i18n.language === "ar" ? "md:top-16 md:-left-8 lg:-right-68 xl:-right-58 lg:top-16" : " md:top-16 md:-left-70 lg:-left-62 xl:-left-56  lg:top-16 "}
      `}
    >

      <div className="p-8">
        <h3 className="text-2xl font-semibold text-[#23262F]">
          {i18n.language === "ar" ? "الإشعارات" : "Notifications"}
        </h3>
      </div>
      <div className="max-h-84 w-[350px] overflow-y-auto pb-8">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-6 hover:bg-gray-50 transition-colors duration-200
              ${i18n.language === "ar" ? "flex-row-reverse text-right" : "flex-row text-left"}`}
          >
            {/* Avatar */}
            <div className="w-[48px] h-[48px] rounded-full flex-shrink-0">
              <Image
                src={item.avatar}
                alt={item.name}
                className="rounded-full h-full w-full object-fill"
              />
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-[16px] font-medium text-gray-900">{item.name}</p>
              <p className="text-[14px] text-[#777E90]">{item.message}</p>
              <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>

            {/* Unread dot */}
            {item.unread && (
              <span className="h-3 w-3 bg-blue-500 rounded-full mt-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
