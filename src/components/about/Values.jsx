import React from "react";

const Values = () => {
  const valuesData = [
    {
      id: "quality",
      title: "Quality",
      description:
        "We use only the finest ingredients, sourced locally whenever possible. No artificial preservatives or flavors - just pure, delicious ingredients.",
      icon: (
        <svg
          className="w-16 h-16 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      id: "creativity",
      title: "Creativity",
      description:
        "We approach each creation as a unique opportunity to craft something special. We love to innovate and bring fresh ideas to the table.",
      icon: (
        <svg
          className="w-16 h-16 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: "passion",
      title: "Passion",
      description:
        "Baking is our passion. We pour our heart and soul into every creation, treating each one as if it were for our own celebration.",
      icon: (
        <svg
          className="w-16 h-16 text-pink-500"
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
      id: "community",
      title: "Community",
      description:
        "We value our place in the community and strive to give back through partnerships with local organizations and charitable initiatives.",
      icon: (
        <svg
          className="w-16 h-16 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-pink-500">Values</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do at Jennylecious Cakes &
            Bakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuesData.map((value) => (
            <div
              key={value.id}
              className="bg-white rounded-lg p-8 shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-600 italic">
            "To create delicious, beautiful, and memorable baked goods that
            bring joy to our customers, while fostering a positive workplace and
            contributing to our community."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Values;
