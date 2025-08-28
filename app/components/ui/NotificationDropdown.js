"use client";
import React from "react";
import Image from "next/image";
import notificationImage from '../../../public/images/hostImage.png'
const placeholderAvatar = notificationImage; 
const notifications = [
  {
    id: 1,
    name: "Ahmed Taha",
    message: "just sent you a message",
    time: "1 minute ago",
    avatar: placeholderAvatar, // ✅ ap apni image yahan use karein
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
  return (
    <div className="absolute -right-22 top-14 md:-right-10 lg:-right-25 lg:top-14 mt-2 w-[350px] bg-white shadow-lg rounded-3xl border border-gray-100 z-50">
      <div className="p-8 ">
        <h3 className="text-2xl font-semibold text-[#23262F]">Notifications</h3>
      </div>
      <div className="max-h-84 w-[350px] overflow-y-auto pb-8">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-[48px] h-[48px]  rounded-full">
              <Image
                src={item.avatar}
                alt={item.name}
               
                className="rounded-full h-full w-full object-fill"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-[16px] font-medium text-gray-900">{item.name}</p>
              <p className="text-[14px] text-gray-600">{item.message}</p>
              <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>
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
