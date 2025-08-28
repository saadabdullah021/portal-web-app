'use client';
import { Navigation, UserRound, Calendar, Minus, Plus } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DateInput from './DateInput';

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation('hero');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // For dropdown (Location)
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Travelers popup
  const [showTravelers, setShowTravelers] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const travelersRef = useRef(null);

  // Dummy locations (replace with API later)
const dummyLocations = useMemo(() => [
  "Al Ula, Medina Province",
  "Al Ulaiyah, Riyadh",
  "Al Ulays, Jeddah",
  "Al Ujeir, Dammam",
  "Al Uqair, Eastern Province"
], []);
  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debounced filter from dummy data
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (location.length > 1) {
        const filtered = dummyLocations.filter(item =>
          item.toLowerCase().includes(location.toLowerCase())
        );
        setSuggestions(filtered);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [location, dummyLocations]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (travelersRef.current && !travelersRef.current.contains(event.target)) {
        setShowTravelers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place) => {
    setLocation(place);
    setShowDropdown(false);
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Location */}
        <div className="lg:col-span-1 relative">
          <div className="lg:bg-transparent bg-white/60 rounded-xl p-3 lg:p-0">
            <div className="flex items-start space-x-2">
              <Navigation color="#B1B5C3" size={20} className=" lg:mt-3" />
              <div className="flex flex-col w-full">
                <label className="text-lg lg:text-xl font-semibold pl-2 pt-2 mb-1 hidden lg:block">
                  {t('locationLabel')}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => location.length > 1 && setShowDropdown(true)}
                  placeholder={isMobile ? t('locationPlaceholderMobile') : t('locationPlaceholderDesktop')}
                  className="w-full bg-transparent border-none rounded-md px-3 outline-none placeholder-gray-700 lg:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Suggestions dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-50 bg-[#FCFCFD] shadow-lg rounded-3xl bottom-18 lg:bottom-24 max-h-[300px] w-full lg:min-w-[500px] overflow-y-auto p-3">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-3 cursor-pointer hover:bg-[#F4F5F6] flex items-center space-x-2 rounded-xl"
                >
                  <Navigation size={16} className="text-gray-400" />
                  <span className="text-[16px] font-medium text-[#23262F]">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check In */}
        <div className="lg:col-span-1">
          <div className="lg:bg-transparent bg-white/60 rounded-xl p-3 lg:p-0">
            <DateInput
              label={t('checkIn')}
              icon={Calendar}
              value={checkIn}
              onChange={setCheckIn}
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="lg:col-span-1">
          <div className="lg:bg-transparent bg-white/60 rounded-xl py-3 lg:p-0 pl-3">
            <DateInput
              label={t('checkOut')}
              icon={Calendar}
              value={checkOut}
              onChange={setCheckOut}
            />
          </div>
        </div>

        {/* Travelers + Search */}
        <div className="lg:col-span-1 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 relative" ref={travelersRef}>
          <div className="lg:flex-1">
            <div 
              className="lg:bg-transparent bg-white/60 rounded-xl p-3 lg:p-0 cursor-pointer"
              onClick={() => setShowTravelers(!showTravelers)}
            >
              <div className="flex items-start space-x-2">
                <UserRound color='#B1B5C3' size={20} className='mt-0 lg:mt-2'/>
                <div className="flex flex-col w-full">
                  <label className="text-lg lg:text-xl font-semibold pl-2 pt-2 lg:pt-1 mb-1 hidden lg:block">
                    {t('travelers')}
                  </label>
                  <span className="px-3 text-gray-700">
                    {totalTravelers > 0 ? `${totalTravelers} Guests` : t('guestsPlaceholder')}
                  </span>
                </div>
              </div>
            </div>

            {/* Travelers Popup */}
            {showTravelers && (
              <div className="absolute z-50 bg-[#FCFCFD] shadow-lg lg:right-14 bottom-64 lg:bottom-24 rounded-3xl  max-h-[300px] w-full lg:min-w-[420px] overflow-y-auto p-8 space-y-6">
                
                {/* Adults */}
                <div className="flex items-center justify-between border-b pb-3 border-gray-300">
                  <div >
                    <p className="font-medium text-[16px]  text-gray-900">Adults</p>
                    <p className="text-[12px] font-normal text-gray-500">Ages 13 and above</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setAdults(Math.max(0, adults - 1))}
                      className="w-6 h-6 flex items-center justify-center border-[2px] rounded-full text-[#B1B5C3] hover:bg-gray-100"
                    >
                      <Minus size={16}/>
                    </button>
                    <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{adults}</span>
                    <button 
                      onClick={() => setAdults(adults + 1)}
                      className="w-6 h-6 flex items-center justify-center border-[2px] rounded-full text-[#B1B5C3] hover:bg-gray-100"
                    >
                      <Plus size={16}/>
                    </button>
                
                  </div>
                  
                </div>

                {/* Children */}
                <div className="flex items-center justify-between border-b pb-3 border-gray-300">
                  <div>
                    <p className="font-medium text-[16px]  text-gray-900">Children</p>
                    <p className="text-[12px] font-normal text-gray-500">Ages 2 – 12</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-6 h-6 flex items-center justify-center border-[2px] rounded-full text-[#B1B5C3] hover:bg-gray-100"
                    >
                      <Minus size={16}/>
                    </button>
                    <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{children}</span>
                    <button 
                      onClick={() => setChildren(children + 1)}
                      className="w-6 h-6 flex items-center justify-center border-[2px] rounded-full text-[#B1B5C3] hover:bg-gray-100"
                    >
                      <Plus size={16}/>
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[16px]  text-gray-900">Infants</p>
                    <p className="text-[12px] font-normal text-gray-500">Under 2 years</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-6 h-6 flex items-center justify-center border-[2px] rounded-full text-[#B1B5C3] hover:bg-gray-100"
                    >
                      <Minus size={16}/>
                    </button>
                    <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{infants}</span>
                    <button 
                      onClick={() => setInfants(infants + 1)}
                      className="w-6 h-6 flex items-center justify-center border-[2px] rounded-full text-[#B1B5C3] hover:bg-gray-100"
                    >
                      <Plus size={16}/>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <button 
            onClick={handleSearch}
            className="w-full lg:w-auto bg-[#3B71FE] hover:bg-blue-700 transition-colors duration-200 rounded-full py-4 lg:p-4 px-6 flex items-center justify-center"
          >
            <span className="text-white font-medium lg:hidden">{t('search')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white hidden lg:block" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchBar;
