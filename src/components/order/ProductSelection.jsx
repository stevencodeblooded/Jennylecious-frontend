import React, { useState } from "react";
import products, { categories } from "../../data/products";
import Card from "../shared/Card";

const ProductSelection = ({ selectedProductId, onSelectProduct, error }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    // Category filter
    const categoryMatch =
      activeCategory === "all" || product.category === activeCategory;

    // Search filter
    const searchMatch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="mb-6">
      {/* Search and Category Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-wrap gap-2">
            <button
              className={`
                px-3 py-1 rounded-full text-sm
                ${
                  activeCategory === "all"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`
                  px-3 py-1 rounded-full text-sm
                  ${
                    activeCategory === category.id
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`
                cursor-pointer transition-transform duration-200
                ${
                  selectedProductId === product.id
                    ? "transform scale-[1.02]"
                    : ""
                }
              `}
              onClick={() => onSelectProduct(product.id.toString())}
            >
              <Card
                hover={true}
                elevation={selectedProductId === product.id ? "lg" : "md"}
                className={`
                  h-full
                  ${
                    selectedProductId === product.id
                      ? "ring-2 ring-pink-500"
                      : ""
                  }
                `}
              >
                <Card.Image src={product.image} alt={product.name} />
                <Card.Body>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <span className="text-pink-500 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.customizable && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Customizable
                      </span>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchTerm("");
            }}
            className="text-pink-500 font-medium hover:text-pink-600 transition-colors"
          >
            Reset all filters
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ProductSelection;
