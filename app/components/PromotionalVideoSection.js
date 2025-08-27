'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const PromotionalVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
    <section className="w-full bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              SUBTITLE
            </p>
            <h2 className="heading leading-tight">
              Promotional video goes<br />here
            </h2>
          </div>
          <button className="bg-[#3B71FE] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-[90px] transition-colors duration-200 transform text-[16px]">
                Book Now
              </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2387CEEB;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23F0F8FF;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Cg transform='translate(600,337.5)'%3E%3Crect x='-80' y='200' width='160' height='40' rx='20' fill='%23D2691E'/%3E%3Crect x='-80' y='200' width='160' height='40' rx='20' fill='none' stroke='%23A0522D' stroke-width='2'/%3E%3Crect x='-75' y='205' width='150' height='30' rx='15' fill='%23DEB887'/%3E%3Cpath d='M -75,205 Q -75,190 -60,190 L 60,190 Q 75,190 75,205' fill='none' stroke='%23A0522D' stroke-width='1'/%3E%3Crect x='-80' y='240' width='160' height='40' rx='20' fill='%23D2691E'/%3E%3Crect x='-80' y='240' width='160' height='40' rx='20' fill='none' stroke='%23A0522D' stroke-width='2'/%3E%3Crect x='-75' y='245' width='150' height='30' rx='15' fill='%23DEB887'/%3E%3Cpath d='M -75,245 Q -75,230 -60,230 L 60,230 Q 75,230 75,245' fill='none' stroke='%23A0522D' stroke-width='1'/%3E%3Cpath d='M -40,-100 L 40,-100 Q 80,-100 80,-60 L 80,60 Q 80,100 40,100 L -40,100 Q -80,100 -80,60 L -80,-60 Q -80,-100 -40,-100 Z' fill='%23F5DEB3'/%3E%3Cpath d='M -30,-80 L 30,-80 Q 60,-80 60,-50 L 60,50 Q 60,80 30,80 L -30,80 Q -60,80 -60,50 L -60,-50 Q -60,-80 -30,-80 Z' fill='%23D2691E'/%3E%3Cpath d='M -20,-60 L 20,-60 Q 40,-60 40,-40 L 40,40 Q 40,60 20,60 L -20,60 Q -40,60 -40,40 L -40,-40 Q -40,-60 -20,-60 Z' fill='%23DEB887'/%3E%3Ccircle cx='0' cy='-150' r='100' fill='%23F5DEB3'/%3E%3Cpath d='M -60,-180 Q -60,-200 -40,-200 L 40,-200 Q 60,-200 60,-180 L 60,-120 Q 60,-100 40,-100 L -40,-100 Q -60,-100 -60,-120 Z' fill='none' stroke='%23DEB887' stroke-width='8' fill='%23F5DEB3'/%3E%3Cpath d='M -200,50 L -120,80 Q -100,90 -100,110 L -100,150' fill='none' stroke='%23DEB887' stroke-width='12' stroke-linecap='round'/%3E%3Cpath d='M 200,50 L 120,80 Q 100,90 100,110 L 100,150' fill='none' stroke='%23DEB887' stroke-width='12' stroke-linecap='round'/%3E%3Cellipse cx='0' cy='350' rx='300' ry='20' fill='%23F4E4BC' opacity='0.7'/%3E%3C/g%3E%3Cpath d='M 50,400 Q 200,380 350,400 T 650,400 T 950,400 T 1150,400' fill='none' stroke='%2300BFFF' stroke-width='3' opacity='0.6'/%3E%3Cpath d='M 100,450 Q 250,430 400,450 T 700,450 T 1000,450 T 1100,450' fill='none' stroke='%2300BFFF' stroke-width='2' opacity='0.4'/%3E%3Cpath d='M 0,500 Q 150,480 300,500 T 600,500 T 900,500 T 1200,500' fill='none' stroke='%2300BFFF' stroke-width='4' opacity='0.8'/%3E%3Cpath d='M 800,100 Q 850,120 900,100 T 1000,100' fill='none' stroke='%23708090' stroke-width='15' opacity='0.5'/%3E%3Cpath d='M 850,80 Q 900,100 950,80 T 1050,80' fill='none' stroke='%23708090' stroke-width='10' opacity='0.3'/%3E%3C/svg%3E"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
            preload="metadata"
          >
            <source src="/api/placeholder-video" type="video/mp4" />
            Your browser does not support the video tag.
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

        {/* Optional: Video Description */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 leading-relaxed">
            Experience the perfect getaway with our premium beach resort services. 
            Relax in luxury while enjoying pristine beaches and world-class amenities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromotionalVideoSection;