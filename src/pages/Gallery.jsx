import React from "react";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Newsletter from "../components/shared/Newsletter";

const Gallery = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-pink-500">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Take a visual journey through our delicious creations. Each piece
              is crafted with love and attention to detail.
            </p>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 70"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1440,32L1440,70L0,70Z"
            ></path>
          </svg>
        </div>
      </div>

      <GalleryGrid />

      <div className="bg-pink-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Have a Dream Cake in Mind?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We love bringing your sweet visions to life. Contact us to discuss
            your custom cake design.
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              Contact Us for Custom Orders
            </a>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Gallery;
