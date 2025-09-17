// app/page.js
'use client'
import Image from 'next/image';
import { ChevronRight, User, Star, Calendar, Tag, CreditCard, MoveLeft, MoveRight } from 'lucide-react';
import propertyImage from "../../public/images/justforyou.png"
import propertyImage2 from "../../public/images/curatedImage.png"
import { RiArrowDropLeftLine } from 'react-icons/ri';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import hostImage from "../../public/images/hostImage.png"
import { useEffect, useState, useRef } from 'react'; // ✅ Added for slider

export default function CheckInGuide() {
    const { t, i18n } = useTranslation('checkout');
    const isRTL = i18n.language === 'ar';

    // ✅ Slider states
    const [currentSlide, setCurrentSlide] = useState(1); // start at 1 because of clone
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const sliderRef = useRef(null);

    // ✅ Responsive check
    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const itemsPerView = isMobile ? 1 : 1; // show one image always
    const computedData = [propertyImage, propertyImage2, propertyImage];

    // ✅ Clone technique (first & last)
    const properties = computedData.length > 0
        ? [computedData[computedData.length - 1], ...computedData, computedData[0]]
        : computedData;

    // ✅ Transition handling for infinite loop
    const handleTransitionEnd = () => {
        if (currentSlide === properties.length - 1) {
            // reached last clone → reset to first real
            setIsTransitioning(false);
            setCurrentSlide(1);
        } else if (currentSlide === 0) {
            // reached first clone → reset to last real
            setIsTransitioning(false);
            setCurrentSlide(properties.length - 2);
        } else {
            setIsTransitioning(true);
        }
    };

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
    };
    return (
        <div className="max-w-6xl 2xl:max-w-[1430px] mx-auto px-8 lg:px-6 bg-white">
            {/* Header */}
            <header className="lg:flex items-center justify-between hidden pt-6 pb-3">
                <Link href="/">
                    <div className='px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px]'>
                        <button className="text-gray-700 hover:text-gray-900 transition-colors">
                            <RiArrowDropLeftLine size={24} />
                        </button>
                        <span className="font-bold text-sm text-[#23262F] font-dm-sans">{t('go_Home')}</span>
                    </div>
                </Link>

                <div className="flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold">
                    <span>2-Bed Luxury Villa in Al-Rawdah</span>
                    <ChevronRight size={16} />
                    <span className='text-[#B1B5C3]'> Confirmation</span>
                </div>
            </header>

            <header className="flex items-center justify-between lg:hidden pt-6 pb-3">
                <Link href="/">
                    <div className='px-4 py-2 flex items-center gap-1 border-2 border-[#E6E8EC] rounded-[90px]'>
                        <button className="text-gray-700 hover:text-gray-900 transition-colors">
                            <RiArrowDropLeftLine size={24} />
                        </button>
                        <span className="font-bold text-sm text-[#23262F] font-dm-sans">{t('go_Home')}</span>
                    </div>
                </Link>
                <div className="flex items-center gap-1 text-sm text-[#777E90] font-dm-sans font-bold">
                    <span>Confrimation</span>
                </div>
            </header>

            <main className="py-6 md:py-16 flex flex-col lg:flex-row gap-12">

                {/* Left Side - Image Slider */}
                <div className="lg:w-1/2">
                    <div className="overflow-hidden relative  rounded-2xl">
                        <div
                            ref={sliderRef}
                            className="flex"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
                                width: `${properties.length * 100}%`,
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {properties.map((img, index) => (
                                <div key={index} className="flex-shrink-0  w-full">
                                    <Image
                                        src={img}
                                        alt="Villa Living Room"
                                        className="rounded-2xl shadow-lg h-[260px] w-full lg:w-[540px] 2xl:w-full md:h-[700px] object-center"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slider Buttons */}
                    <div className='flex items-center justify-center mt-4 gap-4'>
                        <button
                            onClick={prevSlide}
                            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
                            aria-label="Previous hosts"
                        >
                            {isRTL ? (
                                <MoveRight className="w-5 h-5 text-gray-700" />
                            ) : (
                                <MoveLeft className="w-5 h-5 text-gray-700" />
                            )}
                        </button>
                        <button
                            onClick={nextSlide}
                            className="border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
                            aria-label="Next hosts"
                        >
                            {isRTL ? (
                                <MoveLeft className="w-5 h-5 text-gray-700" />
                            ) : (
                                <MoveRight className="w-5 h-5 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>


                {/* Right Side - Content */}
                <div className="lg:w-1/2 flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-[35px] md:text-5xl font-bold text-[#23262F] font-dm-sans mb-2">{t('title2')}</h1>
                        <p className="text-[16px] text-[#777E90] flex items-center">{t('subtitle2')} </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-[16px] font-medium text-[#23262F] mb-3">2-Bed Luxury Villa in Al-Rawdah</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-[#777E90] text-sm">{t('hosted_by')}</span>
                            <div className="flex items-center gap-2 w-6 h-6 rounded-full">
                                <Image
                                    src={hostImage}
                                    alt='host Image'
                                    className="fill w-full h-full object-center rounded-full transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <span className='text-[16px] text-[#23262F] font-medium'>Faisal A.</span>
                        </div>
                        <hr className='text-[#E6E8EC] my-8' />
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex items-center">
                                <Star size={20} fill="#FFD700" stroke="#FFD700" />
                                <span className="ml-2 text-sm font-medium text-[#23262F]">4.8</span>
                                <span className="text-[#777E90] text-sm ml-2">(256 {t('reviews')})</span>
                            </div>
                            <div className="text-[#777E90] text-xs">
                                <span>2 {t('bed')} •</span>
                                <span> 3 {t('bath')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 items-center mb-1">
                            <div>
                                <p className="text-xs text-[#777E90] pb-1">{t('Dates')}</p>
                                <p className="text-[16px] text-[#23262F] font-medium ">May 15 – 22, 2026</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#777E90] pb-1 text-right lg:text-left pr-6 lg:pr-0">{t('Guests')}</p>
                                <p className="text-[16px] text-[#23262F] font-medium text-right lg:text-left ">2 {t('Guests')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold text-[#23262F] mb-6">Check-in Details</h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 items-center ">
                                <div className="flex items-center gap-4 text-[#777E90] text-sm font-normal">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.91009 11.0775C2.23553 10.752 2.76317 10.752 3.0886 11.0775L5.83268 13.8215C6.15812 14.147 6.15812 14.6746 5.83268 15C5.50725 15.3255 4.97961 15.3255 4.65417 15L1.91009 12.256C1.58466 11.9305 1.58466 11.4029 1.91009 11.0775Z" fill="#777E91" />
                                        <path d="M18.1129 4.73195C18.425 4.39376 18.4039 3.86655 18.0658 3.55438C17.7276 3.24221 17.2004 3.26329 16.8882 3.60148L7.45342 13.8225C7.14125 14.1607 7.16234 14.6879 7.50053 15C7.83871 15.3122 8.36593 15.2911 8.6781 14.9529L14.4304 8.72123C14.591 8.54734 14.8639 8.54188 15.0312 8.70922L16.078 9.75596C16.4034 10.0814 16.9311 10.0814 17.2565 9.75596C17.5819 9.43053 17.5819 8.90289 17.2565 8.57745L16.139 7.46C15.9809 7.30186 15.9758 7.04709 16.1275 6.88276L18.1129 4.73195Z" fill="#777E91" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.89982 10.7323L3.43536 9.2678C2.45905 8.29149 2.45905 6.70857 3.43536 5.73226L6.56649 2.60113C7.5428 1.62482 9.12571 1.62482 10.102 2.60113L11.5665 4.0656C12.5428 5.04191 12.5428 6.62482 11.5665 7.60113L8.43536 10.7323C7.45904 11.7086 5.87613 11.7086 4.89982 10.7323ZM4.61387 8.08929L6.07834 9.55375C6.40377 9.87919 6.93141 9.87919 7.25684 9.55375L10.388 6.42262C10.7134 6.09718 10.7134 5.56954 10.388 5.24411L8.92351 3.77964C8.59807 3.4542 8.07044 3.4542 7.745 3.77964L4.61387 6.91077C4.28843 7.23621 4.28843 7.76385 4.61387 8.08929Z" fill="#777E91" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.66602 16.6667C7.12625 16.6667 7.49935 16.2936 7.49935 15.8334C7.49935 15.3731 7.12625 15 6.66602 15C6.20578 15 5.83268 15.3731 5.83268 15.8334C5.83268 16.2936 6.20578 16.6667 6.66602 16.6667ZM6.66602 18.3334C8.04673 18.3334 9.16602 17.2141 9.16602 15.8334C9.16602 14.4527 8.04673 13.3334 6.66602 13.3334C5.2853 13.3334 4.16602 14.4527 4.16602 15.8334C4.16602 17.2141 5.2853 18.3334 6.66602 18.3334Z" fill="#777E91" />
                                    </svg>

                                    <span>{t('checkIn')}:</span>
                                </div>
                                <span className="font-medium text-sm text-[#23262F] text-right lg:text-left">2:00 PM May 15, 2026</span>
                            </div>

                            <div className="grid grid-cols-2 items-center">
                                <div className="flex items-center gap-4 text-[#777E90] text-sm font-normal">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.8327 5.00004H4.16602C3.70578 5.00004 3.33268 5.37314 3.33268 5.83337V15.8334C3.33268 16.2936 3.70578 16.6667 4.16602 16.6667H15.8327C16.2929 16.6667 16.666 16.2936 16.666 15.8334V5.83337C16.666 5.37314 16.2929 5.00004 15.8327 5.00004ZM4.16602 3.33337C2.7853 3.33337 1.66602 4.45266 1.66602 5.83337V15.8334C1.66602 17.2141 2.7853 18.3334 4.16602 18.3334H15.8327C17.2134 18.3334 18.3327 17.2141 18.3327 15.8334V5.83337C18.3327 4.45266 17.2134 3.33337 15.8327 3.33337H4.16602Z" fill="#777E91" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.33333 10C7.8731 10 7.5 10.3731 7.5 10.8333C7.5 11.2936 7.8731 11.6667 8.33333 11.6667H14.1667C14.6269 11.6667 15 11.2936 15 10.8333C15 10.3731 14.6269 10 14.1667 10H8.33333ZM5.83333 13.3333C5.3731 13.3333 5 13.7064 5 14.1667C5 14.6269 5.3731 15 5.83333 15H10.8333C11.2936 15 11.6667 14.6269 11.6667 14.1667C11.6667 13.7064 11.2936 13.3333 10.8333 13.3333H5.83333Z" fill="#777E91" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.83333 1.66663C5.3731 1.66663 5 2.03972 5 2.49996V5.83329C5 6.29353 5.3731 6.66663 5.83333 6.66663C6.29357 6.66663 6.66667 6.29353 6.66667 5.83329V2.49996C6.66667 2.03972 6.29357 1.66663 5.83333 1.66663ZM14.1667 1.66663C13.7064 1.66663 13.3333 2.03972 13.3333 2.49996V5.83329C13.3333 6.29353 13.7064 6.66663 14.1667 6.66663C14.6269 6.66663 15 6.29353 15 5.83329V2.49996C15 2.03972 14.6269 1.66663 14.1667 1.66663Z" fill="#777E91" />
                                    </svg>

                                    <span>{t('checkOut')}:</span>
                                </div>
                                <span className="font-medium text-sm text-[#23262F] text-right lg:text-left">12:00 PM May 22, 2026</span>
                            </div>

                            <div className="grid grid-cols-2 items-center">
                                <div className="flex items-center gap-4 text-[#777E90] text-sm font-normal">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.0007 3.74996C15.0007 3.51984 14.8141 3.33329 14.584 3.33329H5.41732C5.1872 3.33329 5.00065 3.51984 5.00065 3.74996V15.0232C5.00065 15.305 5.29722 15.4883 5.54928 15.3623C6.2531 15.0103 7.08153 15.0103 7.78535 15.3623L9.62797 16.2836C9.86258 16.4009 10.1387 16.4009 10.3733 16.2836L12.216 15.3623C12.9198 15.0103 13.7482 15.0103 14.452 15.3623C14.7041 15.4883 15.0007 15.305 15.0007 15.0232V3.74996ZM16.6673 17.6591C16.6673 17.9689 16.3414 18.1703 16.0643 18.0318L13.7067 16.853C13.4721 16.7357 13.1959 16.7357 12.9613 16.853L11.1187 17.7743C10.4149 18.1262 9.58644 18.1262 8.88262 17.7743L7.04 16.853C6.80539 16.7357 6.52925 16.7357 6.29464 16.853L3.93699 18.0318C3.65995 18.1703 3.33398 17.9689 3.33398 17.6591V1.66663H16.6673V17.6591Z" fill="#777E91" />
                                        <path d="M7.49935 5C7.03911 5 6.66602 5.3731 6.66602 5.83333C6.66602 6.29357 7.03911 6.66667 7.49935 6.66667H9.16602C9.62625 6.66667 9.99935 6.29357 9.99935 5.83333C9.99935 5.3731 9.62625 5 9.16602 5H7.49935Z" fill="#777E91" />
                                        <path d="M12.4993 5C12.0391 5 11.666 5.3731 11.666 5.83333C11.666 6.29357 12.0391 6.66667 12.4993 6.66667C12.9596 6.66667 13.3327 6.29357 13.3327 5.83333C13.3327 5.3731 12.9596 5 12.4993 5Z" fill="#777E91" />
                                        <path d="M6.66602 9.16667C6.66602 8.70643 7.03911 8.33333 7.49935 8.33333H9.16602C9.62625 8.33333 9.99935 8.70643 9.99935 9.16667C9.99935 9.6269 9.62625 10 9.16602 10H7.49935C7.03911 10 6.66602 9.6269 6.66602 9.16667Z" fill="#777E91" />
                                        <path d="M12.4993 8.33333C12.0391 8.33333 11.666 8.70643 11.666 9.16667C11.666 9.6269 12.0391 10 12.4993 10C12.9596 10 13.3327 9.6269 13.3327 9.16667C13.3327 8.70643 12.9596 8.33333 12.4993 8.33333Z" fill="#777E91" />
                                        <path d="M6.66602 12.5C6.66602 12.0398 7.03911 11.6667 7.49935 11.6667H9.16602C9.62625 11.6667 9.99935 12.0398 9.99935 12.5C9.99935 12.9602 9.62625 13.3333 9.16602 13.3333H7.49935C7.03911 13.3333 6.66602 12.9602 6.66602 12.5Z" fill="#777E91" />
                                        <path d="M12.4993 11.6667C12.0391 11.6667 11.666 12.0398 11.666 12.5C11.666 12.9602 12.0391 13.3333 12.4993 13.3333C12.9596 13.3333 13.3327 12.9602 13.3327 12.5C13.3327 12.0398 12.9596 11.6667 12.4993 11.6667Z" fill="#777E91" />
                                        <path d="M1.66602 2.49996C1.66602 2.03972 2.03911 1.66663 2.49935 1.66663H17.4993C17.9596 1.66663 18.3327 2.03972 18.3327 2.49996C18.3327 2.9602 17.9596 3.33329 17.4993 3.33329H2.49935C2.03911 3.33329 1.66602 2.9602 1.66602 2.49996Z" fill="#777E91" />
                                    </svg>

                                    <span>{t('Booking code')}:</span>
                                </div>
                                <span className="font-medium text-sm text-[#23262F] text-right lg:text-left">JKD#3@_42</span>
                            </div>

                            <div className="grid grid-cols-2 items-start">
                                <div className="flex items-center gap-4 text-[#777E90] text-sm font-normal">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.834 4.16667H4.16732C3.24684 4.16667 2.50065 4.91286 2.50065 5.83333V14.1667C2.50065 15.0871 3.24684 15.8333 4.16732 15.8333H15.834C16.7545 15.8333 17.5006 15.0871 17.5006 14.1667V5.83333C17.5006 4.91286 16.7545 4.16667 15.834 4.16667ZM4.16732 2.5C2.32637 2.5 0.833984 3.99238 0.833984 5.83333V14.1667C0.833984 16.0076 2.32637 17.5 4.16732 17.5H15.834C17.6749 17.5 19.1673 16.0076 19.1673 14.1667V5.83333C19.1673 3.99238 17.6749 2.5 15.834 2.5H4.16732Z" fill="#777E91" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.834 10C10.834 7.69885 12.6995 5.83337 15.0007 5.83337H18.334C18.7942 5.83337 19.1673 6.20647 19.1673 6.66671C19.1673 7.12694 18.7942 7.50004 18.334 7.50004H15.0007C13.6199 7.50004 12.5007 8.61933 12.5007 10C12.5007 11.3808 13.6199 12.5 15.0007 12.5H18.334C18.7942 12.5 19.1673 12.8731 19.1673 13.3334C19.1673 13.7936 18.7942 14.1667 18.334 14.1667H15.0007C12.6995 14.1667 10.834 12.3012 10.834 10Z" fill="#777E91" />
                                        <path d="M15.8327 9.99996C15.8327 10.4602 15.4596 10.8333 14.9993 10.8333C14.5391 10.8333 14.166 10.4602 14.166 9.99996C14.166 9.53972 14.5391 9.16663 14.9993 9.16663C15.4596 9.16663 15.8327 9.53972 15.8327 9.99996Z" fill="#777E91" />
                                    </svg>

                                    <span>{t('Location')}</span>
                                </div>
                                <span className="font-medium text-sm text-[#23262F] text-right lg:text-left">Lorem ipsum Road, Next to Loremis Land Mark <br /> Al Rawadh, Riyadh</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row items-center gap-4'>
                        <button className="lg:w-48 w-full justify-center whitespace-nowrap flex items-center mx-auto lg:mx-0 py-3 px-6 bg-transparent border-2 border-[#E6E8EC] text-[#23262F] font-bold text-lg font-dm-sans rounded-full hover:bg-gray-100 focus:outline-none transition-colors ">
                            {t('Get Directions')}
                        </button>

                        <button className="lg:w-40 w-full justify-center whitespace-nowrap flex items-center mx-auto lg:mx-0 py-3 px-6 bg-[#3B71FE] text-white font-bold text-lg font-dm-sans rounded-full hover:bg-blue-700 focus:outline-none transition-colors shadow-md">
                            {t('Contact Host')}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
