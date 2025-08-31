'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PromotionalVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const { t } = useTranslation('home');

  // Handle play/pause
  const togglePlay = () => {
  if (!videoRef.current) return;

  if (isPlaying) {
    videoRef.current.pause();
  } else {
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Play failed:", error);
      });
    }
  }
};


  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  // Update progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Load metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              {t('promotionalvideo.subtitle')}
            </p>
            <h2 className="heading leading-tight">
              {t('promotionalvideo.title')}
            </h2>
          </div>
          <button className="bg-[#3B71FE] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-[90px] transition-colors duration-200 transform text-[16px]">
            {t('buttons.book_now')}
              </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group">
          {/* Video Element */}
       <video
  ref={videoRef}
  className="w-full h-full object-cover"
  muted
  playsInline
  preload="metadata"
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleLoadedMetadata}
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
>
  <source src="https://youtu.be/evqnIKVX8RM" type="video/mp4" />
</video>


          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <button
                onClick={togglePlay}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 sm:p-6 transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                <Play className="w-8 h-8 sm:w-12 sm:h-12 text-gray-800 ml-1" />
              </button>
            </div>
          )}

          {/* Video Controls */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="w-full h-2 bg-white bg-opacity-30 rounded-full mb-4 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button 
                  onClick={togglePlay}
                  className="hover:text-blue-400 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
                
                <button 
                  onClick={toggleMute}
                  className="hover:text-blue-400 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>

                <span className="text-sm font-medium hidden sm:inline">
                  {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                </span>
              </div>

              <button 
                onClick={toggleFullscreen}
                className="hover:text-blue-400 transition-colors"
              >
                <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

  
      </div>
    </section>
  );
};

export default PromotionalVideoSection;