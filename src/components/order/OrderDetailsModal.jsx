import React from "react";
import Button from "../shared/Button";

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  // Mock status options
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Order #{order.id}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order details section */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">
                  Order Information
                </h4>
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium text-gray-800">
                      {formatDate(order.date)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium text-gray-800">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-800">M-Pesa</span>
                  </div>
                </div>

                {/* Update status section */}
                <h4 className="font-medium text-gray-800 mb-3">
                  Update Status
                </h4>
                <div className="flex space-x-2 mb-4">
                  <select
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    defaultValue={order.status.toLowerCase()}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={() =>
                      onUpdateStatus(
                        order.id,
                        document.querySelector("select").value
                      )
                    }
                    size="sm"
                  >
                    Update
                  </Button>
                </div>
              </div>

              {/* Customer details section */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">
                  Customer Information
                </h4>
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="mb-2">
                    <span className="text-gray-600 block text-sm">Name:</span>
                    <span className="font-medium text-gray-800">
                      {order.customer?.name || "Jane Doe"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-600 block text-sm">Email:</span>
                    <span className="font-medium text-gray-800">
                      {order.customer?.email || "jane@example.com"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-600 block text-sm">Phone:</span>
                    <span className="font-medium text-gray-800">
                      {order.customer?.phone || "(555) 123-4567"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 block text-sm">
                      Delivery Address:
                    </span>
                    <span className="font-medium text-gray-800">
                      {order.customer?.address ||
                        "123 Main St, Apt 4B, Sweet City, SC 12345"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order items */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
              <div className="bg-gray-50 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Total:
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes section */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Order Notes</h4>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                rows="3"
                placeholder="Add notes about this order..."
                defaultValue={order.notes || ""}
              ></textarea>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={onClose} variant="primary" className="ml-3">
              Close
            </Button>
            <Button
              onClick={() => {
                // Save notes logic would go here
                alert("Notes saved!");
              }}
              variant="outline"
            >
              Save Notes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
