'use client';

import { useState, useRef } from 'react';
import {
    Edit2,
    Share2,
    MoreHorizontal,
    Twitter,
    Instagram,
    Chrome,
    MessageCircle,
    Home,
    X,
    Upload,
    Star,
    Check,
    Facebook
} from 'lucide-react';
import Image from 'next/image';
import { RiTwitterXFill } from 'react-icons/ri';

export default function ProfilePage() {
    const [showEditCoverModal, setShowEditCoverModal] = useState(false);
    const [activeReviewTab, setActiveReviewTab] = useState('about');
    const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=400&fit=crop');
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop');

    const coverInputRef = useRef(null);
    const profileInputRef = useRef(null);

    const reviews = [
        {
            id: 1,
            name: 'Mohamed Ghaned',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            rating: 5,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
            time: '1 day ago'
        },
        {
            id: 2,
            name: 'Mohamed Ghaned',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            rating: 5,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
            time: '1 day ago'
        }
    ];

    const defaultPhotos = [
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1557683304-673a23048d34?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
    ];

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
                setShowEditCoverModal(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultPhotoSelect = (photo) => {
        setCoverImage(photo);
        setShowEditCoverModal(false);
    };

    return (
        <div className="min-h-screen bg-white py-1 px-2 lg:py-2">
            {/* Fixed Height Background Cover Image */}
            <div className="relative w-full h-[280px] 2xl:h-[400px] rounded-3xl overflow-hidden">
                <Image
                    src={coverImage}
                    alt="Cover Background"
                    fill
                    className="object-fill object-center"
                    priority
                />
                {/* Edit Cover Button */}
                <button
                    onClick={() => setShowEditCoverModal(true)}
                    className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-2.5 rounded-full text-[14px] font-bold font-dm-sans flex items-center gap-2 transition-all border border-white shadow-lg z-10"
                >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit cover
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left Sidebar - Profile Card (Overlapping Cover) */}
                    <div className="w-full lg:w-[380px] flex-shrink-0 -mt-32 lg:-mt-24 z-20">
                        <div className="bg-[#FCFCFD] rounded-3xl shadow-lg overflow-visible relative">
                            {/* Profile Content */}
                            <div className="px-6 lg:px-8 pt-20 pb-8">
                                {/* Avatar */}
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="relative">
                                        <div className="w-[130px] h-[130px] rounded-full border-[5px] border-white bg-white overflow-hidden shadow-lg">
                                            <Image
                                                src={profileImage}
                                                alt="Mohamed A."
                                                width={130}
                                                height={130}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <button
                                            onClick={() => profileInputRef.current?.click()}
                                            className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <input
                                            ref={profileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfileImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                {/* Update Avatar Button */}
                                <button
                                    onClick={() => profileInputRef.current?.click()}
                                    className="text-[#777E90] hover:text-gray-700 text-[12px] flex items-center gap-1.5 mb-5 font-semibold mx-auto"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    Update avatar
                                </button>

                                {/* Name */}
                                <h1 className="text-[32px] font-bold text-[#23262F] font-dm-sans mb-4 text-center">Mohamed A.</h1>

                                {/* Verification and Reviews */}
                                <div className="flex items-center justify-center gap-4 mb-6 text-[14px] bg-[#F4F5F6] px-4 py-2 rounded-[20px]">
                                    <div className="flex items-center whitespace-nowrap gap-1.5 text-[#777E90]">
                                        <Check className="w-4 h-4" />
                                        <span>Identity verified</span>
                                    </div>
                                    <div className="flex items-center whitespace-nowrap gap-1.5 text-[#777E90]">
                                        <Star className="w-4 h-4" />
                                        <span>256 reviews</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mb-6">
                                    <button className="flex-1 bg-[#23262F] text-white px-4 py-2.5 rounded-full hover:bg-[#1a1a1a] transition-colors font-bold text-[14px]">
                                        Message
                                    </button>
                                    <button className="w-[42px] h-[42px] flex items-center justify-center border-2 border-[#E6E8EC] rounded-full hover:bg-gray-50 transition-colors">
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99882 8.36712C8.02332 8.8267 7.67061 9.21913 7.21103 9.24363C6.58379 9.27707 6.087 9.31797 5.69878 9.35891C5.17743 9.4139 4.86065 9.73414 4.80799 10.1948C4.73238 10.8562 4.66667 11.857 4.66667 13.3339C4.66667 14.8108 4.73238 15.8116 4.80799 16.473C4.86074 16.9344 5.17672 17.2538 5.69729 17.3087C6.60898 17.4049 8.11604 17.5006 10.5 17.5006C12.884 17.5006 14.391 17.4049 15.3027 17.3087C15.8233 17.2538 16.1393 16.9344 16.192 16.473C16.2676 15.8116 16.3333 14.8108 16.3333 13.3339C16.3333 11.857 16.2676 10.8562 16.192 10.1948C16.1394 9.73414 15.8226 9.4139 15.3012 9.35891C14.913 9.31797 14.4162 9.27707 13.789 9.24363C13.3294 9.21913 12.9767 8.8267 13.0012 8.36712C13.0257 7.90753 13.4181 7.55483 13.8777 7.57933C14.5301 7.61411 15.0558 7.65712 15.476 7.70144C16.713 7.8319 17.6997 8.70948 17.8479 10.0055C17.9323 10.7441 18 11.8102 18 13.3339C18 14.8576 17.9323 15.9237 17.8479 16.6623C17.6998 17.9575 16.7154 18.8356 15.4776 18.9662C14.4933 19.0701 12.9257 19.1672 10.5 19.1672C8.07435 19.1672 6.50672 19.0701 5.52236 18.9662C4.28459 18.8356 3.30017 17.9575 3.15211 16.6623C3.06767 15.9237 3 14.8576 3 13.3339C3 11.8102 3.06767 10.7441 3.15211 10.0055C3.30026 8.70948 4.28697 7.8319 5.52397 7.70144C5.94422 7.65712 6.46994 7.61411 7.1223 7.57933C7.58189 7.55483 7.97432 7.90753 7.99882 8.36712Z" fill="#777E91" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.17259 5.17324C7.84715 5.49868 7.31951 5.49868 6.99408 5.17324C6.66864 4.8478 6.66864 4.32017 6.99408 3.99473L9.91074 1.07806C10.2362 0.752625 10.7638 0.752625 11.0893 1.07806L14.0059 3.99473C14.3314 4.32017 14.3314 4.8478 14.0059 5.17324C13.6805 5.49868 13.1528 5.49868 12.8274 5.17324L11.3333 3.67916V11.6673C11.3333 12.1276 10.9602 12.5007 10.5 12.5007C10.0398 12.5007 9.66667 12.1276 9.66667 11.6673V3.67916L8.17259 5.17324Z" fill="#777E91" />
                                        </svg>

                                    </button>
                                    <button className="w-[42px] h-[42px] flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                                        <MoreHorizontal className="w-[20px] h-[20px] text-[#777E90]" />
                                    </button>
                                </div>

                                {/* Social Icons */}
                                <div className="flex justify-center gap-8 py-5 border-b border-gray-200">
                                    <button className="text-[#777E90] hover:text-gray-600 transition-colors">
                                        <RiTwitterXFill className="w-[20px] h-[20px]" />
                                    </button>
                                    <button className="text-[#777E90] hover:text-gray-600 transition-colors">
                                        <Instagram className="w-[20px] h-[20px]" />
                                    </button>
                                    <button className="text-[#777E90] hover:text-gray-600 transition-colors">
                                        <Facebook className="w-[20px] h-[20px]" />
                                    </button>
                                </div>

                                {/* Member Since */}
                                <div className="pt-5 text-center text-[12px] text-[#777E90]">
                                    Member since Mar 15, 2016
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content (Below Cover on Desktop, Below Left Card on Mobile) */}
                    <div className="flex-1 mt-4 lg:mt-12 pb-8">
                        <div className=" overflow-hidden">
                            <div className="px-7 lg:px-10 py-6 lg:py-8">
                                {/* Header */}
                                <div className="flex flex-col-reverse  sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                                    <h2 className="text-[18px] lg:text-[24px] font-semibold text-[#23262F] leading-tight">Hi, I'm Mohamed Ahmed</h2>
                                    <button className="px-5 py-2 border-2 text-[#23262F] border-[#E6E8EC] rounded-full text-[14px] font-bold hover:bg-gray-50 transition-colors whitespace-nowrap self-start sm:self-auto">
                                        Edit your profile
                                    </button>
                                </div>

                                {/* Bio */}
                                <p className="text-[#777E90] text-[14px] mb-8 leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ex nisl, ultrices sit amet quam ut, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellent.
                                </p>

                                {/* Info Items */}
                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-4">
                                        <Home className="w-[20px] h-[20px] text-gray-400 flex-shrink-0" />
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-16 text-[14px]">
                                            <span className="text-[#777E90] sm:w-20">Lives in</span>
                                            <span className="font-medium text-[#23262F]">Riyadh, Saudi Arabia</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <MessageCircle className="w-[20px] h-[20px] text-gray-400 flex-shrink-0" />
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-16 text-[14px]">
                                            <span className="text-[#777E90] sm:w-20">Speak</span>
                                            <span className="font-medium text-[#23262F]">English, Arabic</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Reviews Section */}
                                <div className="border-t border-gray-200 pt-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                                        <h3 className="text-[24px] font-semibold text-[#23262F]">2 reviews</h3>
                                        <div className="flex gap-2 ">
                                            <button
                                                onClick={() => setActiveReviewTab('about')}
                                                className={`px-3 py-[6px] rounded-full text-[14px] whitespace-nowrap font-bold font-dm-sans transition-colors ${activeReviewTab === 'about'
                                                        ? 'bg-[#353945] text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                Review about you
                                            </button>
                                            <button
                                                onClick={() => setActiveReviewTab('by')}
                                                className={`px-3 py-[6px] rounded-full text-[14px] whitespace-nowrap font-bold font-dm-sans transition-colors ${activeReviewTab === 'by'
                                                        ? 'bg-[#353945] text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                Reviews by you
                                            </button>
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    <div className="space-y-7">
                                        {reviews.map(review => (
                                            <div key={review.id} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full flex-shrink-0 relative overflow-hidden">
                                                    <Image
                                                        src={review.avatar}
                                                        alt={review.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h4 className="font-medium  text-[#141416] text-[14px]">{review.name}</h4>
                                                        <div className="flex gap-0.5 flex-shrink-0">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="w-[15px] h-[15px] fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className=" text-[#23262F] text-[12px] mb-3 leading-relaxed">{review.comment}</p>
                                                    <div className="flex items-center gap-4 text-[12px]  text-[#23262F]   ">
                                                        <span className='text-[#777E90] '>{review.time}</span>
                                                        <button className="hover:text-[#23262F] font-semibold">Like</button>
                                                        <button className="hover:text-[#23262F] font-semibold">Reply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Cover Modal */}
            {showEditCoverModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 pt-16">
                    <div className="bg-white rounded-[24px] p-8  max-w-[600px] w-full relative">
                        <button
                            onClick={() => setShowEditCoverModal(false)}
                            className="absolute -top-5 -right-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* Upload Area */}
                        <div
                            onClick={() => coverInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-[24px] p-8  mb-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        >
                            <div className="flex justify-center mb-5">
                              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.5 10.002C6.5 5.58368 10.0817 2.00195 14.5 2.00195H31.1863C33.308 2.00195 35.3429 2.84481 36.8431 4.3451L40.1569 7.65881C41.6571 9.1591 42.5 11.1939 42.5 13.3157V38.002C42.5 42.4202 38.9183 46.002 34.5 46.002H14.5C10.0817 46.002 6.5 42.4202 6.5 38.002V10.002ZM38.5 16.002V38.002C38.5 40.2111 36.7091 42.002 34.5 42.002H14.5C12.2909 42.002 10.5 40.2111 10.5 38.002V10.002C10.5 7.79281 12.2909 6.00195 14.5 6.00195H28.5V10.002C28.5 13.3157 31.1863 16.002 34.5 16.002H38.5ZM38.2781 12.002C38.0817 11.4371 37.7593 10.9181 37.3284 10.4872L34.0147 7.17353C33.5839 6.74266 33.0648 6.42024 32.5 6.22383V10.002C32.5 11.1065 33.3954 12.002 34.5 12.002H38.2781Z" fill="#3B71FE"/>
<path d="M23.7344 18.1537C23.4985 18.2513 23.2775 18.396 23.0858 18.5877L17.0858 24.5877C16.3047 25.3688 16.3047 26.6351 17.0858 27.4162C17.8668 28.1972 19.1332 28.1972 19.9142 27.4162L22.5 24.8304V34.002C22.5 35.1065 23.3954 36.002 24.5 36.002C25.6046 36.002 26.5 35.1065 26.5 34.002V24.8304L29.0858 27.4162C29.8668 28.1972 31.1332 28.1972 31.9142 27.4162C32.6953 26.6351 32.6953 25.3688 31.9142 24.5877L25.9142 18.5877C25.3249 17.9984 24.4594 17.8538 23.7344 18.1537Z" fill="#3B71FE"/>
</svg>

                            </div>
                            <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#23262F] mb-2">
                                Drag and drop your photo here
                            </h3>
                            <p className="text-[16px] text-[#777E90]">or click to browse</p>
                        </div>
                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="hidden"
                        />

                        {/* Default Photos */}
                        <div className="text-center">
                            <p className="text-[12px] text-[#777E90] mb-5">Or use Portal's default photos</p>
                            <div className="flex justify-center gap-3 lg:gap-4 flex-wrap">
                                {defaultPhotos.map((photo, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDefaultPhotoSelect(photo)}
                                        className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full overflow-hidden hover:ring-4 hover:ring-blue-100 transition-all flex-shrink-0 relative"
                                    >
                                        <Image
                                            src={photo}
                                            alt={`Default ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}