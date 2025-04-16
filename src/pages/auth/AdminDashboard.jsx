import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  TextArea,
  FormError,
  FormSuccess,
} from "../../components/shared/FormElements";
import Button from "../../components/shared/Button";
import OrderDetailsModal from "../../components/order/OrderDetailsModal";
import CustomerDetailsModal from "../../components/order/CustomerDetailsModal";
import { useAuth } from "../../context/AuthContext";
import { 
  productService, 
  orderService, 
  userService, 
  settingsService 
} from "../../utils/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [settings, setSettings] = useState({});

  console.log(settings);

  // Loading states
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Form data for settings
  const [settingsData, setSettingsData] = useState({
    storeName: "",
    contactEmail: "",
    phone: "",
    address: "",
    payment: {
      mpesaConsumerKey: "",
      mpesaConsumerSecret: "",
      mpesaPasskey: "",
      businessShortCode: "",
    },
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    slug: "",
    image: "",
  });

  // Reset category form
  const resetCategoryForm = () => {
    setCategoryFormData({
      name: "",
      description: "",
      slug: "",
      image: "",
    });
  };

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Handle category name change with auto-slug generation
  const handleCategoryNameChange = (e) => {
    const name = e.target.value;
    setCategoryFormData({
      ...categoryFormData,
      name,
      slug: generateSlug(name),
    });
  };

  // Handle other category form input changes
  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({
      ...categoryFormData,
      [name]: value,
    });
  };

  // Select category to edit
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsAddingCategory(false);

    setCategoryFormData({
      name: category.name,
      description: category.description || "",
      slug: category.slug || "",
      image: category.image || "",
    });
  };

  // Add new category
  const handleAddNewCategory = () => {
    setSelectedCategory(null);
    setIsAddingCategory(true);
    resetCategoryForm();
  };

  // Submit category form
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!categoryFormData.name) {
      setSubmitError("Category name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isAddingCategory) {
        await productService.createCategory(categoryFormData);
        setSubmitSuccess(true);
        resetCategoryForm();
        setIsAddingCategory(false);
      } else {
        await productService.updateCategory(
          selectedCategory._id,
          categoryFormData
        );
        setSubmitSuccess(true);
      }

      fetchCategories();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving category:", error);
      setSubmitError(error.response?.data?.error || "Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedCategory.name}? This may affect products in this category.`
      )
    ) {
      setIsSubmitting(true);

      try {
        await productService.deleteCategory(selectedCategory._id);
        setSubmitSuccess(true);
        setSelectedCategory(null);

        fetchCategories();

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting category:", error);
        setSubmitError(
          error.response?.data?.error || "Failed to delete category"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    } else if (!isLoading && isAuthenticated && currentUser?.role !== "admin") {
      navigate("/"); // Redirect non-admin users to homepage
    }
  }, [isAuthenticated, isLoading, currentUser, navigate]);

  // Load data based on active tab
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === "admin") {
      if (activeTab === "products") {
        fetchProducts();
        fetchCategories();
      } else if (activeTab === "categories") {
        fetchCategories();
      } else if (activeTab === "orders") {
        fetchOrders();
      } else if (activeTab === "customers") {
        fetchCustomers();
      } else if (activeTab === "settings") {
        fetchSettings();
      }
    }
  }, [activeTab, isAuthenticated, currentUser]);

  // Fetch products
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await productService.getProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setSubmitError("Failed to load products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setSubmitError("Failed to load orders");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // Fetch customers
  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const response = await userService.getUsers();
      // Filter to only show customers (not admins)
      const customerUsers = response.data.data.filter(
        (user) => user.role === "customer"
      );
      setCustomers(customerUsers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setSubmitError("Failed to load customers");
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  // Fetch settings
  const fetchSettings = async () => {
    setIsLoadingSettings(true);
    try {
      const response = await settingsService.getAllSettings();
      const settingsData = response.data.data;
      setSettings(settingsData);

      // Update settings form data
      setSettingsData({
        storeName: settingsData.storeName || "",
        contactEmail: settingsData.contactEmail || "",
        phone: settingsData.phone || "",
        address: settingsData.address || "",
        payment: {
          mpesaConsumerKey: settingsData.payment?.mpesaConsumerKey || "",
          mpesaConsumerSecret: settingsData.payment?.mpesaConsumerSecret || "",
          mpesaPasskey: settingsData.payment?.mpesaPasskey || "",
          businessShortCode: settingsData.payment?.businessShortCode || "",
        },
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSubmitError("Failed to load settings");
    } finally {
      setIsLoadingSettings(false);
    }
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

  // Reset product form
  const resetProductForm = () => {
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

  // Handle settings form input changes
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("payment.")) {
      const paymentField = name.split(".")[1];
      setSettingsData({
        ...settingsData,
        payment: {
          ...settingsData.payment,
          [paymentField]: value,
        },
      });
    } else {
      setSettingsData({
        ...settingsData,
        [name]: value,
      });
    }
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
      isAvailable: product.isAvailable !== false, // Default to true if undefined
      isFeatured: product.isFeatured || false,
      customizable: product.customizable || false,
    });
  };

  // Handle adding a new product
  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setIsAddingProduct(true);
    resetProductForm();
  };

  // Handle product form submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    // Validate the form
    if (
      !productFormData.name ||
      !productFormData.category ||
      !productFormData.price
    ) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the product data
      const productData = {
        ...productFormData,
        price: parseFloat(productFormData.price),
      };

      if (isAddingProduct) {
        // Create new product
        await productService.createProduct(productData);
        setSubmitSuccess(true);
        resetProductForm();
        setIsAddingProduct(false);
      } else {
        // Update existing product
        await productService.updateProduct(selectedProduct._id, productData);
        setSubmitSuccess(true);
      }

      // Refresh products list
      fetchProducts();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving product:", error);
      setSubmitError(error.response?.data?.error || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle settings form submission
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      await settingsService.updateSettings(settingsData);
      setSubmitSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSubmitError(error.response?.data?.error || "Failed to save settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    // Confirm deletion
    if (
      window.confirm(`Are you sure you want to delete ${selectedProduct.name}?`)
    ) {
      setIsSubmitting(true);

      try {
        await productService.deleteProduct(selectedProduct._id);
        setSubmitSuccess(true);
        setSelectedProduct(null);

        // Refresh products list
        fetchProducts();

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting product:", error);
        setSubmitError(
          error.response?.data?.error || "Failed to delete product"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handler to open order details modal
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Handler to open customer details modal
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // Handler to update order status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);

      // Refresh orders list
      fetchOrders();

      // Close the modal
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
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

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || currentUser?.role !== "admin") {
    return null; // Will redirect in useEffect
  }

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
                  {isLoadingProducts ? (
                    <div className="p-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          selectedProduct && selectedProduct._id === product._id
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
                              onError={(e) =>
                                (e.target.src =
                                  "https://via.placeholder.com/150?text=Cake")
                              }
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
                                <option key={category._id} value={category.id}>
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
                            placeholder="/uploads/products/example.jpg"
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
                          {selectedProduct && !isAddingProduct && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleDeleteProduct}
                              className="text-red-500 border-red-500 hover:bg-red-50"
                              disabled={isSubmitting}
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
                              disabled={isSubmitting}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="primary"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? "Saving..."
                                : isAddingProduct
                                ? "Add Product"
                                : "Save Changes"}
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

            {isLoadingOrders ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {orders.length > 0 ? (
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
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderNumber}
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
                              {formatDate(order.orderDate)}
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
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No orders found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "customers":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Customer Management
            </h3>

            {isLoadingCustomers ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {customers.length > 0 ? (
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
                        <tr key={customer._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {customer.firstName} {customer.lastName}
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
                              {formatDate(customer.joinDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {customer.orders?.length || 0}
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
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No customers found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "categories":
        return (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                Category Management
              </h3>
              <Button onClick={handleAddNewCategory} size="md">
                Add New Category
              </Button>
            </div>

            {submitSuccess && (
              <FormSuccess
                message={
                  isAddingCategory
                    ? "Category added successfully!"
                    : selectedCategory
                    ? "Category updated successfully!"
                    : "Category deleted successfully!"
                }
              />
            )}

            {submitError && <FormError message={submitError} />}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories List */}
              <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-semibold">All Categories</h4>
                </div>

                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div
                        key={category._id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          selectedCategory &&
                          selectedCategory._id === category._id
                            ? "bg-pink-50"
                            : ""
                        }`}
                        onClick={() => handleSelectCategory(category)}
                      >
                        <div className="flex items-center">
                          {category.image && (
                            <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) =>
                                  (e.target.src =
                                    "https://via.placeholder.com/150?text=Category")
                                }
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {category.name}
                            </h4>
                            {category.slug && (
                              <p className="text-sm text-gray-500">
                                {category.slug}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No categories found
                    </div>
                  )}
                </div>
              </div>

              {/* Category Edit Form */}
              <div className="md:col-span-2">
                {selectedCategory || isAddingCategory ? (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h4 className="font-semibold">
                        {isAddingCategory
                          ? "Add New Category"
                          : "Edit Category"}
                      </h4>
                    </div>

                    <div className="p-6">
                      <form onSubmit={handleCategorySubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <TextInput
                            label="Category Name"
                            name="name"
                            value={categoryFormData.name}
                            onChange={handleCategoryNameChange}
                            required
                          />

                          <TextInput
                            label="Slug"
                            name="slug"
                            value={categoryFormData.slug}
                            onChange={handleCategoryFormChange}
                            placeholder="category-slug"
                            helperText="Used in URLs, auto-generated from name"
                          />
                        </div>

                        <TextInput
                          label="Image URL"
                          name="image"
                          value={categoryFormData.image}
                          onChange={handleCategoryFormChange}
                          placeholder="/uploads/categories/example.jpg"
                        />

                        <TextArea
                          label="Description"
                          name="description"
                          value={categoryFormData.description}
                          onChange={handleCategoryFormChange}
                          rows={3}
                        />

                        <div className="flex justify-between mt-6">
                          {selectedCategory && !isAddingCategory && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleDeleteCategory}
                              className="text-red-500 border-red-500 hover:bg-red-50"
                              disabled={isSubmitting}
                            >
                              Delete Category
                            </Button>
                          )}
                          <div className="ml-auto flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setSelectedCategory(null);
                                setIsAddingCategory(false);
                              }}
                              disabled={isSubmitting}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="primary"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? "Saving..."
                                : isAddingCategory
                                ? "Add Category"
                                : "Save Changes"}
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
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No Category Selected
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Select a category from the list to edit its details or
                      click "Add New Category"
                    </p>
                    <Button onClick={handleAddNewCategory} variant="primary">
                      Add New Category
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Site Settings
            </h3>

            {submitSuccess && (
              <FormSuccess message="Settings updated successfully!" />
            )}

            {submitError && <FormError message={submitError} />}

            {isLoadingSettings ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
              </div>
            ) : (
              <form onSubmit={handleSettingsSubmit}>
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
                        name="storeName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.storeName}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.contactEmail}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.phone}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Store Address
                      </label>
                      <textarea
                        name="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        rows="3"
                        value={settingsData.address}
                        onChange={handleSettingsChange}
                      ></textarea>
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
                        name="payment.mpesaConsumerKey"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.payment.mpesaConsumerKey}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        M-Pesa Consumer Secret
                      </label>
                      <input
                        type="password"
                        name="payment.mpesaConsumerSecret"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.payment.mpesaConsumerSecret}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        M-Pesa Passkey
                      </label>
                      <input
                        type="password"
                        name="payment.mpesaPasskey"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.payment.mpesaPasskey}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Business ShortCode
                      </label>
                      <input
                        type="text"
                        name="payment.businessShortCode"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                        value={settingsData.payment.businessShortCode}
                        onChange={handleSettingsChange}
                      />
                    </div>

                    <div className="text-right">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Save Settings"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
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
              <span className="text-gray-600">
                Welcome, {currentUser?.firstName}
              </span>
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
                  <p className="text-2xl font-bold text-gray-800">
                    {orders.length}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-800">
                    {customers.length}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-800">
                    $
                    {orders
                      .reduce((total, order) => total + order.total, 0)
                      .toFixed(2)}
                  </p>
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
                      activeTab === "categories"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("categories")}
                  >
                    Category Management
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