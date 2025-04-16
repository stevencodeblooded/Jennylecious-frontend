import React, { useState } from "react";
import faqData, { faqCategories } from "../../data/faq";

const FAQAccordion = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItemId, setOpenItemId] = useState(null);

  // Filter FAQs based on selected category
  const filteredFAQs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  // Toggle FAQ item open/closed
  const toggleItem = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Categories */}
        <div className="lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              FAQ Categories
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <button
                  className={`text-left w-full py-2 px-2 rounded-md ${
                    activeCategory === "all"
                      ? "bg-pink-100 text-pink-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Questions
                </button>
              </div>
              {faqCategories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <button
                    className={`text-left w-full py-2 px-2 rounded-md ${
                      activeCategory === category.id
                        ? "bg-pink-100 text-pink-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:w-3/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeCategory === "all"
              ? "Frequently Asked Questions"
              : faqCategories.find((cat) => cat.id === activeCategory)?.name}
          </h2>

          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={openItemId === faq.id}
                  >
                    <span className="font-medium text-gray-800">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        openItemId === faq.id ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openItemId === faq.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
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
                  No questions found
                </h3>
                <p className="text-gray-600">
                  There are no questions in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
