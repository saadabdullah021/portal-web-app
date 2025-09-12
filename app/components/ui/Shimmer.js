'use client';

const Shimmer = ({ type = 'card', count = 6 }) => {
  const renderCardShimmer = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-2xl h-64 w-full mb-3"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
      </div>
    </div>
  );

  const renderGridShimmer = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-64 w-full mb-3"></div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSliderShimmer = () => (
    <div className="flex gap-6 overflow-hidden">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex-shrink-0 w-80 animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-64 w-full mb-3"></div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderImageCardShimmer = () => (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl"></div>
  );

  if (type === 'grid') return renderGridShimmer();
  if (type === 'slider') return renderSliderShimmer();
  if (type === 'imageCard') return renderImageCardShimmer();
  return renderCardShimmer();
};

export default Shimmer;
