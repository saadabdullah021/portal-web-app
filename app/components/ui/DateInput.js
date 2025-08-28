import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export default function DateInput({ label }) {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="flex items-start space-x-2">
      {/* Left side icon */}
      <Calendar size={22} className="mt-3 text-[#B1B5C3]" />
      
      {/* Label + DatePicker */}
      <div className="flex flex-col w-full">
        <label className="text-xl font-semibold pl-2 pt-2 mb-1">{label}</label>
        
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Add date"
          dateFormat="dd/MM/yyyy"
          className="w-full    bg-transparent px-3 py-2 outline-none focus:ring-none text-gray-700 placeholder-gray-400 cursor-pointer"
          calendarClassName="!bg-white  !rounded-2xl !shadow-xl !p-6 !border !border-gray-200"
          dayClassName={(date) => {
            const today = new Date();
            const isToday = date.getDate() === today.getDate() && 
                           date.getMonth() === today.getMonth() && 
                           date.getFullYear() === today.getFullYear();
            
            return `w-10 h-10 flex  items-center justify-center rounded-full mx-0.5 my-0.5 text-sm font-medium transition-all duration-200 cursor-pointer
              ${isToday 
                ? ' text-white ' 
                : 'text-gray-700'
              }`;
          }}
          monthClassName={() => "text-center "}
          weekDayClassName={() => "text-gray-400 text-xs font-medium w-10 h-8 flex items-center justify-center"}
          showPopperArrow={false}
        />
      </div>
    </div>
  );
}