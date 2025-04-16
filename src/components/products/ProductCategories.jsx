import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/products";

const ProductCategories = () => {
  // Category background images (would be real images in production)
  const categoryImages = {
    cakes: "/assets/images/categories/cakes.jpg",
    cupcakes: "/assets/images/categories/cupcakes.jpg",
    cookies: "/assets/images/categories/cookies.jpg",
    wedding: "/assets/images/categories/wedding.jpg",
    pastries: "/assets/images/categories/pastries.jpg",
    "dietary-specific": "/assets/images/categories/dietary.jpg",
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={categoryImages[category.id]}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-1 group-hover:text-pink-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
