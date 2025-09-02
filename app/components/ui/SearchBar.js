'use client';
import { Navigation, UserRound, Calendar, Minus, Plus } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedLocation } from '../../../store/reducers/searchReducer';
import axios from '@/lib/axios';
import { useTranslation } from 'react-i18next';
import DateInput from './DateInput';

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation('hero');
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Travelers state
  const [suggestions, setSuggestions] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showTravelers, setShowTravelers] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [activeDropdown, setActiveDropdown] = useState(null); // 🔥 new line

  const travelersRef = useRef(null);
  const locationRef = useRef(null); // 🔥 new line

  // Dummy locations
  const dummyLocations = useMemo(() => [
    "Al Ula, Medina Province",
    "Al Ulaiyah, Riyadh",
    "Al Ulays, Jeddah",
    "Al Ujeir, Dammam",
    "Al Uqair, Eastern Province"
  ], []);

  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      try {
        const { data: json } = await axios.get('/get-all-locations');
        if (!isMounted) return;
        if (json?.success && Array.isArray(json.data)) {
          const list = [];
          json.data.forEach(city => {
            if (Array.isArray(city.districts)) {
              city.districts.forEach(d => {
                list.push({
                  label: d.district_name,
                  cityId: city.city_id,
                  districtId: d.district_id,
                });
              });
            }
          });
          setLocationsData(list);
        } else {
          setLocationsData([]);
        }
      } catch {
        setLocationsData([]);
      }
    };
    fetchLocations();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (location.length > 0) {
        const q = location.toLowerCase();
        const filtered = locationsData
          .filter(item => item.label.toLowerCase().includes(q))
          .slice(0, 20);
        setSuggestions(filtered);
        setActiveDropdown("location"); // 🔥 show location dropdown
      } else {
        setSuggestions([]);
        if (activeDropdown === "location") setActiveDropdown(null); // 🔥 close if empty
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [location, locationsData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        travelersRef.current && !travelersRef.current.contains(event.target) &&
        locationRef.current && !locationRef.current.contains(event.target)
      ) {
        setActiveDropdown(null); // 🔥 close all dropdowns
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place) => {
    console.log(place,'place');
    
    setLocation(place.label || '');
    dispatch(setSelectedLocation(place));
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
                  onFocus={() => location.length > 0 && setShowDropdown(true)}
                  placeholder={isMobile ? t('locationPlaceholderMobile') : t('locationPlaceholderDesktop')}
                  className="w-full bg-transparent border-none rounded-md px-3 outline-none placeholder-gray-700 lg:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Suggestions dropdown */}
          {activeDropdown === "location" && suggestions.length > 0 && ( 
            <div className="absolute z-100 bg-[#FCFCFD] shadow-xl rounded-3xl top-full max-h-[300px] w-full lg:min-w-[500px] overflow-y-auto p-3">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-3 cursor-pointer hover:bg-[#F4F5F6] flex items-center space-x-2 rounded-xl"
                >
                  <Navigation size={16} className="text-gray-400" />
                  <span className="text-[16px] font-medium text-[#23262F]">{item.label}</span>
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

        {/* Travelers */}
        <div className="lg:col-span-1 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 relative pt-1" ref={travelersRef}>
    <div
    className={`lg:flex-1 rounded-xl p-3 lg:p-0 cursor-pointer 
      ${activeDropdown === "travelers" ? " " : "lg:bg-transparent"} 
      bg-white/60 lg:bg-transparent`}
    onClick={() =>
      setActiveDropdown(activeDropdown === "travelers" ? null : "travelers")
    }
  >
            <div
            >
              <div className="flex items-start space-x-2">
                <UserRound color='#B1B5C3' size={24} className='mt-0 lg:mt-2.5'/>
                <div className="flex flex-col w-full">
                  <label className="text-lg lg:text-[24px] font-semibold pl-2 pt-2 lg:pt-1 mb-1 hidden lg:block">
                    {t('travelers')}
                  </label>
                  <span className="px-3 text-[#23262F] lg:text-[#777E90] text-[16px] font-medium">
                    {totalTravelers > 0 ? `${totalTravelers} ${t('guestsPlaceholder')} ` : t('guestsPlaceholder')}
                  </span>
                </div>
              </div>
            </div>

            {/* Travelers Popup */}
            {activeDropdown === "travelers" && ( 
              <div
              onClick={(e) => e.stopPropagation()} 
              className={`absolute z-50 bg-[#FCFCFD] shadow-xl bottom-36 lg:-bottom-72 rounded-3xl max-h-[300px] w-full lg:min-w-[420px] overflow-y-auto p-8 space-y-6
                ${i18n.language === "ar" ? " lg:-right-32" : " lg:right-32 "}
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
                    <button onClick={() => setAdults(Math.max(0, adults - 1))} className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full">
                      <Minus size={16} color='#B1B5C3'/>
                    </button>
                    <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="w-6 h-6 flex items-center justify-center border-[2px] border-[#B1B5C3] rounded-full">
                      <Plus size={16} color='#B1B5C3'/>
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
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full">
                      <Minus size={16} color='#B1B5C3'/>
                    </button>
                    <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full">
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
                    <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full">
                      <Minus size={16} color='#B1B5C3'/>
                    </button>
                    <span className="w-4 text-center text-[16px] font-medium text-[#23262F]">{infants}</span>
                    <button onClick={() => setInfants(infants + 1)} className="w-6 h-6 border-[2px] border-[#B1B5C3] rounded-full">
                      <Plus size={16} color='#B1B5C3'/>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <button 
            onClick={handleSearch}
            className="w-full lg:w-auto bg-[#3B71FE] hover:bg-blue-700 rounded-full py-4 lg:p-4 px-6 flex items-center justify-center"
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
