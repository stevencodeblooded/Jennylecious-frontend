import React from "react";
import Button from "../shared/Button";

const ServicesOverview = () => {
  const services = [
    {
      id: "custom-cakes",
      title: "Custom Cakes",
      description:
        "Personalized cakes designed specifically for your special occasion. From birthdays to anniversaries, we create edible works of art.",
      icon: (
        <svg
          className="w-12 h-12 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
          />
        </svg>
      ),
    },
    {
      id: "wedding-cakes",
      title: "Wedding Cakes",
      description:
        "Elegant, multi-tiered cakes to make your wedding day extra special. We work closely with you to design the perfect centerpiece.",
      icon: (
        <svg
          className="w-12 h-12 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      id: "dessert-tables",
      title: "Dessert Tables",
      description:
        "Complete sweet spreads for events featuring a variety of treats including cupcakes, cookies, pastries, and more.",
      icon: (
        <svg
          className="w-12 h-12 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      id: "workshops",
      title: "Baking Workshops",
      description:
        "Learn the art of baking with our hands-on workshops. Perfect for individuals, groups, and team-building events.",
      icon: (
        <svg
          className="w-12 h-12 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-pink-500">Services</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From custom cakes to dessert tables and baking workshops, we offer a
            range of services to sweeten your celebrations and events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-6 shadow-md transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-pink-100 p-3 rounded-full">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/contact" variant="secondary" size="lg">
            Inquire About Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
