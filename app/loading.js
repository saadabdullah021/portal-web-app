export default function Loading() {
  return (
    <div className="fixed inset-0 h-screen w-full bg-white z-50 flex items-center justify-center">
      <div className="ch-loading-spinner-wrapper">
        <div className="ch-loading-spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="loading-text">LOADING...</div>
        </div>
      </div>
    </div>
  );
}