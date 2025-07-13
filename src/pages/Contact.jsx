import React from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import Map from "../components/contact/Map";
import Newsletter from "../components/shared/Newsletter";

const Contact = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get in <span className="text-pink-500">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Have questions or want to place an order? We'd love to hear from
              you. Reach out to us using the information below.
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

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactForm />
          <ContactInfo />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Us</h2>
          <Map />
        </div>

        <div className="bg-pink-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Visit Our Shop
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We invite you to visit our bakery to experience the aroma of freshly
            baked goods and see our creations in person. Our friendly staff is
            always ready to help you choose the perfect treat for any occasion.
          </p>
          <div className="inline-flex items-center text-pink-500">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">
              Our business hours can be found in the contact information above.
            </span>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Contact;
