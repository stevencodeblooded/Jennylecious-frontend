import React, { useEffect } from "react";

const Lightbox = ({ image, onClose, onPrev, onNext }) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
          aria-label="Close lightbox"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main image */}
        <div className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto rounded-lg shadow-2xl"
          />

          {/* Navigation buttons */}
          <button
            onClick={onPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Image details */}
        <div className="bg-white p-4 mt-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">{image.alt}</h3>
          <p className="text-gray-600">{image.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
