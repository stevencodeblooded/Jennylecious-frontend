import React, { useState } from "react";

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  console.log(mapLoaded)

  // Your business location coordinates (replace with your actual coordinates)
  const latitude = -1.2921; // Example coordinates for Nairobi
  const longitude = 36.8219;
  const businessName = "Jennylecious Cakes & Bakes";
  const businessAddress = "123 Baker Street, Nairobi, Kenya";

  // Google Maps embed URL with your location
  // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
  //   businessName
  // )}&center=${latitude},${longitude}&zoom=16`;

  // Alternative URL that doesn't require API key (less customizable but works)
  const alternativeMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  // Handle iframe load event
  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  // Handle iframe error
  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-0 pb-[56.25%]">
        {/* The iframe for the Google Maps embed */}
        {!mapError ? (
          <iframe
            src={alternativeMapUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={handleMapLoad}
            onError={handleMapError}
            title="Jennylecious Cakes & Bakes Location"
          ></iframe>
        ) : (
          // Fallback content in case map fails to load
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
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
                {businessName}
              </h3>
              <p className="text-gray-500">{businessAddress}</p>
              <div className="mt-4">
                <a
                  href={`https://maps.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors inline-block"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Business information card */}
      <div className="p-4 bg-white border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-1">
          {businessName}
        </h3>
        <p className="text-gray-600 mb-2">{businessAddress}</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://maps.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-pink-500 text-white text-sm rounded-md hover:bg-pink-600 transition-colors inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            Get Directions
          </a>
          <a
            href="tel:+254712345678"
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call
          </a>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          <p>
            <span className="font-medium">Hours:</span> Mon-Fri: 9AM-6PM, Sat-Sun:
            10AM-4PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
