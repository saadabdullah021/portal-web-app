import Shimmer from './components/ui/Shimmer';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-12 w-3/4 rounded mb-4"></div>
              <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
            </div>
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
          
          {/* Content Sections */}
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 w-96 rounded"></div>
              </div>
              <Shimmer type="grid" count={4} />
            </div>
            
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 w-96 rounded"></div>
              </div>
              <Shimmer type="slider" count={4} />
            </div>
            
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-8 w-64 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 w-96 rounded"></div>
              </div>
              <Shimmer type="grid" count={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
