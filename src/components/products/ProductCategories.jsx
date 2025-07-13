import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../utils/api";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await productService.getCategories();
        setCategories(response.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-8 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-3 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-md max-w-lg mx-auto mb-2 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden shadow-sm h-64"
              >
                <div className="h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-3 bg-white h-24">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Unable to Load Categories
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-5 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Shop by <span className="text-pink-500">Category</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
            Browse our delightful selection of treats, from custom cakes to
            artisanal pastries.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-64 flex flex-col"
              >
                {/* Fixed height image container */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                </div>

                {/* Fixed height text container */}
                <div className="flex-grow p-3 bg-white z-10 relative -mt-5 mx-2 rounded-md shadow-sm bg-opacity-95">
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-pink-500 transition-colors line-clamp-1 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 h-8">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No categories found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCategories;
