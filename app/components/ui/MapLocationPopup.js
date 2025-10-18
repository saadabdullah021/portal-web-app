'use client';

import { useState, useEffect, useRef } from 'react';
import { X, MapPin, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy hotel listings data
const dummyHotels = [
  {
    id: 1,
    title: "Luxury Villa in Riyadh",
    price: 250,
    lat: 24.7136,
    lng: 46.6753,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
    ],
    rating: 4.8,
    reviews: 128,
    type: "Villa",
    amenities: ["WiFi", "Pool", "Parking"],
    guests: 6,
    bedrooms: 3,
    isSuperhost: true
  },
  {
    id: 2,
    title: "Modern Apartment Downtown",
    price: 120,
    lat: 24.7242,
    lng: 46.6853,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"
    ],
    rating: 4.6,
    reviews: 89,
    type: "Apartment",
    amenities: ["WiFi", "Kitchen", "AC"],
    guests: 4,
    bedrooms: 2,
    isSuperhost: false
  },
  {
    id: 3,
    title: "Cozy Studio Near Mall",
    price: 85,
    lat: 24.7036,
    lng: 46.6653,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600"
    ],
    rating: 4.5,
    reviews: 56,
    type: "Studio",
    amenities: ["WiFi", "Kitchen"],
    guests: 2,
    bedrooms: 1,
    isSuperhost: false
  },
  {
    id: 4,
    title: "Spacious Family Home",
    price: 180,
    lat: 24.7336,
    lng: 46.6953,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
    ],
    rating: 4.9,
    reviews: 145,
    type: "House",
    amenities: ["WiFi", "Garden", "Parking"],
    guests: 8,
    bedrooms: 4,
    isSuperhost: true
  },
  {
    id: 5,
    title: "Elegant Penthouse",
    price: 320,
    lat: 24.7142,
    lng: 46.7053,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
    ],
    rating: 5.0,
    reviews: 203,
    type: "Penthouse",
    amenities: ["WiFi", "Pool", "Gym", "Parking"],
    guests: 6,
    bedrooms: 3,
    isSuperhost: true
  },
  {
    id: 6,
    title: "Beachfront Retreat",
    price: 200,
    lat: 24.6936,
    lng: 46.6553,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600"
    ],
    rating: 4.7,
    reviews: 167,
    type: "Villa",
    amenities: ["WiFi", "Beach Access", "Pool"],
    guests: 5,
    bedrooms: 3,
    isSuperhost: true
  }
];

