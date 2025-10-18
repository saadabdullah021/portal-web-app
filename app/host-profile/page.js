'use client';

import { useState, useRef, useEffect } from 'react';
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
    Facebook,
    ChevronDown,
    Loader
} from 'lucide-react';
import Image from 'next/image';
import { RiTwitterXFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import JustForYouSection from '../components/HomeComponents/JustForYouSection';
import { useAppSelector } from "../../store/hooks";

export default function HostProfilePage({ listingData, isAuthenticated }) {



 const [similarProperties, setSimilarProperties] = useState();
  const { t, i18n } = useTranslation("hero");
  const isRTL = i18n.language === 'ar';
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sortBy, setSortBy] = useState('Newest');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");








  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
 
  
  const hasFetchedRef = useRef(false);
  const lastLanguageRef = useRef(i18n.language || 'en');

  useEffect(() => {
    // Ensure we have a valid language
    const currentLanguage = i18n.language || 'en';
    
    // Check if language actually changed or if this is the first load
    const languageChanged = lastLanguageRef.current !== currentLanguage;
    const isFirstLoad = !hasFetchedRef.current;
    
    if (!languageChanged && !isFirstLoad) {
      return;
    }

    // Update the last language
    lastLanguageRef.current = currentLanguage;


    const fetchListingData = async () => {
 


      try {
        setLoading(true);
        
        // Add minimum loading time to ensure loader is visible
        const [data] = await Promise.all([
    
          new Promise(resolve => setTimeout(resolve, 1000)) // Minimum 1 second loading
        ]);
        
        setListingData(data);
        
        // Cache the data with language-specific key
        // localStorage.setItem(cacheKey, JSON.stringify(data));
        // localStorage.setItem(`${cacheKey}_time`, now.toString());
        
        if (data?.data?.listing_id) {
          const similarResponse = await axios.get(`/get-similar-listings?listing_id=${data.data.listing_id}`, {
            headers: {
              'Accept-Language': currentLanguage
            }
          });
          setSimilarProperties(similarResponse.data);
          
          // Cache similar properties with language-specific key
          // localStorage.setItem(similarCacheKey, JSON.stringify(similarData));
          // localStorage.setItem(`${similarCacheKey}_time`, now.toString());
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing details');
      } finally {
        setLoading(false);
        hasFetchedRef.current = true;
      }
    };

    fetchListingData();
  }, [ i18n.language || 'en']);

  
  // Function to format host name as "First Name + Last Initial"
  const formatHostName = (fullName) => {
    if (!fullName) return 'Host';
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0];
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `${firstName} ${lastName.charAt(0)}.`;
  };




  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Ali Ghanem',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
      timeAgo: 'about 1 hour ago',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      name: 'Asad Adam',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      comment: 'Consectetur adipiscing elit. Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
      timeAgo: 'about 1 hour ago',
      likes: 8,
      isLiked: false
    },
    {
      id: 3,
      name: 'Ahmed Mohammed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      comment: 'Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
      timeAgo: '1 day ago',
      likes: 15,
      isLiked: true
    },
    {
      id: 4,
      name: 'Ahmed Mohammed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      comment: 'Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
      timeAgo: '1 day ago',
      likes: 15,
      isLiked: true
    },
    {
      id: 5,
      name: 'Ahmed Mohammed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      comment: 'Cras nec arcu vel orci aliquam suscipit. Quisque in mattis diam.',
      timeAgo: '1 day ago',
      likes: 15,
      isLiked: true
    }
  ]);

  const hostInfo = {
    name: formatHostName(listingData?.data?.host_details?.host_name),
    avatar: listingData?.data?.host_details?.host_profile_picture || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    rating: parseFloat(listingData?.data?.host_details?.host_ratings) || 0,
    totalReviews: listingData?.data?.host_details?.host_reviews || '0',
    isSuperhosst: listingData?.data?.host_details?.host_type === 'Super Host',
    memberSince: listingData?.data?.host_details?.joined_at || '',
    description: listingData?.data?.host_details?.personal_bio || '',
    isVerified: true,
    facebook: listingData?.data?.host_details?.host_facebook_profile || '',
    instagram: listingData?.data?.host_details?.host_instagram_profile || '',
    twitter: listingData?.data?.host_details?.host_twitter_profile || ''
  };

  const handleLikeReview = (reviewId) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? {
            ...review,
            isLiked: !review.isLiked,
            likes: review.isLiked ? review.likes - 1 : review.likes + 1
          }
          : review
      )
    );
  };


  const handleSubmitReview = () => {
    if (reviewText.trim() && selectedRating > 0) {
      const newReview = {
        id: reviews.length + 1,
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        rating: selectedRating,
        comment: reviewText,
        timeAgo: 'just now',
        likes: 0,
        isLiked: false
      };

      setReviews(prev => [newReview, ...prev]);
      setReviewText('');
      setSelectedRating(0);
    }
  };

  const renderStars = (rating, interactive = false, size = 16) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={size}
        className={`${index < (interactive ? (hoverRating || selectedRating) : rating)
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
        onClick={interactive ? () => setSelectedRating(index + 1) : undefined}
        onMouseEnter={interactive ? () => setHoverRating(index + 1) : undefined}
        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
      />
    ));
  };

  // reviews slice logic
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShowAllReviews(true);
      setIsLoadingMore(false);
    }, 1500); // 1.5 sec loader simulation
  };









    const [showEditCoverModal, setShowEditCoverModal] = useState(false);
    const [activeReviewTab, setActiveReviewTab] = useState('about');
    const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=400&fit=crop');
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop');

    const coverInputRef = useRef(null);
    const profileInputRef = useRef(null);


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
                                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.9928 3.47598L9.99978 3.47236L10.0071 3.47614L13.7183 5.70286L14.9998 6.47496V15.6667C14.9998 16.1609 14.9985 16.4313 14.9826 16.6256L14.9807 16.6476L14.9587 16.6495C14.7644 16.6654 14.494 16.6667 13.9998 16.6667H5.99978C5.50556 16.6667 5.23514 16.6654 5.04083 16.6495L5.01886 16.6476L5.01695 16.6256C5.00107 16.4313 4.99978 16.1609 4.99978 15.6667V6.47498L6.27658 5.70571L9.9928 3.47598ZM5.41785 4.2773L1.23772 6.78538C0.84307 7.02217 0.715099 7.53405 0.95189 7.9287C1.18868 8.32335 1.70056 8.45132 2.09521 8.21453L3.33311 7.4718V15.6667C3.33311 16.6001 3.33311 17.0668 3.51477 17.4233C3.67455 17.7369 3.92952 17.9919 4.24313 18.1517C4.59964 18.3334 5.06636 18.3334 5.99978 18.3334H13.9998C14.9332 18.3334 15.3999 18.3334 15.7564 18.1517C16.07 17.9919 16.325 17.7369 16.4848 17.4233C16.6664 17.0668 16.6664 16.6001 16.6664 15.6667V7.47177L17.9044 8.21453C18.299 8.45132 18.8109 8.32335 19.0477 7.9287C19.2845 7.53405 19.1565 7.02217 18.7619 6.78538L14.5769 4.27441L11.376 2.34585C11.1432 2.20563 10.9646 2.09803 10.8133 2.01712C10.778 1.99736 10.7421 1.97898 10.7058 1.96199C10.5798 1.90052 10.4706 1.85961 10.3584 1.83489C10.1222 1.78282 9.87738 1.78282 9.6411 1.83489C9.52864 1.85967 9.41918 1.90074 9.29281 1.96247C9.25714 1.97919 9.22192 1.99723 9.18722 2.01662C9.03567 2.09758 8.85682 2.20534 8.62361 2.34584L5.41785 4.2773Z" fill="#777E91" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.8333 16.6666V13.3333C10.8333 12.8731 10.4602 12.5 10 12.5C9.53976 12.5 9.16667 12.8731 9.16667 13.3333V16.6666H10.8333ZM10 10.8333C8.61929 10.8333 7.5 11.9526 7.5 13.3333V18.3333H12.5V13.3333C12.5 11.9526 11.3807 10.8333 10 10.8333Z" fill="#777E91" />
                  </svg>
                                        <span>Superhost</span>
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
                                    <h2 className="text-[18px] lg:text-[24px] font-semibold text-[#23262F] leading-tight">About Faisal</h2>
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




{similarProperties && (
  <div className="mb-5">
    <p>heroo</p>
    {(similarProperties.items?.records || []).length < 5 && (
      <JustForYouSection 
        items={similarProperties.items?.records || []} 
        sectionData={{
          component_title: similarProperties.component_title || "Similar Properties Nearby",
          component_description: similarProperties.component_description || "Discover similar properties in this area that match your preferences. Perfect for your next stay or booking.",
          items: similarProperties.items || { totalRecords: 0, perPage: 0 }
        }} 
      />
    )}
  </div>
)}





                                {/* Reviews Section */}
                                <div className="border-t border-gray-200 pt-8">
                        {/* Right Side - Reviews */}
          <div className="space-y-6 col-span-2">
            {/* Add Review */}
            {
              isAuthenticated && (
                <div className=" px-2 py-6 lg:p-6 ">
                  <h3 className="text-2xl font-semibold text-[#23262F] mb-4">{t('Add a review')}</h3>

                  <div className='flex lg:flex-row flex-col items-start lg:items-center lg:justify-between'>

                    <p className="text-[#777E90] mb-4">
                      {t('Be the first to review')} <span className="text-[#23262F] font-medium">{listingData?.data?.title || "Property"}</span>
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      {renderStars(selectedRating, true, 24)}
                    </div>
                  </div>
                  {
                    isAuthenticated &&
                    <div className="w-full pt-2 lg:pt-6">
                      {/* Review Input */}
                      <div className="relative bg-gray-50 rounded-3xl border-2 border-[#E6E8EC] p-4">
                        <div className="flex items-center justify-between">
                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your thoughts"
                            rows={1}
                            className="flex-1 bg-transparent resize-none focus:outline-none placeholder-[#777E90] text-gray-700"
                            style={{ minHeight: '24px' }}
                          />

                          <div className="flex items-center gap-3 ml-4">
                            {/* Smile button for emojies*/}
                            {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile size={20} />
                      </button> */}
                            <EmojiPickerDropdown
                              onEmojiSelect={(emoji) => setReviewText((prev) => prev + emoji)}
                            />
                            <button
                              onClick={handleSubmitReview}
                              disabled={!reviewText.trim()}
                              className="bg-[#3B71FE] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-full font-bold font-dm-sans transition-colors flex items-center gap-2 text-sm"
                            >
                              {t('Post it')}!

                              {isRTL ? (
                                <ArrowLeft size={14} />
                              ) : (
                                <ArrowRight size={14} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                </div>
              )
            }


            {/* Reviews List */}
            {
              true && (
                <div className="space-y-6">
                  {/* Reviews List */}
                  <div className="pb-6 px-6 ">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-[#23262F]">
                        {listingData?.data?.reviews || reviews.length} {t('reviews')}
                      </h3>

                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-[120px] lg:w-[160px] h-[48px] appearance-none bg-transparent border-2 text-[#23262F] text-sm font-medium border-[#E6E8EC] rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-none"
                        >
                          <option value="Newest">Newest</option>
                          <option value="Oldest">Oldest</option>
                          <option value="Highest">Highest</option>
                          <option value="Lowest">Lowest</option>
                        </select>
                        <ChevronDown size={24} className="absolute right-2  top-1/2  border-2 border-[#E6E8EC] rounded-full -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {visibleReviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            />

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm text-[#141416]">{review.name}</h4>
                                <div className="flex items-center gap-1">
                                  {renderStars(review.rating, false, 14)}
                                </div>
                              </div>

                              <p className="text-[#353945] text-sm font-normal mb-3 leading-relaxed">{review.comment}</p>

                              <div className="flex items-center gap-4 text-sm font-semibold text-[#23262F]">
                                <span className='text-[#777E90] text-[12px] font-normal'>{review.timeAgo}</span>
                                <button
                                  onClick={() => handleLikeReview(review.id)}
                                  className={`hover:text-gray-700 transition-colors ${review.isLiked ? 'text-blue-600 font-medium' : ''
                                    }`}
                                >
                                  {t('Like')} {review.likes > 0 && `(${review.likes})`}
                                </button>
                                {/* Reploy button */}
                                <button
                                  onClick={() => setActiveReplyId(activeReplyId === review.id ? null : review.id)}
                                  className="hover:text-gray-700 transition-colors">
                                  {t('Reply')}
                                </button>

                                {/* Reply Box */}

                              </div>
                              {activeReplyId === review.id && (
                                <div className="mt-5 w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
                                  <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write your reply..."
                                    rows={3}
                                    maxLength={300}
                                    className="w-full resize-none bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                                  />
                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-500">{replyText.length}/300</span>
                                    <button
                                      onClick={() => {
                                        if (replyText.trim()) {
                                          // Reply submitted - implement save logic here
                                          setReplyText("");
                                          setActiveReplyId(null);
                                        }
                                      }}
                                      className="px-4 py-2 bg-[#3B71FE] hover:bg-blue-700 text-white rounded-full text-xs font-medium transition-colors"
                                    >
                                      {t('Send')}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Load More Button */}
                      {!showAllReviews && reviews.length > 3 && (
                        <div className="flex justify-center pt-6">
                          <button
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="px-6 py-2 border-2 border-[#E6E8EC]  rounded-full text-[#23262F] text-sm font-bold font-dm-sans  inline-flex items-center gap-3  bg-white  hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          >

                            {isLoadingMore ? (
                              <>
                                <Shimmer type="card" count={1} />
                                <span>{t('Loading comments')}...</span>
                              </>
                            ) : (
                              <>
                                <Loader size={16} />
                                <span>{t('Loading comments')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            }


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