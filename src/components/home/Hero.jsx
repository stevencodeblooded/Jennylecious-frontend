import React from "react";
import Button from "../shared/Button";
import cakes from '../../assets/images/products/cake1.png'

const Hero = () => {
  const handleExploreMenu = () => {
    window.location.href = "/products";
  };

  const handleOrderNow = () => {
    window.location.href = "/order";
  };

  return (
    <div className="relative bg-pink-50 overflow-hidden z-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('cake-bg-1.jpg')",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-left relative z-30">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Delicious <span className="text-pink-500">Cakes</span> &{" "}
              <span className="text-orange-400">Bakes</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Handcrafted with love for all your special moments. From birthday
              cakes to wedding treats, we make every occasion sweeter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 relative z-40">
              <Button onClick={handleExploreMenu} size="lg">
                Explore Our Menu
              </Button>
              <Button onClick={handleOrderNow} variant="outline" size="lg">
                Order Now
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 relative z-30">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={cakes}
                alt="Beautifully decorated cake"
                className="w-full h-auto"
              />

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg z-50">
                Handmade
              </div>
              <div className="absolute top-1/2 -left-6 bg-orange-400 text-white text-sm font-bold px-4 py-2 rounded-full transform -rotate-12 shadow-lg z-50">
                Fresh Daily
              </div>
              <div className="absolute -bottom-4 right-12 bg-yellow-400 text-white text-sm font-bold px-4 py-2 rounded-full transform rotate-6 shadow-lg z-50">
                Custom Orders
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
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
  );
};

export default Hero;
