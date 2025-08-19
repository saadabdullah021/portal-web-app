import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({ label, icon: Icon, value, onChange }) {
  return (
    <div className="flex items-start space-x-2">
      {/* Left side icon */}
      {Icon && <Icon size={22} className="mt-3 text-gray-500" />}

      {/* Label + DatePicker */}
      <div className="flex flex-col w-full">
        <label className="text-xl font-semibold pl-2 pt-2 mb-1">
          {label}
        </label>
        <DatePicker
          selected={value}
          onChange={onChange}
          placeholderText="Add date"
          className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-1 outline-none focus:ring-none border-none focus:ring-blue-500 text-gray-700 placeholder-gray-400"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}
