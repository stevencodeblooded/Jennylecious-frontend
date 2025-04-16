import React from "react";
import OrderForm from "../components/order/OrderForm";

const Order = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Place Your <span className="text-pink-500">Order</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Fill out the form below to place your order for our delicious
              cakes and baked goods. We'll get back to you shortly to confirm
              the details.
            </p>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 70"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1440,32L1440,70L0,70Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="font-medium text-gray-700">
                  Custom Orders:
                </span>{" "}
                All of our cakes can be customized to your specifications.
                Please provide as much detail as possible about your
                requirements in the order form.
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Order Lead Time:
                </span>{" "}
                We require at least 48 hours notice for standard orders, and
                7-14 days for wedding or complex custom cakes.
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Dietary Requirements:
                </span>{" "}
                Please let us know about any dietary requirements or allergies
                in the special instructions section.
              </p>
              <p>
                <span className="font-medium text-gray-700">Delivery:</span> We
                offer delivery within a 30-mile radius for a fee based on
                distance. You can also pick up your order at our store.
              </p>
              <p>
                <span className="font-medium text-gray-700">Payment:</span> We
                accept M-Pesa, credit/debit cards, and bank transfers. A 50%
                deposit is required to confirm your order.
              </p>
            </div>
          </div>

          <OrderForm />

          <div className="mt-8 bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">
              Need help with your order? Contact us at{" "}
              <a href="tel:+1234567890" className="text-pink-500 font-medium">
                (123) 456-7890
              </a>{" "}
              or{" "}
              <a
                href="mailto:orders@jennylecious.com"
                className="text-pink-500 font-medium"
              >
                orders@jennylecious.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
