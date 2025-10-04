'use client'

import React, { useState } from 'react';
import {
  Star,
  ArrowLeft,
} from 'lucide-react';

const MessagesCenter = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showBookingCard, setShowBookingCard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sample messages data - replace with API integration
  const messages = [
    {
      id: 1,
      name: "Faisal Ghanem",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "18:30",
      lastMessage: "Ullamcorper tortor id bib eualed vivamus eget moti...",
      conversation: [
        { id: 1, sender: "other", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pelle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pelle", time: "18:30" },
        { id: 2, sender: "me", message: "consectetur adipiscing elit. Pelle?", time: "18:30" },
        { id: 3, sender: "me", message: "Lorem ipsum dolor sit amet", time: "" },
        { id: 4, sender: "other", message: "ullamcorper tortor id bibendum tincidunt. Vivamus eget molestie", time: "" }
      ]
    },
    {
      id: 2,
      name: "Faisal",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "17:20",
      lastMessage: "Hey, kal milte hain office me!",
      conversation: [
        { id: 1, sender: "other", message: "Hello, kya haal hai?", time: "17:10" },
        { id: 2, sender: "me", message: "Sab theek, tum sunao?", time: "17:12" },
        { id: 3, sender: "other", message: "Bas thik hu, kal ka plan confirm?", time: "17:15" },
        { id: 4, sender: "me", message: "Haan bilkul, kal milte hain office me.", time: "17:20" }
      ]
    },
    {
      id: 3,
      name: "Asad",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "16:45",
      lastMessage: "Code ka issue solve ho gaya!",
      conversation: [
        { id: 1, sender: "me", message: "Project ka kya scene hai?", time: "16:30" },
        { id: 2, sender: "other", message: "Code mein ek error tha, abhi fix kar diya.", time: "16:40" },
        { id: 3, sender: "me", message: "Great, ab test karna?", time: "16:45" }
      ]
    },
    {
      id: 4,
      name: "Saad",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "15:10",
      lastMessage: "Chalo match khelte hain!",
      conversation: [
        { id: 1, sender: "other", message: "Free ho?", time: "15:00" },
        { id: 2, sender: "me", message: "Haan free hu, kya plan hai?", time: "15:05" },
        { id: 3, sender: "other", message: "Chalo match khelte hain!", time: "15:10" }
      ]
    },
    {
      id: 5,
      name: "Mobeen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "14:00",
      lastMessage: "Assignment bhej diya hai!",
      conversation: [
        { id: 1, sender: "me", message: "Assignment complete kar liya?", time: "13:45" },
        { id: 2, sender: "other", message: "Haan bhej diya hai, check kar lena.", time: "14:00" }
      ]
    },
    {
      id: 6,
      name: "Behroz",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "13:20",
      lastMessage: "Kal meeting confirm hai.",
      conversation: [
        { id: 1, sender: "me", message: "Kal ki meeting confirm hai?", time: "13:10" },
        { id: 2, sender: "other", message: "Haan confirm hai 10 baje.", time: "13:20" }
      ]
    },
    {
      id: 7,
      name: "Ali",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "12:00",
      lastMessage: "Coffee pe milte hain.",
      conversation: [
        { id: 1, sender: "other", message: "Aaj free ho?", time: "11:50" },
        { id: 2, sender: "me", message: "Haan free hu, plan?", time: "11:55" },
        { id: 3, sender: "other", message: "Coffee pe milte hain.", time: "12:00" }
      ]
    },
    {
      id: 8,
      name: "Hassan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "11:40",
      lastMessage: "Files upload kar di hain.",
      conversation: [
        { id: 1, sender: "me", message: "Files bheji?", time: "11:30" },
        { id: 2, sender: "other", message: "Haan, abhi upload kar di hain.", time: "11:40" }
      ]
    },
    {
      id: 9,
      name: "Zain",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "10:15",
      lastMessage: "Ok, milte hain.",
      conversation: [
        { id: 1, sender: "other", message: "Office kab aa rahe ho?", time: "10:05" },
        { id: 2, sender: "me", message: "Bas 15 min me aa raha hu.", time: "10:10" },
        { id: 3, sender: "other", message: "Ok, milte hain.", time: "10:15" }
      ]
    }
  ];


  const bookingData = {
    title: "2-Bed Luxury Villa in Al-Rawdah",
    host: "Faisal A.",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    date: "May 15, 2026",
    guests: "2 guests",
    rating: 4.8,
    reviews: 256,
    beds: 2,
    baths: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper tortor id bibendum"
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  };

  const handleBackToMessages = () => {
    setSelectedMessage(null);
    setIsMobile(false);
  };

  const handleSeeBooking = () => {
    setShowBookingCard(true);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex max-w-6xl 2xl:max-w-[1450px] mx-auto  px-8 lg:px-6 2xl:px-8  pb-8 lg:pb-12">
      {/* Mobile View */}
      <div className="lg:hidden w-full bg-white flex flex-col">
        {!selectedMessage ? (
          <>
            {/* Mobile Booking Card Header */}

            {/* Mobile Messages Header */}
            <div className="py-6 px-2 ">
              <h1 className="text-2xl font-semibold text-[#23262F]">Messages center</h1>
            </div>

            {/* Mobile Messages List */}
            <div className="flex-1 max-h-[400px] custom-scrollbar-hide overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className="flex items-start pl-6 py-6 mr-8 rounded-2xl hover:bg-[#F4F5F6] cursor-pointer border-b border-gray-100"
                >
                  <img
                    src={message.avatar}
                    alt={message.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-[#23262F] text-[16px]  truncate">{message.name}</h3>
                      <span className="text-xs text-[#777E90] ml-2">{message.time}</span>
                    </div>
                    <p className="text-xs text-[#777E90] ">{message.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Mobile Conversation View */
          <>
            {/* Mobile Conversation Header */}
            <div className="py-6  flex items-center">
              <button
                onClick={handleBackToMessages}
                className="mr-3 p-1"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl  text-[#23262F]">{selectedMessage.name}</h2>
            </div>

            {/* Mobile Booking Card */}
            <div className="px-0 py-6">
              <div className="flex items-center space-x-3 bg-[#F4F5F6] rounded-2xl p-3 ">
                <img
                  src={bookingData.image}
                  alt={bookingData.title}
                  className="w-[110px] h-[98px] object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#353945] mb-1">{bookingData.date}</p>
                  <h3 className="text-[16px] font-medium text-[#23262F]">
                    {bookingData.title}
                  </h3>
                  <button className="text-xs font-semibold  text-[#777E90] underline mt-1">
                    View booking →
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Date Header */}
            <div className="p-4 text-center">
              <span className="inline-block text-xs text-[#23262F] font-semibold">
                May 12, 2026
              </span>
            </div>

            {/* Mobile Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedMessage.conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'other' && (
                    <img
                      src={selectedMessage.avatar}
                      alt={selectedMessage.name}
                      className="w-[38px] h-[38px] rounded-full mr-2 mt-2"
                    />
                  )}
                  <div
                    className={`max-w-xs  ${msg.sender === 'me'
                      ? 'bg-[#3B71FE] rounded-[32px] text-white px-6 py-4 text-sm'
                      : 'bg-[#F4F5F6] text-[#141416] text-sm  rounded-2xl p-6'
                      }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    {msg.time && (
                      <span className={`text-xs block mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                        }`}>

                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Message Input */}
            <div className=" p-4">
              <div className="w-full max-w-2xl">
                {/* Message Input Container */}
                <div className="flex items-center space-x-3 p-2 rounded-[90px] border-2 border-[#E6E8EC]">
                  {/* Attachment Button */}
                  <button className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.5 4.16671C0.5 2.32576 1.99238 0.833374 3.83333 0.833374H10.786C11.67 0.833374 12.5179 1.18456 13.143 1.80968L14.5237 3.1904C15.1488 3.81552 15.5 4.66336 15.5 5.54742V15.8334C15.5 17.6743 14.0076 19.1667 12.1667 19.1667H3.83333C1.99238 19.1667 0.5 17.6743 0.5 15.8334V4.16671ZM13.8333 6.66671V15.8334C13.8333 16.7538 13.0871 17.5 12.1667 17.5H3.83333C2.91286 17.5 2.16667 16.7538 2.16667 15.8334V4.16671C2.16667 3.24623 2.91286 2.50004 3.83333 2.50004H9.66667V4.16671C9.66667 5.54742 10.786 6.66671 12.1667 6.66671H13.8333ZM13.7409 5.00004C13.659 4.7647 13.5247 4.54844 13.3452 4.36891L11.9645 2.9882C11.7849 2.80867 11.5687 2.67433 11.3333 2.59249V4.16671C11.3333 4.62694 11.7064 5.00004 12.1667 5.00004H13.7409Z" fill="#B1B5C4" />
                    </svg>

                  </button>

                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type something"
                      className="w-full pr-2 py-2 text-gray-700 placeholder-[#777E90] bg-transparent border-none outline-none text-sm"
                    />
                  </div>

                  {/* Send Button */}
                  <button className="flex-shrink-0 p-1 bg-[#3B71FE] text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0523 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z" fill="#FCFCFD" />
                    </svg>

                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Messages List Column */}
      <div className={`hidden lg:flex ${showBookingCard ? 'w-1/3' : 'w-1/2'} bg-white border-r border-gray-200 flex-col`}>
        <div className=" mt-12 mb-6">
          <h1 className="text-2xl font-semibold text-[#23262F]">Messages center</h1>
        </div>

        <div className="flex-1 max-h-screen custom-scrollbar-hide overflow-y-auto ">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className="flex items-start px-6 py-4 mr-8 rounded-2xl hover:bg-[#F4F5F6] cursor-pointer border-b border-gray-100"
            >
              <img
                src={message.avatar}
                alt={message.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-8 items-center mb-1">
                  <h3 className="font-medium text-[16px] text-[#23262F] truncate">{message.name}</h3>
                  <span className="text-xs  text-[#777E90] ">{message.time}</span>
                </div>
                <p className="text-xs text-[#23262F]  max-w-[150px]">{message.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Conversation Column */}
      <div className={`hidden lg:flex ${showBookingCard ? 'w-[40%]' : 'w-1/2'} bg-white flex-col`}>
        {selectedMessage ? (
          <>
            {/* Desktop Header */}
            {/* <div className="p-4  flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={selectedMessage.avatar}
                  alt={selectedMessage.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <h2 className="font-semibold text-gray-900">{selectedMessage.name}</h2>
              </div>
              <div className="flex items-center space-x-2">
                {!showBookingCard && (
                  <button
                    onClick={handleSeeBooking}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    See Booking
                  </button>
                )}
         
              </div>
            </div> */}

            {/* Desktop Date Header */}
            <div className="flex items-center justify-end mt-12 ">
              {!showBookingCard && (
                <button
                  onClick={handleSeeBooking}
                  className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  See Booking
                </button>
              )}

            </div>
            <div className="p-4 text-center ">
              <span className="inline-block  text-xs font-semibold text-[#23262F]">
                May 12, 2026
              </span>

            </div>


            {/* Desktop Messages */}
            <div className="flex-1 max-h-screen custom-scrollbar-hide overflow-y-auto p-4 space-y-4">
              {selectedMessage.conversation.map((msg) => (
                <div>

                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'other' && (
                      <img
                        src={selectedMessage.avatar}
                        alt={selectedMessage.name}
                        className="w-[38px] h-[38px] rounded-full mr-2 "
                      />
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md  ${msg.sender === 'me'
                        ? 'bg-[#3B71FE] px-6 py-4 text-white rounded-4xl'
                        : 'bg-[#F4F5F6] p-4 text-[#141416]  rounded-2xl'
                        }`}
                    >
                      <p className="text-sm">{msg.message}</p>

                    </div>

                  </div>
                  <div className='text-end'>
                    {msg.time && (
                      <span className={`text-xs font-semibold block mt-1 ${msg.sender === 'me' ? 'text-[0px]' : 'text-[#B1B5C3]'
                        }`}>
                        {msg.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}

            </div>

            {/* Desktop message input */}
            <div className=" p-4">
              <div className="w-full max-w-2xl">
                {/* Message Input Container */}
                <div className="flex items-center space-x-3 p-2 rounded-[90px] border-2 border-[#E6E8EC]">
                  {/* Attachment Button */}
                  <button className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.16671C2.5 2.32576 3.99238 0.833374 5.83333 0.833374H12.786C13.67 0.833374 14.5179 1.18456 15.143 1.80968L16.5237 3.1904C17.1488 3.81552 17.5 4.66336 17.5 5.54742V15.8334C17.5 17.6743 16.0076 19.1667 14.1667 19.1667H5.83333C3.99238 19.1667 2.5 17.6743 2.5 15.8334V4.16671ZM15.8333 6.66671V15.8334C15.8333 16.7538 15.0871 17.5 14.1667 17.5H5.83333C4.91286 17.5 4.16667 16.7538 4.16667 15.8334V4.16671C4.16667 3.24623 4.91286 2.50004 5.83333 2.50004H11.6667V4.16671C11.6667 5.54742 12.786 6.66671 14.1667 6.66671H15.8333ZM15.7409 5.00004C15.659 4.7647 15.5247 4.54844 15.3452 4.36891L13.9645 2.9882C13.7849 2.80867 13.5687 2.67433 13.3333 2.59249V4.16671C13.3333 4.62694 13.7064 5.00004 14.1667 5.00004H15.7409Z" fill="#B1B5C4" />
                      <path d="M10.8327 9.16671C10.8327 8.70647 10.4596 8.33337 9.99935 8.33337C9.53911 8.33337 9.16602 8.70647 9.16602 9.16671V10.8334H7.49935C7.03911 10.8334 6.66602 11.2065 6.66602 11.6667C6.66602 12.1269 7.03911 12.5 7.49935 12.5H9.16602V14.1667C9.16602 14.6269 9.53911 15 9.99935 15C10.4596 15 10.8327 14.6269 10.8327 14.1667V12.5H12.4993C12.9596 12.5 13.3327 12.1269 13.3327 11.6667C13.3327 11.2065 12.9596 10.8334 12.4993 10.8334H10.8327V9.16671Z" fill="#B1B5C4" />
                    </svg>

                  </button>

                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type something"
                      className="w-full pr-2 py-2 text-gray-700 placeholder-[#777E90] bg-transparent border-none outline-none text-sm"
                    />
                  </div>

                  {/* Send Button */}
                  <button className="flex-shrink-0 p-1 bg-[#3B71FE] text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0523 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z" fill="#FCFCFD" />
                    </svg>

                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg">Select a conversation</p>
              <p className="text-sm mt-2">Choose a message from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Booking Card Column */}
      {showBookingCard && (
        <div className="w-[27%] bg-white  pt-16 pb-4 hidden lg:block">
          <div className="  border border-[#E6E8EC] rounded-3xl">
            {/* Property Image */}
            <div className="relative">
              <img
                src={bookingData.image}
                alt={bookingData.title}
                className="w-full h-full object-cover rounded-3xl"
              />
              <button className="absolute top-3 right-3 px-4 py-2 bg-[#FCFCFD] flex items-center gap-2 rounded-full ">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.00065 2.66665C6.69916 2.66665 5.49943 2.77398 4.53646 2.90116C3.6698 3.01562 3.01629 3.66913 2.90183 4.53578C2.77465 5.49875 2.66732 6.69849 2.66732 7.99998C2.66732 9.30147 2.77465 10.5012 2.90183 11.4642C3.01629 12.3308 3.6698 12.9843 4.53646 13.0988C5.49943 13.226 6.69916 13.3333 8.00065 13.3333C9.30214 13.3333 10.5019 13.226 11.4648 13.0988C12.3315 12.9843 12.985 12.3308 13.0995 11.4642C13.2266 10.5012 13.334 9.30147 13.334 7.99998C13.334 6.69849 13.2266 5.49875 13.0995 4.53578C12.985 3.66913 12.3315 3.01562 11.4648 2.90116C10.5019 2.77398 9.30214 2.66665 8.00065 2.66665ZM4.36188 1.57931C2.89735 1.77273 1.7734 2.89668 1.57998 4.36121C1.44701 5.36803 1.33398 6.6275 1.33398 7.99998C1.33398 9.37246 1.44701 10.6319 1.57998 11.6388C1.7734 13.1033 2.89735 14.2272 4.36188 14.4207C5.36871 14.5536 6.62817 14.6666 8.00065 14.6666C9.37313 14.6666 10.6326 14.5536 11.6394 14.4207C13.104 14.2272 14.2279 13.1033 14.4213 11.6388C14.5543 10.6319 14.6673 9.37246 14.6673 7.99998C14.6673 6.6275 14.5543 5.36803 14.4213 4.36121C14.2279 2.89668 13.104 1.77273 11.6394 1.57931C10.6326 1.44634 9.37314 1.33331 8.00065 1.33331C6.62817 1.33331 5.36871 1.44634 4.36188 1.57931Z" fill="#23262F" />
                  <path d="M6.00041 7.33335C6.73679 7.33335 7.33374 6.7364 7.33374 6.00002C7.33374 5.26364 6.73679 4.66669 6.00041 4.66669C5.26403 4.66669 4.66707 5.26364 4.66707 6.00002C4.66707 6.7364 5.26403 7.33335 6.00041 7.33335Z" fill="#23262F" />
                  <path d="M12.0813 8.47155L13.2775 9.66776C13.2362 10.2919 13.176 10.871 13.1095 11.3854L11.1385 9.41436C10.8781 9.15401 10.456 9.15401 10.1957 9.41436L8.74795 10.8621C7.9669 11.6431 6.70057 11.6431 5.91952 10.8621L5.80514 10.7477C5.54479 10.4873 5.12268 10.4873 4.86233 10.7477L3.25629 12.3537C3.07024 12.1015 2.94576 11.7987 2.90158 11.4642C2.87749 11.2818 2.8541 11.0909 2.83203 10.8924L3.91953 9.80488C4.70057 9.02383 5.9669 9.02383 6.74795 9.80488L6.86233 9.91926C7.12268 10.1796 7.54479 10.1796 7.80514 9.91926L9.25286 8.47155C10.0339 7.6905 11.3002 7.6905 12.0813 8.47155Z" fill="#23262F" />
                </svg>

                <span className="text-sm font-bold text-[#23262F] font-dm-sans ml-1">Show all photos</span>
              </button>
            </div>

            {/* Property Details */}
            <div className='px-4 pt-12 pb-2'>
              <h3 className="text-2xl  font-semibold text-[#23262F]  mb-2">
                {bookingData.title}
              </h3>

              <div className="flex items-center mb-4">
                <span className="text-[#777E90] text-sm">Hosted by</span>
                <img
                  src={bookingData.hostAvatar}
                  alt={bookingData.host}
                  className="w-6 h-6 rounded-full mx-2"
                />
                <span className="text-[16px] text-[#23262F] font-medium">{bookingData.host}</span>
              </div>

              {/* Date and Guests */}
              <div className="grid grid-cols-2 gap-2  mb-4  bg-[#F4F5F6] rounded-3xl py-2 h-20 px-2">
                <div className="flex items-center gap-1">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M23 10H9C8.44772 10 8 10.4477 8 11V23C8 23.5523 8.44772 24 9 24H23C23.5523 24 24 23.5523 24 23V11C24 10.4477 23.5523 10 23 10ZM9 8C7.34315 8 6 9.34315 6 11V23C6 24.6569 7.34315 26 9 26H23C24.6569 26 26 24.6569 26 23V11C26 9.34315 24.6569 8 23 8H9Z" fill="#B1B5C4" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M14 16C13.4477 16 13 16.4477 13 17C13 17.5523 13.4477 18 14 18H21C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16H14ZM11 20C10.4477 20 10 20.4477 10 21C10 21.5523 10.4477 22 11 22H17C17.5523 22 18 21.5523 18 21C18 20.4477 17.5523 20 17 20H11Z" fill="#B1B5C4" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 6C10.4477 6 10 6.44772 10 7V11C10 11.5523 10.4477 12 11 12C11.5523 12 12 11.5523 12 11V7C12 6.44772 11.5523 6 11 6ZM21 6C20.4477 6 20 6.44772 20 7V11C20 11.5523 20.4477 12 21 12C21.5523 12 22 11.5523 22 11V7C22 6.44772 21.5523 6 21 6Z" fill="#B1B5C4" />
                  </svg>

                  <div>
                    <p className="text-xs text-[#777E90]">Date</p>
                    <p className="text-[13px] text-[#23262F] font-semibold">{bookingData.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5 17C12.634 17 9.5 20.134 9.5 24V26C9.5 26.5523 9.05228 27 8.5 27C7.94772 27 7.5 26.5523 7.5 26V24C7.5 19.0294 11.5294 15 16.5 15C21.4706 15 25.5 19.0294 25.5 24V26C25.5 26.5523 25.0523 27 24.5 27C23.9477 27 23.5 26.5523 23.5 26V24C23.5 20.134 20.366 17 16.5 17Z" fill="#B1B5C4" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5 15C18.7091 15 20.5 13.2091 20.5 11C20.5 8.79086 18.7091 7 16.5 7C14.2909 7 12.5 8.79086 12.5 11C12.5 13.2091 14.2909 15 16.5 15ZM16.5 17C19.8137 17 22.5 14.3137 22.5 11C22.5 7.68629 19.8137 5 16.5 5C13.1863 5 10.5 7.68629 10.5 11C10.5 14.3137 13.1863 17 16.5 17Z" fill="#B1B5C4" />
                  </svg>

                  <div>
                    <p className="text-xs text-[#777E90]">Guests</p>
                    <p className="text-[13px] text-[#23262F] font-semibold">{bookingData.guests}</p>
                  </div>
                </div>
              </div>

              {/* Rating and Details */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center ">
                  <Star size={16} className="text-yellow-400 fill-current mr-1" />
                  <span className="ml-2 text-sm font-medium text-[#23262F]">{bookingData.rating}</span>
                  <span className="text-[#777E90] text-sm ml-2">({bookingData.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-3 ">
                  <div className="flex items-center ">

                    <span className="text-[#777E90] text-xs">{bookingData.beds} Bed</span>
                  </div>
                  <div className="flex items-center">

                    <span className="text-[#777E90] text-xs">{bookingData.baths} Bath</span>
                  </div>
                </div>
              </div>
              <hr className='text-[#E6E8EC] my-6' />

              {/* Description */}
              <p className="text-sm text-[#777E90] leading-relaxed">
                {bookingData.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesCenter;