import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextInput,
  TextArea,
  FormError,
  FormSuccess,
} from "../../components/shared/FormElements";
import Button from "../../components/shared/Button";
import OrderDetailsModal from "../../components/order/OrderDetailsModal";
import CustomerDetailsModal from "../../components/order/CustomerDetailsModal";
import products, { categories } from "../../data/products";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // New states for modals
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock data for orders and customers
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-04-15T10:30:00",
      total: 49.99,
      status: "Delivered",
      customer: {
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "(555) 123-4567",
        address: "123 Main St, Apt 4B, Sweet City, SC 12345",
      },
      items: [{ id: 1, name: "Chocolate Cake", quantity: 1, price: 49.99 }],
      notes: "",
    },
    {
      id: "ORD-5678",
      date: "2023-04-12T15:45:00",
      total: 74.98,
      status: "Processing",
      customer: {
        name: "John Smith",
        email: "john@example.com",
        phone: "(555) 987-6543",
        address: "456 Oak Lane, Sweet City, SC 12345",
      },
      items: [
        { id: 2, name: "Red Velvet Cupcakes", quantity: 2, price: 24.99 },
        { id: 3, name: "French Macarons", quantity: 1, price: 25.0 },
      ],
      notes: "",
    },
    {
      id: "ORD-9012",
      date: "2023-04-10T09:15:00",
      total: 149.99,
      status: "Pending",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "(555) 456-7890",
        address: "789 Bakery Street, Sweet City, SC 12345",
      },
      items: [
        { id: 4, name: "Wedding Cake (Deposit)", quantity: 1, price: 149.99 },
      ],
      notes: "",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Apt 4B, Sweet City, SC 12345",
      joinDate: "2023-01-15",
      orders: 5,
      totalSpent: 249.95,
      newsletter: true,
      notes: "",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 987-6543",
      address: "456 Oak Lane, Sweet City, SC 12345",
      joinDate: "2023-02-03",
      orders: 2,
      totalSpent: 124.97,
      newsletter: false,
      notes: "",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 456-7890",
      address: "789 Bakery Street, Sweet City, SC 12345",
      joinDate: "2023-03-17",
      orders: 1,
      totalSpent: 149.99,
      newsletter: true,
      notes: "",
    },
  ];

  // Handler to open order details modal
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Handler to open customer details modal
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // Handler to update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would be an API call
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    console.log(updatedOrders);
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // You would typically update the orders state or call an API here
  };

  // New product form state
  const [productFormData, setProductFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    allergens: [],
    isAvailable: true,
    isFeatured: false,
    customizable: false,
  });

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler for product form input changes
  const handleProductFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProductFormData({
      ...productFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle allergens multi-select
  const handleAllergenToggle = (allergen) => {
    const currentAllergens = [...productFormData.allergens];

    if (currentAllergens.includes(allergen)) {
      // Remove allergen if already selected
      setProductFormData({
        ...productFormData,
        allergens: currentAllergens.filter((a) => a !== allergen),
      });
    } else {
      // Add allergen if not already selected
      setProductFormData({
        ...productFormData,
        allergens: [...currentAllergens, allergen],
      });
    }
  };

  // Handle selecting a product to edit
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsAddingProduct(false);

    // Populate form with product data
    setProductFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      allergens: product.allergens || [],
      isAvailable: product.isAvailable || true,
      isFeatured: product.isFeatured || false,
      customizable: product.customizable || false,
    });
  };

  // Handle adding a new product
  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setIsAddingProduct(true);

    // Reset form data
    setProductFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      allergens: [],
      isAvailable: true,
      isFeatured: false,
      customizable: false,
    });
  };

  // Handle product form submission
  const handleProductSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate the form
    if (
      !productFormData.name ||
      !productFormData.category ||
      !productFormData.price
    ) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    // In a real application, this would be an API call to create/update the product
    setTimeout(() => {
      console.log("Product submitted:", productFormData);
      setSubmitSuccess(true);

      // Reset after success message
      setTimeout(() => {
        setSubmitSuccess(false);
        if (isAddingProduct) {
          setIsAddingProduct(false);
          setSelectedProduct(null);
        }
      }, 3000);
    }, 1000);
  };

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    // Confirm deletion
    if (
      window.confirm(`Are you sure you want to delete ${selectedProduct.name}?`)
    ) {
      // In a real application, this would be an API call to delete the product
      console.log("Deleting product:", selectedProduct.id);
      setSubmitSuccess(true);

      // Reset after success message
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedProduct(null);
      }, 3000);
    }
  };

  // List of common allergens
  const allergenOptions = [
    "Dairy",
    "Eggs",
    "Nuts",
    "Peanuts",
    "Wheat",
    "Gluten",
    "Soy",
    "Fish",
    "Shellfish",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                Product Management
              </h3>
              <Button onClick={handleAddNewProduct} size="md">
                Add New Product
              </Button>
            </div>

            {submitSuccess && (
              <FormSuccess
                message={
                  isAddingProduct
                    ? "Product added successfully!"
                    : selectedProduct
                    ? "Product updated successfully!"
                    : "Product deleted successfully!"
                }
              />
            )}

            {submitError && <FormError message={submitError} />}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Products List */}
              <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <TextInput
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          selectedProduct && selectedProduct.id === product.id
                            ? "bg-pink-50"
                            : ""
                        }`}
                        onClick={() => handleSelectProduct(product)}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              </div>

              {/* Product Edit Form */}
              <div className="md:col-span-2">
                {selectedProduct || isAddingProduct ? (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h4 className="font-semibold">
                        {isAddingProduct ? "Add New Product" : "Edit Product"}
                      </h4>
                    </div>

                    <div className="p-6">
                      <form onSubmit={handleProductSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <TextInput
                            label="Product Name"
                            name="name"
                            value={productFormData.name}
                            onChange={handleProductFormChange}
                            required
                          />

                          <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                              Category <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="category"
                              value={productFormData.category}
                              onChange={handleProductFormChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                              required
                            >
                              <option value="">Select a category</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <TextInput
                            label="Price ($)"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={productFormData.price}
                            onChange={handleProductFormChange}
                            required
                          />

                          <TextInput
                            label="Image URL"
                            name="image"
                            value={productFormData.image}
                            onChange={handleProductFormChange}
                            placeholder="/assets/images/products/example.jpg"
                          />
                        </div>

                        <TextArea
                          label="Description"
                          name="description"
                          value={productFormData.description}
                          onChange={handleProductFormChange}
                          rows={3}
                          required
                        />

                        <div className="mt-4 mb-4">
                          <label className="block text-gray-700 font-medium mb-2">
                            Allergens
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {allergenOptions.map((allergen) => (
                              <div
                                key={allergen}
                                className={`
                                  px-3 py-1 rounded-full cursor-pointer text-sm
                                  ${
                                    productFormData.allergens.includes(allergen)
                                      ? "bg-pink-500 text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }
                                `}
                                onClick={() => handleAllergenToggle(allergen)}
                              >
                                {allergen}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isAvailable"
                              name="isAvailable"
                              checked={productFormData.isAvailable}
                              onChange={handleProductFormChange}
                              className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="isAvailable"
                              className="ml-2 block text-gray-700"
                            >
                              Available
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isFeatured"
                              name="isFeatured"
                              checked={productFormData.isFeatured}
                              onChange={handleProductFormChange}
                              className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="isFeatured"
                              className="ml-2 block text-gray-700"
                            >
                              Featured
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="customizable"
                              name="customizable"
                              checked={productFormData.customizable}
                              onChange={handleProductFormChange}
                              className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="customizable"
                              className="ml-2 block text-gray-700"
                            >
                              Customizable
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          {selectedProduct && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleDeleteProduct}
                              className="text-red-500 border-red-500 hover:bg-red-50"
                            >
                              Delete Product
                            </Button>
                          )}
                          <div className="ml-auto flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setSelectedProduct(null);
                                setIsAddingProduct(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                              {isAddingProduct ? "Add Product" : "Save Changes"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No Product Selected
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Select a product from the list to edit its details or
                      click "Add New Product"
                    </p>
                    <Button onClick={handleAddNewProduct} variant="primary">
                      Add New Product
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Order Management
            </h3>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-pink-600 hover:text-pink-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "customers":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Customer Management
            </h3>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Join Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.joinDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {customer.orders}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          className="text-pink-600 hover:text-pink-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "settings":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Site Settings
            </h3>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold">General Settings</h4>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="Jennylecious Cakes & Bakes"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="info@jennylecious.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="(123) 456-7890"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Store Address
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    rows="3"
                  >
                    123 Baker Street, Sweet City, SC 12345
                  </textarea>
                </div>

                <div className="text-right">
                  <Button type="button" variant="primary">
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold">Payment Settings</h4>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    M-Pesa Consumer Key
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="••••••••••••••••"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    M-Pesa Consumer Secret
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="••••••••••••••••"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    M-Pesa Passkey
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="••••••••••••••••"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Business ShortCode
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value="123456"
                  />
                </div>

                <div className="text-right">
                  <Button type="button" variant="primary">
                    Save Payment Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Admin</span>
              <Link to="/" className="text-pink-500 hover:text-pink-600">
                View Site
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-pink-100 p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-pink-500"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total Orders
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">125</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Customers
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">48</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Revenue
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">$4,325.50</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Products
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {products.length}
                  </p>
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
                      activeTab === "products"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("products")}
                  >
                    Product Management
                  </button>
                  <button
                    className={`w-full text-left px-6 py-4 font-medium ${
                      activeTab === "orders"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("orders")}
                  >
                    Order Management
                  </button>
                  <button
                    className={`w-full text-left px-6 py-4 font-medium ${
                      activeTab === "customers"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("customers")}
                  >
                    Customer Management
                  </button>
                  <button
                    className={`w-full text-left px-6 py-4 font-medium ${
                      activeTab === "settings"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    Settings
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
            <div className="md:w-3/4">{renderTabContent()}</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}

      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
