'use client';
import { Navigation, UserRound, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DateInput from './ui/DateInput';

const HeroSection = () => {
  const { t } = useTranslation('hero'); 
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState('');
  const [isMobile, setIsMobile] = useState(false);

    // Dummy subtitle for demonstration
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    
    const dummyText = "Find the best places to stay, eat, and explore around the world."; 
    setSubtitle(dummyText);
  }, []);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Search handler
  const handleSearch = () => {
    const searchData = {
      location,
      checkIn,
      checkOut,
      travelers: parseInt(travelers) || 1
    };
    console.log(searchData); 
  };

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute rounded-3xl inset-0 bg-gradient-to-r from-[#3B71FE40]/45 to-[#3B71FE40]/85 my-1"></div>

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-6 md:py-12 lg:py-20">
        <div className="text-center lg:text-left">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
             <Trans i18nKey="title" ns="hero" />
 

          </h1>
          <p className="mt-4 font-poppins text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Search Bar */}
        <div className="mt-16 lg:mt-12">
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-4 lg:p-6 shadow-lg lg:absolute lg:left-1/2 lg:top-[98%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full">
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              
              {/* Location */}
              <div className="lg:col-span-1">
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
                        placeholder={isMobile ? t('locationPlaceholderMobile') : t('locationPlaceholderDesktop')}
                        className="w-full bg-transparent border-none rounded-md px-3 outline-none placeholder-gray-700 lg:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
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
                <div className="lg:bg-transparent bg-white/60 rounded-xl py-3 lg:p-0">
                  <DateInput
                    label={t('checkOut')}
                    icon={Calendar}
                    value={checkOut}
                    onChange={setCheckOut}
                  />
                </div>
              </div>

              {/* Travelers + Search */}
              <div className="lg:col-span-1 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
                <div className="lg:flex-1">
                  <div className="lg:bg-transparent bg-white/60 rounded-xl p-3 lg:p-0">
                    <div className="flex items-start space-x-2">
                      <UserRound color='#B1B5C3' size={20} className='mt-0 lg:mt-2'/>
                      <div className="flex flex-col w-full">
                        <label className="text-lg lg:text-xl font-semibold pl-2 pt-2 lg:pt-1 mb-1 hidden lg:block">
                          {t('travelers')}
                        </label>
                        <input
                          type="number"
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          placeholder={t('guestsPlaceholder')}
                          min="1"
                          className="w-full bg-transparent border-none  lg:placeholder:pl-3  outline-none focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>
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
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
