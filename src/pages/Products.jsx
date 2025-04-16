import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCategories from "../components/products/ProductCategories";
import ProductList from "../components/products/ProductList";
import Newsletter from "../components/shared/Newsletter";

const Products = () => {
  const location = useLocation();
  const [showCategories, setShowCategories] = useState(true);

  // Check if there's a category filter in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");

    // If a category is specified, only show the product list
    if (categoryParam) {
      setShowCategories(false);
    } else {
      setShowCategories(true);
    }
  }, [location]);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-pink-500">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Discover our artisan cakes, pastries, and sweet treats made with
              love and the finest ingredients.
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

      {/* Show either categories or product list based on URL */}
      {showCategories ? <ProductCategories /> : null}

      <ProductList />

      <Newsletter />
    </div>
  );
};

export default Products;
