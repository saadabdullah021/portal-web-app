import Shimmer from './Shimmer';

export default function UnitDetailsShimmer() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {/* Main large image */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
          {/* Side images */}
          <div className="lg:col-span-1 space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Rating */}
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-10 w-3/4 rounded mb-3"></div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Profile */}
            <div className="space-y-6">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 border border-gray-200 rounded-2xl p-6 space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Date inputs */}
              <div className="space-y-4">
                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Guest selector */}
              <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              
              {/* Buttons */}
              <div className="space-y-3">
                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Price breakdown */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t">
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Review cards */}
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Properties Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-96 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <Shimmer type="grid" count={4} />
        </div>
      </div>
    </div>
  );
}
