import React from "react";

const Map = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 
        In a real application, this would be replaced with an actual Google Maps or other
        map service embed. For this example, we're using a placeholder image.
      */}
      <div className="relative h-0 pb-[56.25%]">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              Jennylecious Cakes & Bakes
            </h3>
            <p className="text-gray-500">
              123 Baker Street, Sweet City, SC 12345
            </p>
            <div className="mt-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors inline-block"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* In a real application, you would use something like: */}
      {/* 
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!..." 
        width="100%" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      */}
    </div>
  );
};

export default Map;
