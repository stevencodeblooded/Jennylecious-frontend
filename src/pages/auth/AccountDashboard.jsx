import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput, TextArea } from "../../components/shared/FormElements";
import Button from "../../components/shared/Button";

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // Mock user data (would come from API/context in a real app)
  const user = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, Sweet City, SC 12345",
    joinDate: "January 15, 2023",
  };

  // Mock order data (would come from API in a real app)
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-03-15",
      total: 49.99,
      status: "Delivered",
      items: [{ id: 1, name: "Chocolate Cake", quantity: 1, price: 49.99 }],
    },
    {
      id: "ORD-5678",
      date: "2023-02-28",
      total: 74.98,
      status: "Delivered",
      items: [
        { id: 2, name: "Red Velvet Cupcakes", quantity: 2, price: 24.99 },
        { id: 3, name: "French Macarons", quantity: 1, price: 24.99 },
      ],
    },
    {
      id: "ORD-9012",
      date: "2023-04-05",
      total: 149.99,
      status: "Processing",
      items: [
        { id: 4, name: "Wedding Cake (Deposit)", quantity: 1, price: 149.99 },
      ],
    },
  ];

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user profile via API
    console.log("Profile update submitted:", profileData);
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the password via API
    console.log("Password update submitted");
    alert("Password updated successfully!");

    // Reset password fields
    setProfileData({
      ...profileData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Dashboard tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              My Orders
            </h3>

            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.date)}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2">
                          Items
                        </h5>
                        <div className="divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="py-2 flex justify-between"
                            >
                              <div>
                                <p className="text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-gray-800">
                                ${item.price.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 flex justify-between">
                        <p className="font-semibold text-gray-800">Total:</p>
                        <p className="font-semibold text-gray-800">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          to={`/orders/${order.id}`}
                          variant="secondary"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven't placed any orders yet. Explore our products and
                  place your first order!
                </p>
                <Button to="/products" variant="primary">
                  Browse Products
                </Button>
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              My Profile
            </h3>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold">Personal Information</h4>
              </div>

              <div className="p-6">
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <TextInput
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      required
                    />

                    <TextInput
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <TextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />

                    <TextInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <TextArea
                    label="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    rows={3}
                    required
                  />

                  <div className="mt-6 text-right">
                    <Button type="submit" variant="primary">
                      Update Profile
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold">Change Password</h4>
              </div>

              <div className="p-6">
                <form onSubmit={handlePasswordSubmit}>
                  <TextInput
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={profileData.currentPassword}
                    onChange={handleProfileChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={handleProfileChange}
                      required
                    />

                    <TextInput
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="mt-6 text-right">
                    <Button type="submit" variant="primary">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case "wishlist":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              My Wishlist
            </h3>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-600 mb-4">
                Save your favorite items to your wishlist for easy access later.
              </p>
              <Button to="/products" variant="primary">
                Browse Products
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6 bg-pink-50 border-b border-pink-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Welcome back, {user.firstName}!
                    </h2>
                    <p className="text-gray-600">
                      Member since {user.joinDate}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button to="/order" variant="primary">
                      Place New Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <nav className="divide-y divide-gray-200">
                    <button
                      className={`w-full text-left px-6 py-4 font-medium ${
                        activeTab === "orders"
                          ? "text-pink-500 bg-pink-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("orders")}
                    >
                      My Orders
                    </button>
                    <button
                      className={`w-full text-left px-6 py-4 font-medium ${
                        activeTab === "profile"
                          ? "text-pink-500 bg-pink-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      My Profile
                    </button>
                    <button
                      className={`w-full text-left px-6 py-4 font-medium ${
                        activeTab === "wishlist"
                          ? "text-pink-500 bg-pink-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("wishlist")}
                    >
                      My Wishlist
                    </button>
                    <Link
                      to="/logout"
                      className="block w-full text-left px-6 py-4 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </Link>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
