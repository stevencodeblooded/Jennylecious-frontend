import React from "react";
import Button from "../shared/Button";

const GalleryPreview = () => {
  // Mock gallery images (would come from a real gallery in production)
  const previewImages = [
    {
      id: 1,
      src: "/pictures/gallery1.jpg",
      alt: "Birthday cake with colorful frosting",
      category: "Birthday",
    },
    {
      id: 2,
      src: "/pictures/gallery5.jpg",
      alt: "Elegant wedding cake with flowers",
      category: "Wedding",
    },
    {
      id: 3,
      src: "/pictures/gallery3.jpg",
      alt: "Chocolate cupcakes with buttercream",
      category: "Cupcakes",
    },
    {
      id: 4,
      src: "/pictures/gallery4.jpg",
      alt: "Custom themed cake for children",
      category: "Custom",
    },
    {
      id: 5,
      src: "/pictures/gallery2.jpg",
      alt: "French pastries assortment",
      category: "Pastries",
    },
    {
      id: 6,
      src: "/pictures/gallery6.jpg",
      alt: "Anniversary celebration cake",
      category: "Anniversary",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-pink-500">Gallery</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Take a peek at some of our most beloved creations. Each piece is
            crafted with passion and precision.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white font-medium">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/gallery" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
