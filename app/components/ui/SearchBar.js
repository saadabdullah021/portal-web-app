'use client';
import { Navigation, UserRound, Calendar, Minus, Plus } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DateInput from './DateInput';

const SearchBar = ({ onSearch }) => {
   const { i18n, t } = useTranslation("hero");
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isMobile, setIsMobile] = useState(false);
// NEW: Track if location already selected
const [locationSelected, setLocationSelected] = useState(false);

  // Travelers state
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Track active dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);

  const travelersRef = useRef(null);
  const locationRef = useRef(null);

  // Dummy locations
  const dummyLocations = useMemo(() => [
    "Al Ula, Medina Province",
    "Al Ulaiyah, Riyadh",
    "Al Ulays, Jeddah",
    "Al Ujeir, Dammam",
    "Al Uqair, Eastern Province",
    "Al Wajh, Tabuk",
    "Al Wakrah, Qatar", 
  ], []);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debounced filter for location
  const [suggestions, setSuggestions] = useState([]);
useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (location.length > 1 && !locationSelected) {   // ✅ Only when not selected
      const filtered = dummyLocations.filter(item =>
        item.toLowerCase().includes(location.toLowerCase())
      );
      setSuggestions(filtered);
      if (filtered.length > 0) {
        setActiveDropdown("location");
      }
    } else {
      setSuggestions([]);
      if (activeDropdown === "location") setActiveDropdown(null);
    }
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [location, dummyLocations, locationSelected]);


  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        travelersRef.current && !travelersRef.current.contains(event.target) &&
        locationRef.current && !locationRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleSelect = (place) => {
  setLocation(place);
  setLocationSelected(true);    // Mark as selected
  setSuggestions([]);           // ✅ Clear suggestions
  setActiveDropdown(null);      // ✅ Close dropdown
};


  const totalTravelers = adults + children + infants;

  const handleSearch = () => {
    const searchData = {
      location,
      checkIn,
      checkOut,
      travelers: totalTravelers || 1,
      adults,
      children,
      infants
    };
    if (onSearch) onSearch(searchData);
  };

  return (
    <div className="relative rounded-3xl bg-white/80 backdrop-blur-sm p-4 lg:p-6 shadow-lg lg:absolute lg:left-1/2 lg:top-[98%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4">
        
        {/* Location */}
        <div className=" relative" ref={locationRef}>
          <div
            className={`rounded-xl p-3 lg:p-0 transition-all duration-300 ease-in-out
              ${activeDropdown === "location" ? "lg:shadow-2xl lg:rounded-full lg:px-3 bg-white" : "lg:bg-transparent hover:bg-gray-100   lg:rounded-full lg:px-3" } 
              bg-white/60`}
          >
            <div
              className="flex items-start gap-2 cursor-pointer"
              onClick={() =>
                setActiveDropdown(activeDropdown === "location" ? null : "location")
              }
            >
              <Navigation color="#B1B5C3" size={24} className="lg:mt-4" />
              <div className="flex flex-col w-full">
                <label className="text-lg lg:text-[24px] text-[#23262F] font-semibold pl-2 pt-2 mb-1 hidden lg:block">
                  {t("locationLabel")}
                </label>
                <input
                  type="text"
                  value={location}
                    onChange={(e) => {
    setLocation(e.target.value);
    setLocationSelected(false); // NEW: reset when user types again
  }}
                  
               onFocus={() => {
    if (!locationSelected) { // NEW: sirf tab khole jab selected nahi hai
      setActiveDropdown("location");
    }}}
                  placeholder={
                    isMobile
                      ? t("locationPlaceholderMobile")
                      : t("locationPlaceholderDesktop")
                  }
                  className="w-full bg-transparent border-none rounded-md px-3 lg:placeholder-[#777E90] outline-none placeholder-[#23262F] placeholder:font-medium placeholder:text-[16px]  lg:pb-1"
                />
              </div>
            </div>
          </div>

          {/* Suggestions dropdown */}
          <div className={`
            absolute custom-scrollbar-hide  z-100 bg-[#FCFCFD] shadow-xl rounded-3xl lg:top-30 max-h-[300px] w-full lg:w-auto  overflow-y-auto p-3
            transition-all duration-300 ease-in-out origin-top 
            ${i18n.language === "ar" ? "lg:-right-6" : "lg:-right-11"}
            ${activeDropdown === "location" && suggestions.length > 0 
              ? "opacity-100 scale-100 translate-y-0 " 
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none "
            }
          `}>
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item)}
                className="px-2 py-3 cursor-pointer hover:bg-[#F4F5F6] flex items-center space-x-2 rounded-xl transition-colors duration-200"
              >
                <span className='bg-[#FCFCFD] border-[#E6E8EC] border-[1px] rounded-full w-8 h-8 flex items-center justify-center'>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.6665 13.3333C13.0347 13.3333 13.3332 13.0348 13.3332 12.6666C13.3332 12.2984 13.0347 12 12.6665 12C12.2983 12 11.9998 12.2984 11.9998 12.6666C11.9998 13.0348 12.2983 13.3333 12.6665 13.3333ZM12.6665 14.6666C13.7711 14.6666 14.6665 13.7712 14.6665 12.6666C14.6665 11.5621 13.7711 10.6666 12.6665 10.6666C11.5619 10.6666 10.6665 11.5621 10.6665 12.6666C10.6665 13.7712 11.5619 14.6666 12.6665 14.6666Z" fill="#777E91"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.3332 2.66671C9.4127 2.66671 8.6665 3.4129 8.6665 4.33337V11.6667C8.6665 13.3236 7.32336 14.6667 5.6665 14.6667C4.00965 14.6667 2.6665 13.3236 2.6665 11.6667V6.66671C2.6665 6.29852 2.96498 6.00004 3.33317 6.00004C3.70136 6.00004 3.99984 6.29852 3.99984 6.66671V11.6667C3.99984 12.5872 4.74603 13.3334 5.6665 13.3334C6.58698 13.3334 7.33317 12.5872 7.33317 11.6667V4.33337C7.33317 2.67652 8.67632 1.33337 10.3332 1.33337C11.99 1.33337 13.3332 2.67652 13.3332 4.33337V8.66671C13.3332 9.0349 13.0347 9.33337 12.6665 9.33337C12.2983 9.33337 11.9998 9.0349 11.9998 8.66671V4.33337C11.9998 3.4129 11.2536 2.66671 10.3332 2.66671Z" fill="#777E91"/>
                    <path d="M2.75762 1.65387C3.01488 1.21287 3.65208 1.21287 3.90933 1.65387L5.08197 3.66412C5.34123 4.10856 5.02065 4.6667 4.50612 4.6667H2.16083C1.64631 4.6667 1.32573 4.10855 1.58498 3.66412L2.75762 1.65387Z" fill="#777E91"/>
                  </svg>
                </span>
                <span className="text-[16px] font-medium lg:min-w-[250px] text-[#23262F]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Check In */}
        <div className="">
          <div
            className={`rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "checkIn" ? "lg:shadow-2xl lg:rounded-full lg:px-3 bg-white" : "lg:bg-transparent hover:bg-gray-100   lg:rounded-full lg:px-3" } 
              bg-white/60`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "checkIn" ? null : "checkIn")
            }
          >
            <DateInput
              label={t('checkIn')}
              icon={Calendar}
              value={checkIn}
              onChange={setCheckIn}
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="">
          <div
            className={`rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "checkOut" ? "lg:shadow-2xl lg:rounded-full lg:px-3 bg-white" : "lg:bg-transparent hover:bg-gray-100   lg:rounded-full lg:px-3 "} 
              bg-white/60`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "checkOut" ? null : "checkOut")
            }
          >
            <DateInput
              label={t('checkOut')}
              icon={Calendar}
              value={checkOut}
              onChange={setCheckOut}
            />
          </div>
        </div>

        {/* Travelers */}
        <div className=" relative pt-1" ref={travelersRef}>
          <div
            className={`lg:flex-1 rounded-xl p-3 lg:p-0 cursor-pointer transition-all duration-300 ease-in-out
              ${activeDropdown === "travelers" ? "lg:shadow-2xl lg:rounded-full lg:px-3 bg-white " : "lg:bg-transparent hover:bg-gray-100   lg:rounded-full lg:px-3 "} 
              bg-white/60`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "travelers" ? null : "travelers")
            }
          >
            <div className="flex items-start space-x-2">
              <UserRound color='#B1B5C3' size={24} className='mt-0 lg:mt-2.5'/>
              <div className="flex flex-col w-full">
                <label className="text-lg lg:text-[24px]  font-semibold pl-2 pt-2 lg:pt-1 mb-1 hidden lg:block">
                  {t('travelers')}
                </label>
                <span className="px-3 text-[#23262F] lg:pb-1 lg:text-[#777E90] text-[16px] font-medium">
                  {totalTravelers > 0 ? `${totalTravelers} ${t('guestsPlaceholder')} ` : t('guestsPlaceholder')}
                </span>
              </div>
            </div>
          </div>

          {/* Travelers Popup */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              absolute z-50 bg-[#FCFCFD] shadow-xl bottom-12 lg:-bottom-77 rounded-3xl max-h-[300px] w-full lg:min-w-[420px] overflow-y-auto p-8 space-y-6
              transition-all duration-300 ease-in-out origin-top
              ${i18n.language === "ar" ? "right-0 lg:-right-20" : "right-0 lg:-right-24"}
              ${activeDropdown === "travelers" 
                ? "opacity-100 scale-100 translate-y-0" 
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }
            `}
          >
            {/* Adults */}
            <div className="flex items-center justify-between border-b pb-3 border-gray-300">
              <div>
                <p className="font-medium text-[16px] text-gray-900">
                  {t('Adults')}
                </p>
                <p className="text-[12px] text-gray-500">
                  {t('Ages 13 and above')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setAdults(Math.max(0, adults - 1))} 
                  className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                >
                  <Minus size={16} color='#B1B5C3' className="hover:#3B71FE"/>
                </button>
                <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{adults}</span>
                <button 
                  onClick={() => setAdults(adults + 1)} 
                  className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                >
                  <Plus size={16} color='#B1B5C3' className="hover:#3B71FE"/>
                </button>
              </div>
            </div>
            {/* Children */}
            <div className="flex items-center justify-between border-b pb-3 border-gray-300">
              <div>
                <p className="font-medium text-[16px] text-gray-900">
                  {t('Children')}
                </p>
                <p className="text-[12px] text-gray-500">
                  {t('Ages 2 - 12')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setChildren(Math.max(0, children - 1))} 
                  className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                >
                  <Minus size={16} color='#B1B5C3'/>
                </button>
                <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{children}</span>
                <button 
                  onClick={() => setChildren(children + 1)} 
                  className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                >
                  <Plus size={16} color='#B1B5C3'/>
                </button>
              </div>
            </div>
            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[16px] text-gray-900">
                  {t('Infants')}
                </p>
                <p className="text-[12px] text-gray-500">
                  {t('Under 2 years')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setInfants(Math.max(0, infants - 1))} 
                  className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                >
                  <Minus size={16} color='#B1B5C3'/>
                </button>
                <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{infants}</span>
                <button 
                  onClick={() => setInfants(infants + 1)} 
                  className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full transition-colors duration-200 hover:border-[#3B71FE]"
                >
                  <Plus size={16} color='#B1B5C3'/>
                </button>
              </div>
            </div>
          </div>


        </div>

<div className='flex items-center justify-center lg:justify-end'>
            {/* Button */}
          <button 
            onClick={handleSearch}
            className="w-full lg:w-auto bg-[#3B71FE] hover:bg-blue-700 rounded-full py-4 lg:p-4 px-6 flex items-center justify-center transition-colors duration-300"
          >
            <span className="text-white font-medium lg:hidden">{t('search')}</span>
            <svg width="24" height="24" className='hidden lg:block' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fill="#FCFCFD"/>
            </svg>
          </button>
</div>

      </div>
    </div>
  );
};

export default SearchBar;