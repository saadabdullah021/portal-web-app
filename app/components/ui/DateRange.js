"use client"
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Edit } from "lucide-react";

const DateRange = ({ label = "Dates", value = {}, onChange }) => {
  const { t, i18n } = useTranslation("checkout");
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(value?.checkIn ? new Date(value.checkIn) : null);
  const [rangeEnd, setRangeEnd] = useState(value?.checkOut ? new Date(value.checkOut) : null);

  // Sync internal state with value prop changes
  useEffect(() => {
    if (value?.checkIn) {
      setRangeStart(new Date(value.checkIn));
    }
    if (value?.checkOut) {
      setRangeEnd(new Date(value.checkOut));
    }
  }, [value?.checkIn, value?.checkOut]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const calendarRef = useRef(null);
  const isRTL = i18n.language === "ar";

  // check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // close outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const weekDays = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
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

  const isDateDisabled = (date) => {
    if (!date) return true;
    const t = new Date();
    t.setHours(0,0,0,0);
    return date < t;
  };

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      // reset range
      setRangeStart(date);
      setRangeEnd(null);
    } else if (rangeStart && !rangeEnd) {
      if (date >= rangeStart) {
        setRangeEnd(date);
        onChange?.({
          checkIn: rangeStart.toISOString().split("T")[0],
          checkOut: date.toISOString().split("T")[0],
        });
        setIsOpen(false);
      } else {
        // clicked before start → reset
        setRangeStart(date);
      }
    }
  };

  const isInRange = (date) => {
    if (!rangeStart || (!rangeEnd && !hoveredDate)) return false;
    const end = rangeEnd || hoveredDate;
    return date >= rangeStart && date <= end;
  };

  const formatDisplay = () => {
    if (rangeStart && rangeEnd) {
      return `${rangeStart.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })} – ${rangeEnd.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}`;
    }
    return t("Add_date");
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
            if (!date) return <div key={index} className="h-8 lg:h-10"></div>;

            const isDisabled = isDateDisabled(date);
            const isSelected = (rangeStart && date.toDateString() === rangeStart.toDateString()) || (rangeEnd && date.toDateString() === rangeEnd.toDateString());
            const inRange = isInRange(date);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => !isDisabled && setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isDisabled}
                className={`
                  h-8 w-8 lg:h-10 lg:w-10 rounded-full text-[12px] lg:text-[14px] font-medium transition-all duration-200
                  ${isDisabled ? "text-[#B1B5C3] cursor-not-allowed" : "cursor-pointer"}
                  ${inRange ? "bg-black text-white" : ""}
                  ${isSelected ? "bg-[#222222] text-white" : ""}
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
    <div className="w-full" ref={calendarRef}>
      {/* Display Block */}
      <div
        className="flex flex-col items-start p-4 bg-[#F4F5F6] rounded-xl w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs text-[#777E90]">{t('Dates')}</span>
        <div className="flex items-center justify-between w-full lg:gap-1 2xl:gap-0">
          <span className="font-medium whitespace-nowrap text-[#23262F] text-[16px]">
            {formatDisplay()}
          </span>
          <Edit className="w-4 h-4 text-gray-400 " />
        </div>
      </div>

      {/* Calendar Popup */}
      <div
        className={`
          absolute z-50 mt-2 bg-white rounded-3xl shadow-2xl border border-[#E6E8EC] p-4 lg:p-6
          transition-all duration-300 ease-in-out origin-top
          ${isMobile ? "max-w-auto w-[85vw] left-8" : "min-w-[340px]"}
          ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <button
            onClick={(e) => { e.stopPropagation(); navigateMonth(-1); }}
            className="p-2 rounded-full hover:bg-[#F4F5F6]"
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
          <h3 className="text-[16px] font-semibold text-[#23262F] flex-1 text-center">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={(e) => { e.stopPropagation(); navigateMonth(1); }}
            className="p-2 rounded-full hover:bg-[#F4F5F6]"
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

        {renderCalendar(0)}
      </div>
    </div>
  );
};

export default DateRange;
