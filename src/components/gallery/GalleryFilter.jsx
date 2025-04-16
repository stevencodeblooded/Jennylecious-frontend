import React from "react";

const GalleryFilter = ({ activeFilter, onFilterChange }) => {
  // Gallery categories
  const categories = [
    { id: "all", name: "All" },
    { id: "birthday", name: "Birthday Cakes" },
    { id: "wedding", name: "Wedding Cakes" },
    { id: "cupcakes", name: "Cupcakes" },
    { id: "cookies", name: "Cookies" },
    { id: "holiday", name: "Holiday Specials" },
    { id: "anniversary", name: "Anniversary" },
    { id: "special", name: "Special Occasions" },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Browse Our <span className="text-pink-500">Gallery</span>
      </h2>

      {/* Desktop filters */}
      <div className="hidden md:flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`
              px-4 py-2 rounded-full transition-colors
              ${
                activeFilter === category.id
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Mobile dropdown filter */}
      <div className="md:hidden mb-6">
        <select
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GalleryFilter;
