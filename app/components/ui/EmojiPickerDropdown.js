"use client";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { SmileIcon } from "lucide-react";

const EmojiPickerDropdown = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);

  // ✅ Outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle emoji select
  const handleEmojiClick = (emojiObject) => {
    onEmojiSelect(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
           <SmileIcon size={20} />
      </button>

      {/* Dropdown */}
      {showEmojiPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-12 right-0 z-50 w-80 rounded-xl shadow-lg  bg-white"
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width="100%"
            height={300}
            searchDisabled={true}
            skinTonesDisabled={true}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerDropdown;
