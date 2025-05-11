import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { productService } from "../../utils/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Similar products for recommendations
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch the product details
        const response = await productService.getProductById(id);
        const foundProduct = response.data.data;

        if (foundProduct) {
          setProduct(foundProduct);

          // Initialize selected options with defaults
          const initialOptions = {};
          if (foundProduct.options) {
            foundProduct.options.forEach((option) => {
              initialOptions[option.name] = option.choices[0];
            });
          }
          setSelectedOptions(initialOptions);

          // Fetch products from the same category for recommendations
          if (foundProduct.category) {
            const similarResponse = await productService.getProductsByCategory(
              foundProduct.category
            );
            // Filter out the current product and limit to 3
            const similar = similarResponse.data.data
              .filter((p) => p._id !== foundProduct._id)
              .slice(0, 3);
            setSimilarProducts(similar);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: value,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-6 w-40 mb-4 rounded"></div>
          <div className="bg-gray-200 h-80 w-full max-w-xl rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Error Loading Product
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button to="/products" variant="primary">
          Browse All Products
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button to="/products" variant="primary">
          Browse All Products
        </Button>
      </div>
    );
  }

  // Function to format price with commas and optional decimals
  const formatPrice = (price) => {
    // Parse the price to a number first
    const numPrice = parseFloat(price);

    // Check if the price has decimal part
    const hasCents = numPrice % 1 !== 0;

    // Format with appropriate decimal places
    return numPrice.toLocaleString("en-KE", {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-pink-500 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </button>

      <div className="flex flex-col lg:flex-row">
        {/* Product Image */}
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <div className="bg-white p-2 rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-pink-500 mb-4">
            Kes {formatPrice(product.price)}
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Allergen info */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Allergen Information
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allergen, index) => (
                    <span
                      key={index}
                      className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization options */}
            {product.customizable && product.options && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Customization Options
                </h3>
                <div className="space-y-4">
                  {product.options.map((option, index) => (
                    <div key={index}>
                      <label className="block text-gray-700 mb-2">
                        {option.name}:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {option.choices.map((choice, choiceIndex) => (
                          <div
                            key={choiceIndex}
                            className={`
                              border rounded-md py-2 px-3 text-center cursor-pointer transition-colors
                              ${
                                selectedOptions[option.name] === choice
                                  ? "bg-pink-100 border-pink-500 text-pink-700"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }
                            `}
                            onClick={() =>
                              handleOptionChange(option.name, choice)
                            }
                          >
                            {choice}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Serving or quantity info */}
            {product.minServings && product.maxServings && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Serving Information
                </h3>
                <p className="text-gray-700">
                  This cake serves approximately {product.minServings} to{" "}
                  {product.maxServings} people, depending on serving size.
                </p>
              </div>
            )}

            {product.minQuantity && product.maxQuantity && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Quantity Information
                </h3>
                <p className="text-gray-700">
                  Available in quantities of {product.minQuantity} to{" "}
                  {product.maxQuantity}.
                </p>
              </div>
            )}

            {/* Order buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                to={`/order?product=${product._id}`}
                size="lg"
                fullWidth={true}
              >
                Order Now
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                fullWidth={true}
              >
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((similar) => (
              <div
                key={similar._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative pt-[56.25%]">
                  <img
                    src={similar.image}
                    alt={similar.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {similar.name}
                  </h3>
                  <p className="text-pink-500 font-medium mb-3">
                    ${parseFloat(similar.price).toFixed(2)}
                  </p>
                  <Button
                    to={`/products/${similar._id}`}
                    variant="secondary"
                    fullWidth={true}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
