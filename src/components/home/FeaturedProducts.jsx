import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { productService } from "../../utils/api";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getFeaturedProducts();
        setFeaturedProducts(response.data.data.slice(0, 4)); // Limit to 4 products
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md max-w-3xl mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md max-w-2xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} hover={false} className="h-full flex flex-col">
                <div className="aspect-w-3 aspect-h-2 bg-gray-200 animate-pulse"></div>
                <Card.Body>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4 animate-pulse"></div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="h-6 bg-gray-200 rounded-md w-16 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Unable to Load Featured Products
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} size="lg">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // If no featured products are available
  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-pink-500">Featured</span> Creations
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Check back soon to see our featured products!
            </p>
            <Button to="/products" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-pink-500">Featured</span> Creations
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our most popular treats, handcrafted with the finest
            ingredients and created with passion. These crowd favorites are sure
            to delight!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product._id}
              hover={true}
              className="h-full flex flex-col"
            >
              <Card.Image src={product.image} alt={product.name} />
              <Card.Body className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-pink-500">
                    Kes {formatPrice(product.price)}
                  </span>
                  <Button
                    to={`/products/${product._id}`}
                    variant="secondary"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/products" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
