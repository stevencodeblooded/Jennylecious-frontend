import React from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";

const ProductCard = ({ product }) => {
  const { id, name, price, image, description, allergens, customizable } =
    product;

  // Get short description (first 80 characters)
  const shortDescription =
    description.length > 80
      ? `${description.substring(0, 80)}...`
      : description;

  return (
    <Card hover={true} className="h-full flex flex-col">
      <Card.Image src={image} alt={name} />
      <Card.Body className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{shortDescription}</p>

        {/* Allergen information */}
        {allergens && allergens.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Contains:</p>
            <div className="flex flex-wrap gap-1">
              {allergens.map((allergen, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Customizable badge */}
        {customizable && (
          <div className="mb-4">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Customizable
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-pink-500">
            ${price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <Button to={`/products/${id}`} variant="secondary" size="sm">
              Details
            </Button>
            <Button to={`/order?product=${id}`} size="sm">
              Order
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
