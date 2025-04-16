import React from "react";
import FAQAccordion from "../components/faq/FAQAccordion";
import Button from "../components/shared/Button";
import Newsletter from "../components/shared/Newsletter";

const FAQ = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Frequently Asked <span className="text-pink-500">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Find answers to the most common questions about our products,
              ordering process, and more.
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

      <FAQAccordion />

      <div className="bg-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find the answer you're looking for? Please feel free to reach
            out to our customer support team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" size="lg">
              Contact Us
            </Button>
            <Button href="tel:+1234567890" variant="outline" size="lg">
              Call Us: (123) 456-7890
            </Button>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default FAQ;
