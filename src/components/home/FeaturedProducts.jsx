import React from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import products from "../../data/products";

const FeaturedProducts = () => {
  // Filter out only featured products and limit to 4
  const featuredProducts = products
    .filter((product) => product.isFeatured)
    .slice(0, 4);

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
              key={product.id}
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
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    to={`/products/${product.id}`}
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
