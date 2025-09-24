'use client'
import Image from 'next/image';
import { Calendar, User, Star, DollarSign, ChevronRight, ArrowDownNarrowWide, ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import propertyImage from "../../public/images/justforyou.png"
import mastercard from "../../public/images/mastercard.png"
import hostImage from "../../public/images/hostImage.png"
import { RiArrowDropLeftLine } from 'react-icons/ri';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Edit, Plus, Minus } from "lucide-react";
import DateRange from '../components/ui/DateRange';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppSelector } from '../../store/hooks';
import { usePopup } from '../contexts/PopupContext';

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = searchParams.get('slug');
    
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const { openPopup } = usePopup();
    
    const [cardHolder, setCardHolder] = useState("Mohamed Ghanem");
    const { t, i18n } = useTranslation('checkout');
    const [selectedRange, setSelectedRange] = useState({
        checkIn: null,
        checkOut: null,
    });

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(false);
    
    const [cachedData, setCachedData] = useState(null);

    const travelersRef = useRef(null);

    const totalTravelers = adults + children + infants;

    const handleConfirmAndPay = () => {
        if (!isAuthenticated) {
            openPopup('signup');
            return;
        }
        
        console.log('User is authenticated, proceeding with checkout...');
    };

    useEffect(() => {
        const loadCachedData = () => {
            try {
                const cached = localStorage.getItem('unitDetailsCache');
                if (cached) {
                    const data = JSON.parse(cached);
                    setCachedData(data);
                    
                    if (data.checkIn && data.checkOut) {
                        console.log('Loading cached dates:', data.checkIn, data.checkOut);
                        setSelectedRange({
                            checkIn: data.checkIn,
                            checkOut: data.checkOut
                        });
                    }
                    
                    console.log('Full cached data:', data);
                    console.log('Listing data:', data.listingData);
                    console.log('Thumbnail data:', data.listingData?.thumbnail);
                    
                    if (data.adults !== undefined) setAdults(data.adults);
                    if (data.children !== undefined) setChildren(data.children);
                    if (data.infants !== undefined) setInfants(data.infants);
                }
            } catch (error) {
                console.error('Error loading cached data:', error);
            }
        };
        
        loadCachedData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (travelersRef.current && !travelersRef.current.contains(event.target)) {
                setActiveDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="">
            <div className="max-w-6xl 2xl:max-w-[1430px] mx-auto px-8 lg:px-6 bg-white">
                <header className="lg:flex items-center justify-between hidden pt-6 pb-20">
                    <Link href="/">
                        <div className='px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px]'>
                            <button className="text-gray-700 hover:text-gray-900 transition-colors">
                                <RiArrowDropLeftLine size={24} />
                            </button>
                            <span className="font-bold text-sm text-[#23262F] font-dm-sans">{t('go_Home')}</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold">
                        <span>{cachedData?.listingData?.title || 'Property'}</span>
                        <ChevronRight size={16} />
                        <span className='text-[#B1B5C3]'> Confirm and pay</span>
                    </div>
                </header>

                <header className="flex items-center justify-between lg:hidden pt-6 pb-12">
                    <Link href="/">
                        <div className='px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px]'>
                            <button className="text-gray-700 hover:text-gray-900 transition-colors">
                                <RiArrowDropLeftLine size={24} />
                            </button>
                            <span className="font-bold text-sm text-[#23262F] font-dm-sans">{t('go_Home')}</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold">
                        <span>Confirm and pay</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z" fill="#B1B5C4" />
                        </svg>

                    </div>
                </header>


                <div className='flex items-start gap-20 lg:flex-row flex-col lg:mb-16'>

                    {/* Left Column - Payment Form */}

                    <div className="w-full lg:w-1/2 order-2 lg:order-1 mb-12 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#23262F] font-dm-sans mb-6">{t('Confirm and pay')}</h1>

                        <div className="  block border-t border-gray-200 pt-6">
                            <h2 className="text-2xl font-semibold text-[#23262F] mb-6">{t('Your trip')}</h2>
                            <div className="flex flex-col lg:flex-row  gap-2 mb-8">

                                <DateRange
                                    value={selectedRange}
                                    onChange={(range) => {
                                        console.log("DateRange onChange - New Range:", range);
                                        setSelectedRange(range);
                                    }}
                                />




                                <div className="relative w-full" ref={travelersRef}>
                                    <div
                                        onClick={() => setActiveDropdown(!activeDropdown)}
                                        className="flex flex-col items-start p-4 bg-[#F4F5F6] rounded-xl w-full cursor-pointer"
                                    >
                                        <span className="text-xs text-[#777E90]">{t('Guest')}</span>
                                        <div className='flex items-center justify-between w-full'>
                                            <span className="font-medium text-[#23262F] whitespace-nowrap  text-[16px] pt-.5 flex items-center gap-24">
                                                {totalTravelers > 0
                                                    ? `${totalTravelers} ${t('guestsPlaceholder')}`
                                                    : t('Guests')}
                                            </span>
                                                <Edit className="w-4 h-4 text-gray-400 cursor-pointer" />
                                        </div>
                                    </div>

                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={`
          absolute z-50 bg-white shadow-xl mt-2 rounded-3xl w-full max-w-[450px] p-6 space-y-6
          transition-all duration-300 ease-in-out
        
          ${activeDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
                                    >
                                        <div className="flex items-center justify-between border-b pb-3 border-gray-200">
                                            <div>
                                                <p className="font-medium text-[16px] text-gray-900">{t('Adults')}</p>
                                                <p className="text-[12px] text-gray-500">{t('Ages 13 and above')}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => setAdults(Math.max(0, adults - 1))}
                                                    className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span
                                                    className={`w-4 text-center text-[16px] font-medium text-[#23262F] ${i18n.language === "ar" ? "pl-6" : ""
                                                        }`}
                                                >
                                                    {adults}
                                                </span>
                                                <button
                                                    onClick={() => setAdults(adults + 1)}
                                                    className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-b pb-3 border-gray-200">
                                            <div>
                                                <p className="font-medium text-[16px] text-gray-900">{t('Children')}</p>
                                                <p className="text-[12px] text-gray-500">{t('Ages 2 - 12')}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                                    className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span
                                                    className={`w-4 text-center text-[16px] font-medium text-[#23262F] ${i18n.language === "ar" ? "pl-6" : ""
                                                        }`}
                                                >
                                                    {children}
                                                </span>
                                                <button
                                                    onClick={() => setChildren(children + 1)}
                                                    className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-[16px] text-gray-900">{t('Infants')}</p>
                                                <p className="text-[12px] text-gray-500">{t('Under 2 years')}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => setInfants(Math.max(0, infants - 1))}
                                                    className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span
                                                    className={`w-4 text-center text-[16px] font-medium text-[#23262F] ${i18n.language === "ar" ? "pl-6" : ""
                                                        }`}
                                                >
                                                    {infants}
                                                </span>
                                                <button
                                                    onClick={() => setInfants(infants + 1)}
                                                    className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                        <hr className='text-gray-200 mb-8' />
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-[#23262F]">{t('Add a payment method')}</h2>

                            <div className="relative">
                                <label className="block text-xs uppercase font-bold text-[#B1B5C3] mb-2">{t('CARD NUMBER')}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Image src={mastercard} alt="Mastercard" width={32} height={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value="9224 1111 2222 3333"
                                        readOnly
                                        className="w-full pl-14 pr-10 py-3 border-2 border-[#58C27D] rounded-xl focus:outline-none "

                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="w-5 h-5 text-[#58C27D]" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-[#B1B5C3] mb-2">{t('CARD HOLDER')}</label>
                                <input
                                    type="text"
                                    value={cardHolder}
                                    onChange={(e) => setCardHolder(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 placeholder:text-[#777E90] rounded-xl focus:outline-none "
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-[#B1B5C3] mb-2">{t('EXPIRATION DATE')}</label>
                                    <input
                                        type="text"
                                        placeholder="MM / YY"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none "
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-[#B1B5C3] mb-2">{t('CVC')}</label>
                                    <input
                                        type="text"
                                        placeholder="•••"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none "
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    id="save-card"
                                    defaultChecked
                                    className="h-5 w-5 text-[#3B71FE] rounded "
                                />
                                <label htmlFor="save-card" className="ml-2 block text-sm text-[#141416] font-medium">
                                    {t('Save Card')}
                                </label>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-[#23262F] mb-4">{t('Message the host')}</h2>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  resize-none"
                                placeholder="I will be late about 1 hour, please wait..."
                            ></textarea>
                        </div>

                        <button 
                            onClick={handleConfirmAndPay}
                            className="mt-8 w-auto lg:w-48 whitespace-nowrap py-3 px-8 lg:px-2 bg-[#3B71FE] hover:bg-blue-700 text-white font-medium rounded-full shadow-md transition-colors duration-200">
                            {t('Confirm and pay')}
                        </button>
                    </div>

                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="bg-[#FCFCFD] rounded-3xl border border-[#E6E8EC] shadow-lg p-4 lg:p-8">
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="w-full md:w-1/2">
                                    <div className="relative rounded-2xl w-full h-[180px]  lg:w-[180px] lg:h-[180px] overflow-hidden aspect-[3/4] md:aspect-square">
                                        <Image 
                                            src={cachedData?.listingData?.listing_images?.[0]?.url || propertyImage} 
                                            alt={cachedData?.listingData?.title || "Property"} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                </div>
                                <div className="md:w-full space-y-2">
                                    <h3 className="text-[16px] font-medium whitespace-nowrap text-[#23262F]">
                                        {cachedData?.listingData?.title || 'Property'}
                                    </h3>
                                    <div className="flex items-center gap-3 my-3">
                                        <span className="text-[#777E90] text-sm">{t('hosted_by')}</span>
                                        <div className="flex items-center gap-2 w-6 h-6 rounded-full">
                                            <Image
                                                src={hostImage}
                                                alt='host Image'
                                                className="fill w-full h-full object-center rounded-full transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className='text-[16px] text-[#23262F] font-medium'>Host</span>
                                    </div>
                                    <p className="text-[#777E90] text-xs">
                                        {cachedData?.listingData?.bedrooms || 2} {t('bed')} • 
                                        <span> {cachedData?.listingData?.bathrooms || 3} {t('bath')} </span>
                                    </p>

                                    <hr className='my-8 lg:my-6 text-gray-300' />
                                    <div className="flex items-center mb-4 lg:mb-0 lg:mt-3">
                                        <Star size={20} fill="#FFD700" stroke="#FFD700" />
                                        <span className="ml-2 text-sm font-medium text-[#23262F]">
                                            {cachedData?.listingData?.rating || '4.8'}
                                        </span>
                                        <span className="text-[#777E90] text-sm ml-2">
                                            ({cachedData?.listingData?.reviews || 256} {t('reviews')})
                                        </span>
                                    </div>                                </div>
                            </div>

                            <div className="bg-[#F4F5F6] px-8 py-6 rounded-3xl mb-6 lg:block hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-4">
                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="flex items-start gap-4">
                                            <svg width="24" height="24"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M19 6H5C4.44772 6 4 6.44772 4 7V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V7C20 6.44771 19.5523 6 19 6ZM5 4C3.34315 4 2 5.34315 2 7V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V7C22 5.34315 20.6569 4 19 4H5Z" fill="#B1B5C4" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14H17C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12H10ZM7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H7Z" fill="#B1B5C4" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7 2C6.44772 2 6 2.44772 6 3V7C6 7.55228 6.44772 8 7 8C7.55228 8 8 7.55228 8 7V3C8 2.44772 7.55228 2 7 2ZM17 2C16.4477 2 16 2.44772 16 3V7C16 7.55228 16.4477 8 17 8C17.5523 8 18 7.55228 18 7V3C18 2.44772 17.5523 2 17 2Z" fill="#B1B5C4" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-[#777E90]">{t('checkIn')}</p>
                                                <p className="font-medium text-[16px] text-[#23262F]">
                                                    {selectedRange.checkIn
                                                        ? `2pm, ${new Date(selectedRange.checkIn).toLocaleDateString("en-GB", {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}`
                                                        : <>
                                                            {t('Add date')}
                                                        </>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                       
                                    </div>

                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="flex items-start gap-4">
                                            <svg width="24" height="24"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M19 6H5C4.44772 6 4 6.44772 4 7V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V7C20 6.44771 19.5523 6 19 6ZM5 4C3.34315 4 2 5.34315 2 7V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V7C22 5.34315 20.6569 4 19 4H5Z" fill="#B1B5C4" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14H17C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12H10ZM7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H7Z" fill="#B1B5C4" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7 2C6.44772 2 6 2.44772 6 3V7C6 7.55228 6.44772 8 7 8C7.55228 8 8 7.55228 8 7V3C8 2.44772 7.55228 2 7 2ZM17 2C16.4477 2 16 2.44772 16 3V7C16 7.55228 16.4477 8 17 8C17.5523 8 18 7.55228 18 7V3C18 2.44772 17.5523 2 17 2Z" fill="#B1B5C4" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-[#777E90]">{t('checkOut')}</p>
                                                <p className="font-medium text-[16px] text-[#23262F]">
                                                    {selectedRange.checkOut
                                                        ? `10am, ${new Date(selectedRange.checkOut).toLocaleDateString("en-GB", {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}`
                                                        :
                                                        <>

                                                            {t('Add date')}
                                                        </>

                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <Edit className="w-5 h-5 text-gray-400 lg:hidden" />
                                    </div>
                                </div>

                                <div className="mt-12 lg:mt-2 flex items-center gap-2  justify-between">
                                    <div className="flex items-start gap-4 lg:mt-3">
                                        <User className="w-6 h-6 text-[#B1B5C3]" />
                                        <div>
                                            <p className="text-xs text-[#777E90]">{t('Guest')}</p>
                                            <p className="font-medium text-[16px] text-[#23262F]">
                                                {totalTravelers > 0
                                                    ? `${totalTravelers} ${t('Guests')}`
                                                    : t('Guests')}
                                            </p>
                                        </div>
                                    </div>
                                    <Edit className="w-5 h-5 text-gray-400 lg:hidden" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-[#23262F] lg:mb-8">{t('Price details')}</h3>
                                <div className="space-y-5 px-3">
                                    <div className="flex justify-between text-[#777E90] text-sm">
                                        <span>
                                            {cachedData?.pricing?.basePrice || ''} SAR × {cachedData?.pricing?.nightsCount || 3} {t('nights')}
                                        </span>
                                        <span className="font-medium text-sm text-[#23262F]">
                                            {cachedData?.pricing?.baseTotal || ''} SAR
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[#777E90] text-sm">
                                        <span>{t('Cleaning Fee')}</span>
                                        <span className="font-medium text-sm text-[#23262F]">
                                            {cachedData?.pricing?.cleaningFee || ''} SAR
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[#777E90] text-sm">
                                        <span>{t('Service fee')}</span>
                                        <span className="font-medium text-sm text-[#23262F]">
                                            {cachedData?.pricing?.serviceFee || ''} SAR
                                        </span>
                                    </div>

                                </div>
                                <div className="flex justify-between font-medium mb-8 text-[#23262F] text-sm bg-[#F4F5F6] p-3 rounded-lg">
                                    <span>{t('Total')}
                                        <span className='text-[#777E90] text-sm pl-1'>
                                            (SAR)
                                        </span>
                                    </span>
                                    <span className="font-medium text-[#23262F] text-sm">
                                        {cachedData?.pricing?.total || '9,985'} SAR
                                    </span>
                                </div>
                                <p className="text-xs mb-3 text-[#777E90] mt-4 flex items-center justify-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {t('Free cancellation until')} May 15, 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}