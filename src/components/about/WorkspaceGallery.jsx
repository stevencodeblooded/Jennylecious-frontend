import React, { useState } from "react";

const WorkspaceGallery = () => {
  const [currentImage, setCurrentImage] = useState(null);

  const workspaceImages = [
    {
      id: 1,
      src: "/assets/images/workspace/kitchen1.jpg",
      alt: "Our main baking area",
      description:
        "Our spacious main kitchen where we craft our signature cakes and pastries.",
    },
    {
      id: 2,
      src: "/assets/images/workspace/kitchen2.jpg",
      alt: "Decoration station",
      description:
        "The decoration station where we bring creative designs to life.",
    },
    {
      id: 3,
      src: "/assets/images/workspace/storefront.jpg",
      alt: "Our welcoming storefront",
      description:
        "Our inviting storefront where customers can browse and order our baked goods.",
    },
    {
      id: 4,
      src: "/assets/images/workspace/preparation.jpg",
      alt: "Ingredient preparation",
      description: "Fresh ingredients being prepared for our daily baking.",
    },
    {
      id: 5,
      src: "/assets/images/workspace/workshop.jpg",
      alt: "Baking workshop space",
      description:
        "Our workshop space where we host baking classes and demonstrations.",
    },
    {
      id: 6,
      src: "/assets/images/workspace/display.jpg",
      alt: "Pastry display case",
      description: "Our pastry case showcasing the day's fresh offerings.",
    },
  ];

  const openLightbox = (image) => {
    setCurrentImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setCurrentImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-pink-500">Workspace</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Take a peek inside the kitchen where the magic happens. Our bakery
            is equipped with professional equipment and designed to foster
            creativity and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaceImages.map((image) => (
            <div
              key={image.id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(image)}
            >
              <div className="relative h-64">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {currentImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
                aria-label="Close lightbox"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="bg-white p-4 mt-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {currentImage.alt}
                </h3>
                <p className="text-gray-600">{currentImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkspaceGallery;
