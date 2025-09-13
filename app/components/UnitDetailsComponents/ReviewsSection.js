'use client'
import React, { useState, useEffect } from 'react';
import {
  Star,
  Home,
  Share,
  MoreHorizontal,
  Twitter,
  Instagram,
  Facebook,
  Flag,
  Smile,
  ArrowRight,
  ChevronDown,
  Loader2,
  Loader,
  ArrowLeft
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ShareModal from '../ui/ShareModal';
import { FaXTwitter } from 'react-icons/fa6';

const ReviewsSection = ({ listingData }) => {
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
    name: listingData?.data?.host_details?.host_name || 'Host',
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



  return (
    <div className=' border-t border-gray-200 bg-[#FCFCFD]'>


      <div className="max-w-6xl 2xl:max-w-[1280px] mx-auto px-4 py-12 lg:py-24 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">

          {/* Left Side - Host Profile */}
          <div className="space-y-6 col-span-1">
            {/* Host Info */}
            <div className="bg-[#FCFCFD] rounded-3xl p-6 border border-[#E6E8EC] shadow-md">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img
                    src={hostInfo.avatar}
                    alt={hostInfo.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {hostInfo.isVerified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#23262F] font-dm-sans mb-2">{hostInfo.name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-[#23262F] text-[12px]">{hostInfo.rating}</span>
                    <span className="text-[#777E90] text-[12px]">({hostInfo.totalReviews} {t('reviews')})</span>
                  </div>


                </div>

              </div>
              <div className="flex justify-center  bg-[#F4F5F6] rounded-[20px] p-2 items-center gap-4 text-sm">
                {hostInfo.isSuperhosst && (
                  <div className="flex items-center gap-2">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.4928 3.47604L10.4998 3.47242L10.5071 3.4762L14.2183 5.70292L15.4998 6.47502V15.6667C15.4998 16.161 15.4985 16.4314 15.4826 16.6257L15.4807 16.6477L15.4587 16.6496C15.2644 16.6655 14.994 16.6667 14.4998 16.6667H6.49978C6.00556 16.6667 5.73514 16.6655 5.54083 16.6496L5.51886 16.6477L5.51695 16.6257C5.50107 16.4314 5.49978 16.161 5.49978 15.6667V6.47504L6.77658 5.70577L10.4928 3.47604ZM5.91785 4.27736L1.73772 6.78544C1.34307 7.02223 1.2151 7.53411 1.45189 7.92876C1.68868 8.32341 2.20056 8.45138 2.59521 8.21459L3.83311 7.47186V15.6667C3.83311 16.6002 3.83311 17.0669 4.01477 17.4234C4.17455 17.737 4.42952 17.992 4.74313 18.1518C5.09964 18.3334 5.56636 18.3334 6.49978 18.3334H14.4998C15.4332 18.3334 15.8999 18.3334 16.2564 18.1518C16.57 17.992 16.825 17.737 16.9848 17.4234C17.1664 17.0669 17.1664 16.6002 17.1664 15.6667V7.47183L18.4044 8.21459C18.799 8.45138 19.3109 8.32341 19.5477 7.92876C19.7845 7.53411 19.6565 7.02223 19.2619 6.78544L15.0769 4.27448L11.876 2.34591C11.6432 2.20569 11.4646 2.09809 11.3133 2.01718C11.278 1.99742 11.2421 1.97904 11.2058 1.96205C11.0798 1.90058 10.9706 1.85967 10.8584 1.83495C10.6222 1.78288 10.3774 1.78288 10.1411 1.83495C10.0286 1.85973 9.91918 1.9008 9.79281 1.96253C9.75714 1.97925 9.72192 1.9973 9.68722 2.01668C9.53567 2.09764 9.35682 2.2054 9.12361 2.34591L5.91785 4.27736Z" fill="#777E91" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3333 16.6666V13.3333C11.3333 12.873 10.9602 12.4999 10.5 12.4999C10.0398 12.4999 9.66667 12.873 9.66667 13.3333V16.6666H11.3333ZM10.5 10.8333C9.11929 10.8333 8 11.9525 8 13.3333V18.3333H13V13.3333C13 11.9525 11.8807 10.8333 10.5 10.8333Z" fill="#777E91" />
                    </svg>

                    <span className='text-[#777E90] text-sm'>{t('Superhost')}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.43563 7.44467C8.35143 7.64632 8.16159 7.784 7.94377 7.80139L3.98604 8.11745C3.46819 8.15881 3.25865 8.80547 3.65384 9.14268L6.66586 11.7128C6.83271 11.8552 6.9056 12.0791 6.85452 12.2924L5.93371 16.1376C5.81293 16.642 6.36114 17.0414 6.80421 16.7718L10.1971 14.7075C10.3833 14.5942 10.6172 14.5942 10.8035 14.7075L14.1963 16.7718C14.6394 17.0414 15.1876 16.642 15.0668 16.1376L14.146 12.2924C14.0949 12.0791 14.1678 11.8552 14.3346 11.7128L17.3467 9.14268C17.7419 8.80547 17.5323 8.15881 17.0145 8.11745L13.0567 7.80139C12.8389 7.784 12.6491 7.64632 12.5649 7.44467L11.0385 3.78915C10.8389 3.31106 10.1616 3.31106 9.96196 3.78916L8.43563 7.44467ZM13.8482 6.19263L12.5765 3.14698C11.8065 1.30289 9.19396 1.3029 8.42398 3.14698L7.15229 6.19263L3.85337 6.45607C1.85593 6.61559 1.04773 9.10987 2.57201 10.4105L5.0791 12.5498L4.31287 15.7495C3.847 17.695 5.96153 19.2355 7.67051 18.1957L10.5003 16.474L13.33 18.1957C15.039 19.2355 17.1535 17.695 16.6876 15.7495L15.9214 12.5498L18.4285 10.4105C19.9528 9.10986 19.1446 6.61558 17.1471 6.45607L13.8482 6.19263Z" fill="#777E91" />
                  </svg>

                  <span className='text-[#777E90] text-sm'>{hostInfo.totalReviews} {t('reviews')}</span>
                </div>
              </div>

              <p className="text-[#777E90] text-sm text-center leading-relaxed my-6">
                {hostInfo.description}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center items-center gap-3 mb-6">
                <button className="bg-[#23262F] text-white px-4 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium">
                  {t('Contact')}
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.99858 10.0399C9.02798 10.5914 8.60474 11.0623 8.05324 11.0917C7.30055 11.1318 6.7044 11.1809 6.23854 11.23C5.61292 11.296 5.23278 11.6803 5.16959 12.2331C5.07886 13.0267 5 14.2278 5 16C5 17.7723 5.07886 18.9733 5.16959 19.7669C5.23289 20.3207 5.61207 20.7039 6.23675 20.7698C7.33078 20.8853 9.13925 21 12 21C14.8608 21 16.6692 20.8853 17.7632 20.7698C18.3879 20.7039 18.7671 20.3207 18.8304 19.7669C18.9211 18.9733 19 17.7723 19 16C19 14.2278 18.9211 13.0267 18.8304 12.2331C18.7672 11.6803 18.3871 11.296 17.7615 11.23C17.2956 11.1809 16.6995 11.1318 15.9468 11.0917C15.3953 11.0623 14.972 10.5914 15.0014 10.0399C15.0308 9.48837 15.5017 9.06512 16.0532 9.09452C16.8361 9.13626 17.4669 9.18787 17.9712 9.24106C19.4556 9.39761 20.6397 10.4507 20.8175 12.0059C20.9188 12.8923 21 14.1715 21 16C21 17.8285 20.9188 19.1077 20.8175 19.9941C20.6398 21.5484 19.4585 22.602 17.9732 22.7588C16.7919 22.8834 14.9108 23 12 23C9.08922 23 7.20806 22.8834 6.02684 22.7588C4.54151 22.602 3.36021 21.5484 3.18253 19.9941C3.0812 19.1077 3 17.8285 3 16C3 14.1715 3.0812 12.8923 3.18253 12.0059C3.36031 10.4507 4.54436 9.39761 6.02877 9.24106C6.53306 9.18787 7.16393 9.13626 7.94676 9.09452C8.49827 9.06512 8.96918 9.48837 8.99858 10.0399Z" fill="#777E91" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 6.20711C8.81658 6.59763 8.18342 6.59763 7.79289 6.20711C7.40237 5.81658 7.40237 5.18342 7.79289 4.79289L11.2929 1.29289C11.6834 0.902369 12.3166 0.902369 12.7071 1.29289L16.2071 4.79289C16.5976 5.18342 16.5976 5.81658 16.2071 6.20711C15.8166 6.59763 15.1834 6.59763 14.7929 6.20711L13 4.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V4.41421L9.20711 6.20711Z" fill="#777E91" />
                  </svg>

                </button>

                {/* ✅ Share Modal */}
                <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <button className="p-2 hover:bg-gray-100 flex items-center rounded-full border-2 border-[#E6E8EC] transition-colors">
                  <MoreHorizontal size={20} color='#777E90' />
                </button>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {hostInfo.twitter && (
                  <a href={`https://twitter.com/${hostInfo.twitter}`} target="_blank" rel="noopener noreferrer">
                    <FaXTwitter size={20} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </a>
                )}
                {hostInfo.instagram && (
                  <a href={`https://instagram.com/${hostInfo.instagram}`} target="_blank" rel="noopener noreferrer">
                    <Instagram size={20} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </a>
                )}
                {hostInfo.facebook && (
                  <a href={`https://facebook.com/${hostInfo.facebook}`} target="_blank" rel="noopener noreferrer">
                    <Facebook size={20} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </a>
                )}
              </div>

              {/* Member Since */}
              <div className="text-[12px] text-[#777E90] border-t border-gray-200 text-center pt-4">
                {t('Member since')} {hostInfo.memberSince}
              </div>

              {/* Report Link */}
              <button className="flex items-center mx-auto gap-2 text-sm text-[#777E90] hover:text-gray-700 mt-4 transition-colors">
                <Flag size={14} />
                <span className="underline">{t('Report this host')}</span>
              </button>
            </div>
          </div>

          {/* Right Side - Reviews */}
          <div className="space-y-6 col-span-2">
            {/* Add Review */}
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
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile size={20} />
                      </button>

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
            </div>

            {/* Reviews List */}

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
                            <Loader size={16} className="animate-spin" />
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;