const MapLocationPopup = ({ isOpen, onClose }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [homeMarker, setHomeMarker] = useState(null);
  const [propertyMarkers, setPropertyMarkers] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const mapRef = useRef(null);

  // Initialize map when popup opens
  useEffect(() => {
    if (isOpen && !map) {
      const timer = setTimeout(() => {
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBBl_jiztqcwHUeBDXYQJrx-OV2TM5sZ8Q&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => initMap();
          document.head.appendChild(script);
        } else {
          initMap();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset image index when property changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProperty]);

  const initMap = () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const defaultLocation = { lat: 24.7136, lng: 46.6753 };
    
    const mapInstance = new window.google.maps.Map(mapElement, {
      center: defaultLocation,
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);
    getCurrentLocation(mapInstance);
    addPropertyMarkers(mapInstance);
  };

  const getCurrentLocation = (mapInstance) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(pos);
          // Don't auto-center on initial load, just save the location
          addCustomMarker(mapInstance, pos);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Use default location if geolocation fails
          const defaultPos = { lat: 24.7136, lng: 46.6753 };
          setCurrentLocation(defaultPos);
          addCustomMarker(mapInstance, defaultPos);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Geolocation not supported
      const defaultPos = { lat: 24.7136, lng: 46.6753 };
      setCurrentLocation(defaultPos);
      addCustomMarker(mapInstance, defaultPos);
    }
  };

  const addCustomMarker = (mapInstance, position) => {
    if (homeMarker) {
      homeMarker.setMap(null);
    }

    const homeIconSvg = `
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="white" stroke="#000" stroke-width="3"/>
        <path d="M24 14l-9 9h4v9h10v-9h4l-9-9z" fill="#000"/>
      </svg>
    `;

    const newMarker = new window.google.maps.Marker({
      position: position,
      map: mapInstance,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(homeIconSvg),
        anchor: new window.google.maps.Point(24, 24),
        scaledSize: new window.google.maps.Size(48, 48),
      },
      zIndex: 1000,
    });

    setHomeMarker(newMarker);
  };

  const addPropertyMarkers = (mapInstance) => {
    propertyMarkers.forEach(marker => marker.setMap(null));
    
    const markers = [];

    dummyHotels.forEach((property) => {
      const isSelected = selectedProperty?.id === property.id;
      const isHovered = hoveredProperty?.id === property.id;
      const bgColor = (isSelected || isHovered) ? '#000000' : '#FFFFFF';
      const strokeColor = (isSelected || isHovered) ? '#000000' : '#FFFFFF';
      const textColor = (isSelected || isHovered) ? '#FFFFFF' : '#000000';
      const strokeWidth = (isSelected || isHovered) ? '3' : '2';
      const scale = (isSelected || isHovered) ? 1.1 : 1;
      
      const priceSvg = `
        <svg width="${80 * scale}" height="${36 * scale}" viewBox="0 0 80 36" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="78" height="34" rx="17" fill="${bgColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
          <text x="40" y="22" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textColor}">$${property.price}</text>
        </svg>
      `;

      const marker = new window.google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map: mapInstance,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(priceSvg),
          anchor: new window.google.maps.Point(40 * scale, 18 * scale),
          scaledSize: new window.google.maps.Size(80 * scale, 36 * scale),
        },
        title: property.title,
        optimized: false,
        zIndex: (isSelected || isHovered) ? 999 : 1,
      });

      marker.addListener('click', () => {
        setSelectedProperty(property);
        mapInstance.panTo({ lat: property.lat, lng: property.lng });
      });

      marker.addListener('mouseover', () => {
        setHoveredProperty(property);
      });

      marker.addListener('mouseout', () => {
        setHoveredProperty(null);
      });

      markers.push(marker);
    });

    setPropertyMarkers(markers);
  };

  const handleRecenterMap = () => {
    if (map && currentLocation) {
      // Smooth animation to current location
      map.panTo(currentLocation);
      map.setZoom(15);
      
      // Optional: Add a visual pulse effect to home marker
      if (homeMarker) {
        homeMarker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          homeMarker.setAnimation(null);
        }, 2000);
      }
    } else {
      // If no current location, try to get it again
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(pos);
            map.panTo(pos);
            map.setZoom(15);
            
            // Add marker if not exists
            if (!homeMarker) {
              addCustomMarker(map, pos);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Unable to get your current location. Please enable location services.');
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      }
    }
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProperty && currentImageIndex < selectedProperty.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (map && propertyMarkers.length > 0) {
      addPropertyMarkers(map);
    }
  }, [selectedProperty, hoveredProperty]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm lg:pt-12">
      <div className="relative w-full max-w-7xl h-[60vh] lg:h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn mx-4">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-white/98 backdrop-blur-xl border-b border-gray-200">
          <div className="flex items-start justify-between px-6 py-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Find Your Perfect Stay</h2>
              <p className="text-sm text-gray-500 mt-1">{dummyHotels.length} properties available</p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-full pt-20">
          <div id="map" ref={mapRef} className="w-full h-full"></div>
        </div>

        {/* Custom Controls */}
        <div className="absolute top-28 right-6 z-30 flex flex-col space-y-3">
          <button
            onClick={() => map && map.setZoom(map.getZoom() + 1)}
            className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:shadow-xl"
          >
            <span className="text-2xl font-light text-gray-700">+</span>
          </button>
          <button
            onClick={() => map && map.setZoom(map.getZoom() - 1)}
            className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:shadow-xl"
          >
            <span className="text-2xl font-light text-gray-700">−</span>
          </button>
        </div>

        {/* Current Location Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={handleRecenterMap}
            className="bg-white rounded-full shadow-xl px-6 py-3 flex items-center space-x-2 hover:shadow-2xl transition-all duration-200 border border-gray-200"
          >
            <MapPin className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-semibold whitespace-nowrap text-gray-900">Current Location</span>
          </button>
        </div>

        {/* Selected Property Card - Airbnb Style */}
        {selectedProperty && (
          <div className="absolute bottom-20 lg:bottom-1 z-50 left-1/2 transform -translate-x-1/2  w-[calc(100%-2rem)] max-w-[400px]">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
              {/* Image Carousel */}
              <div className="relative h-50 group">
                <img 
                  src={selectedProperty.images[currentImageIndex]} 
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(selectedProperty.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(selectedProperty.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                  />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Image Navigation */}
                {selectedProperty.images.length > 1 && (
                  <>
                    {currentImageIndex > 0 && (
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                    )}
                    
                    {currentImageIndex < selectedProperty.images.length - 1 && (
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    )}

                    {/* Image Dots */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                      {selectedProperty.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === currentImageIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Property Type Badge */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-xs font-semibold">{selectedProperty.type}</span>
                </div>

                {/* Superhost Badge */}
                {selectedProperty.isSuperhost && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-semibold text-gray-900">⭐ Superhost</span>
                  </div>
                )}
              </div>
              
              {/* Property Details */}
              <div className="p-5">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedProperty.title}</h3>
                    <p className="text-sm text-gray-500">{selectedProperty.guests} guests · {selectedProperty.bedrooms} bedrooms</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-50 px-2.5 py-1.5 rounded-lg ml-3">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{selectedProperty.rating}</span>
                    <span className="text-xs text-gray-500">({selectedProperty.reviews})</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProperty.amenities.map((amenity, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                      {amenity}
                    </span>
                  ))}
                </div>
                
                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">${selectedProperty.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                  <button className="bg-[#3b71fe] text-white px-8 py-3 rounded-full hover:from-pink-700 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform ">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

   
    </div>
  );
};

export default MapLocationPopup;