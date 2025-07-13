import React, { useState, useEffect } from "react";
import GalleryFilter from "./GalleryFilter";
import Lightbox from "./Lightbox";

const GalleryGrid = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock gallery data (would come from an API in production)
  useEffect(() => {
    // This would be a fetch in a real application
    const mockGalleryItems = [
      {
        id: 1,
        src: "pictures/pic-gallery-1.jpg",
        alt: "Pink Birthday Cake with Sprinkles",
        category: "birthday",
        description:
          "Three-tier pink birthday cake with rainbow sprinkles and buttercream frosting.",
      },
      {
        id: 2,
        src: "pictures/pic-gallery-2.jpg",
        alt: "Elegant Wedding Cake",
        category: "wedding",
        description:
          "Five-tier white wedding cake with delicate sugar flowers and pearl accents.",
      },
      {
        id: 3,
        src: "pictures/pic-gallery-3.jpg",
        alt: "Chocolate Cupcakes",
        category: "cupcakes",
        description:
          "Rich chocolate cupcakes with dark chocolate ganache and chocolate shavings.",
      },
      {
        id: 4,
        src: "pictures/pic-gallery-5.jpg",
        alt: "Baby Shower Cake",
        category: "special",
        description:
          "Gender reveal cake with blue and pink decorations and fondant baby shoes.",
      },
      {
        id: 5,
        src: "pictures/pic-gallery-6.jpg",
        alt: "Halloween Themed Cupcakes",
        category: "cupcakes",
        description:
          "Spooky Halloween cupcakes with orange and black frosting and themed decorations.",
      },
      {
        id: 6,
        src: "pictures/pic-gallery-7.jpg",
        alt: "Christmas Yule Log",
        category: "holiday",
        description:
          "Traditional chocolate yule log with meringue mushrooms and dusted with powdered sugar.",
      },
      {
        id: 7,
        src: "pictures/pic-gallery-8.jpg",
        alt: "Anniversary Cake",
        category: "anniversary",
        description:
          "Golden anniversary cake with edible gold leaf and hand-piped roses.",
      },
      {
        id: 8,
        src: "pictures/pic-gallery-9.jpg",
        alt: "Easter Themed Cookies",
        category: "cookies",
        description:
          "Assorted Easter cookies with royal icing decorations in spring colors.",
      },
      {
        id: 9,
        src: "pictures/pic-gallery-9.jpg",
        alt: "Rainbow Birthday Cake",
        category: "birthday",
        description:
          "Six-layer rainbow cake with white frosting and rainbow sprinkles.",
      },
      {
        id: 10,
        src: "pictures/pic-gallery-4.jpg",
        alt: "Graduation Cake",
        category: "special",
        description:
          "Graduation themed cake with diploma, cap, and school colors.",
      },
      {
        id: 11,
        src: "pictures/pic-gallery-10.jpg",
        alt: "Valentine's Day Cupcakes",
        category: "holiday",
        description:
          "Red velvet cupcakes with cream cheese frosting and heart decorations.",
      },
      {
        id: 12,
        src: "pictures/pic-gallery-1.jpg",
        alt: "Wedding Cupcake Tower",
        category: "wedding",
        description:
          "Elegant tower of wedding cupcakes in various flavors with white and silver decorations.",
      },
      {
        id: 13,
        src: "pictures/pic-gallery-2.jpg",
        alt: "Character Birthday Cake",
        category: "birthday",
        description:
          "Custom character cake for a children's birthday with fondant decorations.",
      },
      {
        id: 14,
        src: "pictures/pic-gallery-3.jpg",
        alt: "French Macarons",
        category: "cookies",
        description:
          "Assorted French macarons in pastel colors with various fillings.",
      },
      {
        id: 15,
        src: "pictures/pic-gallery-4.jpg",
        alt: "Thanksgiving Pie",
        category: "holiday",
        description:
          "Homemade pumpkin pie with decorative crust and whipped cream topping.",
      },
    ];

    setGalleryItems(mockGalleryItems);
    setFilteredItems(mockGalleryItems);
  }, []);

  // Filter gallery items based on selected category
  const handleFilterChange = (category) => {
    setActiveFilter(category);

    if (category === "all") {
      setFilteredItems(galleryItems);
    } else {
      const filtered = galleryItems.filter(
        (item) => item.category === category
      );
      setFilteredItems(filtered);
    }
  };

  // Open lightbox with selected image
  const openLightbox = (image) => {
    setCurrentImage(image);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setCurrentImage(null);
    document.body.style.overflow = "auto";
  };

  // Move to previous image in lightbox
  const prevImage = () => {
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === currentImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentImage(filteredItems[prevIndex]);
  };

  // Move to next image in lightbox
  const nextImage = () => {
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === currentImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentImage(filteredItems[nextIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Gallery filters */}
      <GalleryFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Gallery grid */}
      {/* Gallery grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(item)}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingBottom: "125%" }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {item.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Images Found
          </h3>
          <p className="text-gray-600">
            No images match your filter. Please try another category.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {currentImage && (
        <Lightbox
          image={currentImage}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
};

export default GalleryGrid;
