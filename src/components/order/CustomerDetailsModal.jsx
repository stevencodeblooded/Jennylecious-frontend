import React, { useState, useEffect } from "react";
import Button from "../shared/Button";
import { userService, orderService } from "../../utils/api";

const CustomerDetailsModal = ({ customer, onClose }) => {
  // State management
  const [activeTab, setActiveTab] = useState("info");
  const [customerOrders, setCustomerOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [customerNotes, setCustomerNotes] = useState("");
  const [customerPreferences, setCustomerPreferences] = useState({
    hasNutAllergy: false,
    prefersGlutenFree: false,
    prefersVegan: false,
    isVip: false,
  });
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Early return if no customer
  // Fetch customer orders when the orders tab is active
  useEffect(() => {
    if (customer && activeTab === "orders" && customer._id) {
      fetchCustomerOrders();
    }
  }, [activeTab, customer]);

  // Fetch customer notes and preferences when the notes tab is active
  useEffect(() => {
    if (customer && activeTab === "notes" && customer._id) {
      setCustomerNotes(customer.notes || "");
      setCustomerPreferences({
        hasNutAllergy: customer.preferences?.hasNutAllergy || false,
        prefersGlutenFree: customer.preferences?.prefersGlutenFree || false,
        prefersVegan: customer.preferences?.prefersVegan || false,
        isVip: customer.preferences?.isVip || false,
      });
    }
  }, [activeTab, customer]);

  // Fetch customer orders
 const fetchCustomerOrders = async () => {
   setIsLoadingOrders(true);
   try {
     // This assumes the backend route for getUserOrders works with the current user context
     const response = await orderService.getUserOrders();
     setCustomerOrders(response.data.data);
   } catch (error) {
     console.error("Error fetching customer orders:", error);
   } finally {
     setIsLoadingOrders(false);
   }
 };

  // Handle saving customer notes and preferences
  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      // Assuming your API has an endpoint to update customer preferences
      await userService.updateCustomerPreferences(customer._id, {
        notes: customerNotes,
        preferences: customerPreferences,
      });
      // Show success message or notification
    } catch (error) {
      console.error("Error saving customer notes:", error);
      // Show error message
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Handle preference changes
  const handlePreferenceChange = (key, value) => {
    setCustomerPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
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

  // You can still have conditional rendering for the return
  if (!customer) return null;

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
              Customer Profile: {customer.firstName} {customer.lastName}
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

          {/* Tab navigation */}
          <div className="bg-white border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("info")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "info"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Customer Info
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "notes"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Notes
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "info" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">
                      Contact Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">
                          Full Name:
                        </span>
                        <p className="font-medium text-gray-800">
                          {customer.firstName} {customer.lastName}
                        </p>
                      </div>
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">Email:</span>
                        <p className="font-medium text-gray-800">
                          {customer.email}
                        </p>
                      </div>
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">Phone:</span>
                        <p className="font-medium text-gray-800">
                          {customer.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">
                          Customer Since:
                        </span>
                        <p className="font-medium text-gray-800">
                          {customer.createdAt
                            ? formatDate(customer.createdAt)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">
                      Shipping Address
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-800 whitespace-pre-line">
                        {customer.address || "No address provided"}
                      </p>
                    </div>

                    <h4 className="font-medium text-gray-800 mb-3 mt-6">
                      Account Statistics
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-500 text-sm">
                            Total Orders:
                          </span>
                          <p className="font-medium text-gray-800">
                            {customer.orderCount ||
                              customer.orders?.length ||
                              0}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">
                            Total Spent:
                          </span>
                          <p className="font-medium text-gray-800">
                            $
                            {customer.totalSpent
                              ? customer.totalSpent.toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">
                            Newsletter:
                          </span>
                          <p className="font-medium text-gray-800">
                            {customer.newsletter
                              ? "Subscribed"
                              : "Not Subscribed"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">
                            Account Status:
                          </span>
                          <p
                            className={`font-medium ${
                              customer.isActive
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {customer.isActive ? "Active" : "Inactive"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="mr-3">
                    Edit Customer
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    {customer.isActive
                      ? "Deactivate Account"
                      : "Activate Account"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h4 className="font-medium text-gray-800 mb-4">
                  Order History
                </h4>

                {isLoadingOrders ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
                  </div>
                ) : customerOrders.length > 0 ? (
                  <div className="bg-gray-50 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {customerOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-600">
                              <a
                                href={`#/orders/${order._id}`}
                                className="hover:underline"
                              >
                                {order.orderNumber}
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.orderDate)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <ul className="list-disc list-inside">
                                {order.items.map((item, index) => (
                                  <li key={index}>
                                    {item.product.name} × {item.quantity}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 text-center rounded-md">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No orders yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This customer hasn't placed any orders yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div>
                <h4 className="font-medium text-gray-800 mb-4">
                  Customer Notes
                </h4>

                <div className="mb-6">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    rows="6"
                    placeholder="Add private notes about this customer..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h5 className="font-medium text-gray-700 mb-2">
                    Customer Preferences
                  </h5>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="pref-allergies"
                        className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                        checked={customerPreferences.hasNutAllergy}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "hasNutAllergy",
                            e.target.checked
                          )
                        }
                      />
                      <label
                        htmlFor="pref-allergies"
                        className="ml-2 block text-sm"
                      >
                        Has nut allergy
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="pref-gluten"
                        className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                        checked={customerPreferences.prefersGlutenFree}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "prefersGlutenFree",
                            e.target.checked
                          )
                        }
                      />
                      <label
                        htmlFor="pref-gluten"
                        className="ml-2 block text-sm"
                      >
                        Prefers gluten-free
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="pref-vegan"
                        className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                        checked={customerPreferences.prefersVegan}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "prefersVegan",
                            e.target.checked
                          )
                        }
                      />
                      <label
                        htmlFor="pref-vegan"
                        className="ml-2 block text-sm"
                      >
                        Prefers vegan options
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        id="pref-vip"
                        className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                        checked={customerPreferences.isVip}
                        onChange={(e) =>
                          handlePreferenceChange("isVip", e.target.checked)
                        }
                      />
                      <label htmlFor="pref-vip" className="ml-2 block text-sm">
                        VIP customer
                      </label>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotes} disabled={isSavingNotes}>
                    {isSavingNotes ? "Saving..." : "Save Notes"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
