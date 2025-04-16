import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  TextArea,
  FormError,
  FormSuccess,
} from "../../components/shared/FormElements";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";
import { orderService, userService } from "../../utils/api";

const AccountDashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    isAuthenticated,
    isLoading,
    logout,
    updateProfile,
    changePassword,
  } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [wishlistError, setWishlistError] = useState("");

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load user data when component mounts
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  // Fetch orders when on orders tab
  useEffect(() => {
    if (activeTab === "orders" && isAuthenticated) {
      fetchOrders();
    }
  }, [activeTab, isAuthenticated]);

  // Fetch wishlist when on wishlist tab
  useEffect(() => {
    if (activeTab === "wishlist" && isAuthenticated) {
      fetchWishlist();
    }
  }, [activeTab, isAuthenticated]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    setOrderError("");

    try {
      const response = await orderService.getUserOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrderError("Failed to load your orders. Please try again later.");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const fetchWishlist = async () => {
    setIsLoadingWishlist(true);
    setWishlistError("");

    try {
      const response = await userService.getWishlist();
      setWishlist(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistError("Failed to load your wishlist. Please try again later.");
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess(false);
    setIsSubmittingProfile(true);

    try {
      const result = await updateProfile(profileData);

      if (result.success) {
        setProfileSuccess(true);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setProfileSuccess(false);
        }, 3000);
      } else {
        setProfileError(result.error);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setProfileError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    setIsSubmittingPassword(true);

    try {
      const result = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (result.success) {
        setPasswordSuccess(true);

        // Reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Reset success message after 3 seconds
        setTimeout(() => {
          setPasswordSuccess(false);
        }, 3000);
      } else {
        setPasswordError(result.error);
      }
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await userService.removeFromWishlist(productId);
      // Refresh wishlist
      fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setWishlistError("Failed to remove item from wishlist");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
        </div>
      </div>
    );
  }

  // Dashboard tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              My Orders
            </h3>

            {isLoadingOrders ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
              </div>
            ) : orderError ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {orderError}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between">
                      <div>
                        <h4 className="font-semibold">
                          Order #{order.orderNumber}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
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
                          {order.items.map((item, index) => (
                            <div
                              key={index}
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
                          to={`/orders/${order._id}`}
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
                {profileSuccess && (
                  <FormSuccess message="Profile updated successfully!" />
                )}

                {profileError && <FormError message={profileError} />}

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
                  />

                  <div className="mt-6 text-right">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmittingProfile}
                    >
                      {isSubmittingProfile ? "Updating..." : "Update Profile"}
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
                {passwordSuccess && (
                  <FormSuccess message="Password updated successfully!" />
                )}

                {passwordError && <FormError message={passwordError} />}

                <form onSubmit={handlePasswordSubmit}>
                  <TextInput
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />

                    <TextInput
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="mt-6 text-right">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmittingPassword}
                    >
                      {isSubmittingPassword ? "Updating..." : "Update Password"}
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

            {isLoadingWishlist ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
              </div>
            ) : wishlistError ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {wishlistError}
              </div>
            ) : wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg">{product.name}</h4>
                      <p className="text-gray-600 mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="mt-4 flex justify-between">
                        <Button
                          to={`/products/${product._id}`}
                          variant="secondary"
                          size="sm"
                        >
                          View Product
                        </Button>
                        <button
                          onClick={() => handleRemoveFromWishlist(product._id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Your Wishlist is Empty
                </h3>
                <p className="text-gray-600 mb-4">
                  Save your favorite items to your wishlist for easy access
                  later.
                </p>
                <Button to="/products" variant="primary">
                  Browse Products
                </Button>
              </div>
            )}
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
                      Welcome back, {currentUser?.firstName || "User"}!
                    </h2>
                    <p className="text-gray-600">
                      Member since{" "}
                      {formatDate(currentUser?.joinDate || new Date())}
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
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-4 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
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
