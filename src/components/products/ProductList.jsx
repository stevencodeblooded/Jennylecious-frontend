import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import products, { categories } from "../../data/products";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState([]);

  // Filter products based on category, search term, and dietary filters
  useEffect(() => {
    let result = products;

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    // Dietary filters
    if (dietaryFilter.length > 0) {
      result = result.filter((product) => {
        if (
          dietaryFilter.includes("gluten-free") &&
          product.allergens.includes("Gluten")
        ) {
          return false;
        }
        if (
          dietaryFilter.includes("nut-free") &&
          product.allergens.includes("Nuts")
        ) {
          return false;
        }
        if (
          dietaryFilter.includes("vegan") &&
          (product.allergens.includes("Eggs") ||
            product.allergens.includes("Dairy"))
        ) {
          return false;
        }
        return true;
      });
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, dietaryFilter]);

  // Handle dietary filter changes
  const handleDietaryFilterChange = (filter) => {
    if (dietaryFilter.includes(filter)) {
      setDietaryFilter(dietaryFilter.filter((item) => item !== filter));
    } else {
      setDietaryFilter([...dietaryFilter, filter]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
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

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <button
                  className={`text-left w-full py-2 px-2 rounded-md ${
                    selectedCategory === "all"
                      ? "bg-pink-100 text-pink-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Products
                </button>
              </div>
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <button
                    className={`text-left w-full py-2 px-2 rounded-md ${
                      selectedCategory === category.id
                        ? "bg-pink-100 text-pink-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Dietary Preferences
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="gluten-free"
                  checked={dietaryFilter.includes("gluten-free")}
                  onChange={() => handleDietaryFilterChange("gluten-free")}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                />
                <label htmlFor="gluten-free" className="ml-2 text-gray-700">
                  Gluten-Free
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="nut-free"
                  checked={dietaryFilter.includes("nut-free")}
                  onChange={() => handleDietaryFilterChange("nut-free")}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                />
                <label htmlFor="nut-free" className="ml-2 text-gray-700">
                  Nut-Free
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vegan"
                  checked={dietaryFilter.includes("vegan")}
                  onChange={() => handleDietaryFilterChange("vegan")}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                />
                <label htmlFor="vegan" className="ml-2 text-gray-700">
                  Vegan
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
              {selectedCategory === "all"
                ? "All Products"
                : categories.find((cat) => cat.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setDietaryFilter([]);
                }}
                className="text-pink-500 font-medium hover:text-pink-600 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
