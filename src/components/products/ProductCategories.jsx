import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../utils/api";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category background images (would be real images in production)
  const categoryImages = {
    cakes: "/assets/images/categories/cakes.jpg",
    cupcakes: "/assets/images/categories/cupcakes.jpg",
    cookies: "/assets/images/categories/cookies.jpg",
    wedding: "/assets/images/categories/wedding.jpg",
    pastries: "/assets/images/categories/pastries.jpg",
    "dietary-specific": "/assets/images/categories/dietary.jpg",
  };

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
      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md max-w-3xl mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md max-w-2xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Unable to Load Categories
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by <span className="text-pink-500">Category</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse our delightful selection of treats, from custom cakes to
            artisanal pastries. Find the perfect sweet indulgence for any
            occasion.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={
                      category.image ||
                      categoryImages[category.slug] ||
                      "/assets/images/categories/default.jpg"
                    }
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-pink-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
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
