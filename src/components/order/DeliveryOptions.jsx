import React from "react";
import OrderCalendar from "./OrderCalendar";

const DeliveryOptions = ({
  deliveryMethod,
  deliveryDate,
  onDeliveryMethodChange,
  onDateChange,
  dateError,
}) => {
  return (
    <div className="mb-6">
      {/* Delivery Method Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Delivery Method:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className={`
              border rounded-lg p-4 cursor-pointer transition-colors
              ${
                deliveryMethod === "pickup"
                  ? "bg-pink-50 border-pink-500"
                  : "border-gray-300 hover:bg-gray-50"
              }
            `}
            onClick={() =>
              onDeliveryMethodChange({
                target: { name: "deliveryMethod", value: "pickup" },
              })
            }
          >
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="pickup"
                  name="deliveryMethod"
                  type="radio"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={onDeliveryMethodChange}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="pickup" className="font-medium text-gray-800">
                  In-Store Pickup
                </label>
                <p className="text-gray-600 text-sm">
                  Pick up your order at our bakery location
                </p>
              </div>
            </div>
          </div>

          <div
            className={`
              border rounded-lg p-4 cursor-pointer transition-colors
              ${
                deliveryMethod === "delivery"
                  ? "bg-pink-50 border-pink-500"
                  : "border-gray-300 hover:bg-gray-50"
              }
            `}
            onClick={() =>
              onDeliveryMethodChange({
                target: { name: "deliveryMethod", value: "delivery" },
              })
            }
          >
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="delivery"
                  name="deliveryMethod"
                  type="radio"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={onDeliveryMethodChange}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="delivery" className="font-medium text-gray-800">
                  Home Delivery
                </label>
                <p className="text-gray-600 text-sm">
                  We'll deliver to your specified address (delivery fee applies)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          {deliveryMethod === "pickup" ? "Pickup Date" : "Delivery Date"}:
        </label>
        <OrderCalendar
          selectedDate={deliveryDate}
          onDateChange={onDateChange}
          minDays={deliveryMethod === "pickup" ? 1 : 2} // Pickup needs at least 1 day, delivery needs 2
        />
        {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}

        <div className="mt-2 text-gray-600 text-sm">
          <p>
            {deliveryMethod === "pickup"
              ? "Please allow at least 24 hours for us to prepare your order."
              : "Please allow at least 48 hours for delivery orders."}
          </p>

          {deliveryMethod === "delivery" && (
            <p className="mt-2">
              <span className="font-medium text-gray-700">Note:</span> Delivery
              is available within a 30-mile radius of our bakery. Delivery fees
              start at $10 and vary based on distance.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
