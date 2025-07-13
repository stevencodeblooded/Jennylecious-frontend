import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import workspace1 from "../../assets/images/workspace/workspace1.jpg";
import workspace2 from "../../assets/images/workspace/workspace2.jpg";
import workspace3 from "../../assets/images/workspace/workspace3.jpg";
import workspace4 from "../../assets/images/workspace/workspace4.jpg";
import workspace5 from "../../assets/images/workspace/workspace5.jpg";
import workspace6 from "../../assets/images/workspace/workspace6.jpg";

const WorkspaceGallery = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxRef = useRef(null);
  const contentRef = useRef(null);

  // Use useMemo to avoid recreating the workspaceImages array on every render
  const workspaceImages = useMemo(
    () => [
      {
        id: 1,
        src: workspace1,
        alt: "Our main baking area",
        description:
          "Our spacious main kitchen where we craft our signature cakes and pastries.",
      },
      {
        id: 2,
        src: workspace2,
        alt: "Decoration station",
        description:
          "The decoration station where we bring creative designs to life.",
      },
      {
        id: 3,
        src: workspace3,
        alt: "Our welcoming storefront",
        description:
          "Our inviting storefront where customers can browse and order our baked goods.",
      },
      {
        id: 4,
        src: workspace4,
        alt: "Ingredient preparation",
        description: "Fresh ingredients being prepared for our daily baking.",
      },
      {
        id: 5,
        src: workspace5,
        alt: "Baking workshop space",
        description:
          "Our workshop space where we host baking classes and demonstrations.",
      },
      {
        id: 6,
        src: workspace6,
        alt: "Pastry display case",
        description: "Our pastry case showcasing the day's fresh offerings.",
      },
    ],
    []
  ); // Empty dependency array means this array is created only once

  const openLightbox = useCallback(
    (image) => {
      const index = workspaceImages.findIndex((img) => img.id === image.id);
      setCurrentImage(image);
      setCurrentIndex(index);
      document.body.style.overflow = "hidden";
    },
    [workspaceImages]
  );

  const closeLightbox = useCallback(() => {
    setCurrentImage(null);
    document.body.style.overflow = "auto";
  }, []);

  const navigateImages = useCallback(
    (direction) => {
      const totalImages = workspaceImages.length;
      let newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }

      setCurrentIndex(newIndex);
      setCurrentImage(workspaceImages[newIndex]);
    },
    [currentIndex, workspaceImages]
  );

  // Handle keyboard events (left/right arrows and Escape key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentImage) return;

      switch (e.key) {
        case "ArrowLeft":
          navigateImages("prev");
          break;
        case "ArrowRight":
          navigateImages("next");
          break;
        case "Escape":
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImage, navigateImages, closeLightbox]);

  // Handle outside click
  const handleLightboxClick = useCallback(
    (e) => {
      // If clicking outside of the content area, close the lightbox
      if (lightboxRef.current === e.target) {
        closeLightbox();
      }
    },
    [closeLightbox]
  );

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
          <div
            ref={lightboxRef}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleLightboxClick}
          >
            <div ref={contentRef} className="relative max-w-4xl w-full">
              {/* Close button */}
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

              {/* Previous button */}
              <button
                onClick={() => navigateImages("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 text-white hover:text-pink-300 transition-colors p-2"
                aria-label="Previous image"
              >
                <svg
                  className="w-8 h-8 lg:w-10 lg:h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={() => navigateImages("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 text-white hover:text-pink-300 transition-colors p-2"
                aria-label="Next image"
              >
                <svg
                  className="w-8 h-8 lg:w-10 lg:h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image and description */}
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
                <p className="text-gray-400 text-sm mt-2">
                  Image {currentIndex + 1} of {workspaceImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkspaceGallery;
