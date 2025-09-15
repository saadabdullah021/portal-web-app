import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const DateInput = ({ label, value, onChange, isCheckout = false, checkInDate = null, onCheckInChange = null,
  dropdownPosition = "",
  dropdownAlign = "",
}) => {
  const { t, i18n } = useTranslation("home");
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkInSelection, setCheckInSelection] = useState(checkInDate ? new Date(checkInDate) : null);
  const [checkOutSelection, setCheckOutSelection] = useState(value ? new Date(value) : null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [today, setToday] = useState(new Date());
  const calendarRef = useRef(null);
  const isRTL = i18n.language === "ar";

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (checkInDate) {
      setCheckInSelection(new Date(checkInDate));
    }
    if (value) {
      setCheckOutSelection(new Date(value));
    }
  }, [value, checkInDate]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Store today for highlight
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;

    if (isCheckout) {
      setCheckOutSelection(date);
    } else {
      setCheckInSelection(date);
    }

    onChange(date.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDisplayDate = (date) => {
    if (!date) return t("search.Add_date");
    return date.toLocaleDateString(
      i18n.language === "ar" ? "ar-EG" : "en-GB"
    );
  };


  const getSelectedDate = () => {
    if (isCheckout) {
      return value ? new Date(value) : null;
    }
    return value ? new Date(value) : null;
  };

  const renderCalendar = (monthOffset = 0) => {
    const displayMonth = new Date(currentMonth);
    displayMonth.setMonth(currentMonth.getMonth() + monthOffset);
    const days = getDaysInMonth(displayMonth);

    return (
      <div className="flex-1 min-w-0">


        <div className="grid grid-cols-7 gap-1 my-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-[12px] font-medium text-[#777E90] h-8 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-8 lg:h-10"></div>;
            }

            const isSelected = getSelectedDate() && date.toDateString() === getSelectedDate().toDateString();
            const isDisabled = isDateDisabled(date);
            const isToday = today && date.toDateString() === today.toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => !isDisabled && setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isDisabled}
                className={`
                  h-8 w-8 lg:h-10 lg:w-10 rounded-full text-[12px] lg:text-[14px] font-medium transition-all duration-200 relative
                  ${isDisabled
                    ? 'text-[#B1B5C3] cursor-not-allowed'
                    : 'cursor-pointer hover:bg-gray-100'
                  }
        ${isSelected
                    ? 'bg-[#222222] text-white hover:bg-[#222222] hover:text-[#222222]'
                    : isToday && !getSelectedDate()
                      ? 'border border-[#222222] bg-[#222222] text-white hover:text-black hover:bg-[#222222]'
                      : 'text-[#23262F]'
                  }

                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-start space-x-2 mt-1    relative " ref={calendarRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Calendar Icon */}
      <svg width="24" height="24" className="mt-2 lg:mt-3 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19 6H5C4.44772 6 4 6.44772 4 7V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V7C20 6.44771 19.5523 6 19 6ZM5 4C3.34315 4 2 5.34315 2 7V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V7C22 5.34315 20.6569 4 19 4H5Z" fill="#B1B5C4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14H17C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12H10ZM7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H7Z" fill="#B1B5C4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M7 2C6.44772 2 6 2.44772 6 3V7C6 7.55228 6.44772 8 7 8C7.55228 8 8 7.55228 8 7V3C8 2.44772 7.55228 2 7 2ZM17 2C16.4477 2 16 2.44772 16 3V7C16 7.55228 16.4477 8 17 8C17.5523 8 18 7.55228 18 7V3C18 2.44772 17.5523 2 17 2Z" fill="#B1B5C4" />
      </svg>

      {/* Input Field */}
      <div className="flex flex-col w-full">
        <label className={`text-[16px] cursor-pointer  font-medium lg:text-[24px] lg:text-[#23262F] lg:font-semibold pl-2 pt-2 mb-1
            ${i18n.language === "ar" ? "pr-3  whitespace-nowrap  lg:pr-2" : "pr-0 "}
          `}>
          {label}
        </label>

        <div

          className="w-full bg-transparent lg:pb-1 px-3 py-0 text-[#777E90] placeholder-[#777E90] text-[16px] font-medium outline-none cursor-pointer"
        >
          {formatDisplayDate(getSelectedDate())}
        </div>

        {/* Custom Calendar */}

        <div className={`
            absolute z-50   mt-2 bg-white rounded-3xl shadow-2xl border border-[#E6E8EC] p-4 lg:p-6
        transition-all duration-300 ease-in-out origin-top
         
            ${isMobile
            ? 'max-w-auto w-[70vw] sm:w-[85vw] -left-4  mx-auto'
            : 'min-w-[340px]'
          }
          ${dropdownPosition}
          ${dropdownAlign}
       


         ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
            
          `}>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateMonth(-1);
              }}
              className="p-2 rounded-full hover:bg-[#F4F5F6] transition-colors"
            >
              {isRTL ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#23262F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="#23262F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* Month-Year Title */}
            <h3 className="text-[16px] font-semibold text-[#23262F] flex-1 text-center">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateMonth(1);
              }}

              className="p-2 rounded-full hover:bg-[#F4F5F6] transition-colors"
            >
              {isRTL ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="#23262F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#23262F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>


          {/* Calendar Grid */}
          <div className={`${isMobile ? 'block' : 'flex space-x-8'}`}>
            {isMobile ? (
              renderCalendar(0)
            ) : (
              renderCalendar(0) // Only one month now
            )}
          </div>

          {/* Mobile: Show selection info */}
          {isMobile && getSelectedDate() && (
            <div className="mt-4 p-3 bg-[#F7F7F7] rounded-xl">
              <div className="text-[12px] text-[#777E90] space-y-1">
                <div>Selected: {formatDisplayDate(getSelectedDate())}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DateInput;
