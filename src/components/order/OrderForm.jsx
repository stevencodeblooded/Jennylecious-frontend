import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  TextInput,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
  FormSection,
  FormGroup,
  FormError,
} from "../shared/FormElements";
import Button from "../shared/Button";
import OrderCalendar from "./OrderCalendar";
import DeliveryOptions from "./DeliveryOptions";
import { productService, orderService, paymentService } from "../../utils/api";

const OrderForm = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showMpesaForm, setShowMpesaForm] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [pollInterval, setPollInterval] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Order Details
    productId: "",
    customizations: {},
    specialInstructions: "",
    quantity: 1,

    // Event Information
    eventDate: null,
    eventType: "",
    eventAddress: "",

    // Delivery & Payment
    deliveryMethod: "pickup",
    deliveryDate: null,
    deliveryAddress: "",
    deliveryInstructions: "",
    paymentMethod: "mpesa",

    // Terms & Conditions
    agreeToTerms: false,
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Selected product data
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval]);

  // Fetch product from API if specified in URL
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const productId = searchParams.get("product");
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const response = await productService.getProductById(productId);
        const product = response.data.data;

        if (product) {
          setSelectedProduct(product);
          setFormData((prev) => ({
            ...prev,
            productId: product._id,
          }));

          // Initialize customization options if available
          if (product.options) {
            const initialCustomizations = {};
            product.options.forEach((option) => {
              initialCustomizations[option.name] = option.choices[0];
            });
            setFormData((prev) => ({
              ...prev,
              customizations: initialCustomizations,
            }));
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  // Pre-fill form with authenticated user data
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: currentUser.firstName || prevData.firstName,
        lastName: currentUser.lastName || prevData.lastName,
        email: currentUser.email || prevData.email,
        phone: currentUser.phone || prevData.phone,
        // If the user has an address in their profile, pre-fill the delivery address
        deliveryAddress: currentUser.address || prevData.deliveryAddress,
      }));

      // Also pre-fill the M-Pesa phone number
      if (currentUser.phone) {
        setMpesaPhone(currentUser.phone);
      }
    }
  }, [isAuthenticated, currentUser]);

  // Event type options
  const eventTypeOptions = [
    { value: "birthday", label: "Birthday" },
    { value: "wedding", label: "Wedding" },
    { value: "anniversary", label: "Anniversary" },
    { value: "corporate", label: "Corporate Event" },
    { value: "graduation", label: "Graduation" },
    { value: "other", label: "Other" },
  ];

  // Payment options
  const paymentOptions = [
    { value: "mpesa", label: "M-Pesa" },
    { value: "card", label: "Credit/Debit Card" },
    { value: "bank", label: "Bank Transfer" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle customization changes
  const handleCustomizationChange = (optionName, value) => {
    setFormData((prev) => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [optionName]: value,
      },
    }));
  };

  // Handle date changes
  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));

    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle M-Pesa phone input
  const handleMpesaPhoneChange = (e) => {
    setMpesaPhone(e.target.value);

    if (errors.mpesaPhone) {
      setErrors({
        ...errors,
        mpesaPhone: "",
      });
    }
  };

  // Format phone number for M-Pesa (ensure it starts with 254)
  const formatMpesaPhone = (phone) => {
    // Remove any non-digit characters
    let digits = phone.replace(/\D/g, "");

    // If it starts with 0, replace with 254
    if (digits.startsWith("0")) {
      digits = "254" + digits.substring(1);
    }

    // If it doesn't start with 254, add it
    if (!digits.startsWith("254")) {
      digits = "254" + digits;
    }

    return digits;
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Customer Information validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    // Order Details validation
    if (!formData.productId) newErrors.productId = "Please select a product";

    // Event Information validation
    if (formData.eventType && !formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    }

    // Delivery & Payment validation
    if (formData.deliveryMethod === "delivery") {
      if (!formData.deliveryDate)
        newErrors.deliveryDate = "Delivery date is required";
      if (!formData.deliveryAddress.trim())
        newErrors.deliveryAddress = "Delivery address is required";
    } else if (formData.deliveryMethod === "pickup" && !formData.deliveryDate) {
      newErrors.deliveryDate = "Pickup date is required";
    }

    // Terms & Conditions validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate M-Pesa phone number
  const validateMpesaPhone = () => {
    if (!mpesaPhone.trim()) {
      setErrors((prev) => ({
        ...prev,
        mpesaPhone: "M-Pesa phone number is required",
      }));
      return false;
    }

    // Validate Safaricom number format (07XX or 01XX, 10 digits total)
    const phoneRegex = /^(0[17]\d{8})$|^(254[17]\d{8})$/;

    if (!phoneRegex.test(mpesaPhone.replace(/\D/g, ""))) {
      setErrors((prev) => ({
        ...prev,
        mpesaPhone: "Enter a valid Safaricom phone number",
      }));
      return false;
    }

    return true;
  };

  // Start polling payment status
  const startPollingPaymentStatus = (orderId) => {
    if (pollInterval) {
      clearInterval(pollInterval);
    }

    const interval = setInterval(async () => {
      try {
        const response = await paymentService.verifyPayment(orderId);
        const { verified, status } = response.data.data;
        console.log(verified, status);

        if (status === "Completed") {
          clearInterval(interval);
          setPaymentStatus("completed");
          setSubmitSuccess(true);
          window.scrollTo(0, 0);
        } else if (status === "Failed") {
          clearInterval(interval);
          setPaymentStatus("failed");
          setSubmitError(
            "Payment failed. Please try again or use a different payment method."
          );
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error("Error checking payment status:", err);
      }
    }, 5000); // Check every 5 seconds

    setPollInterval(interval);

    // Stop polling after 2 minutes if no response
    setTimeout(() => {
      clearInterval(interval);
      setPaymentStatus("timeout");
      setSubmitError(
        "Payment verification timed out. If you completed the payment, please contact us with your order number."
      );
      setIsSubmitting(false);
    }, 120000); // 2 minutes timeout
  };

  // Make sure to properly initialize customizations when product changes
  useEffect(() => {
    if (
      selectedProduct &&
      selectedProduct.customizable &&
      selectedProduct.options
    ) {
      // Initialize customization options if available
      const initialCustomizations = {};
      selectedProduct.options.forEach((option) => {
        // Make sure each option has a default choice
        if (option.choices && option.choices.length > 0) {
          initialCustomizations[option.name] = option.choices[0];
        }
      });

      setFormData((prev) => ({
        ...prev,
        productId: selectedProduct._id,
        customizations: initialCustomizations,
      }));
    }
  }, [selectedProduct]);

  // Updated handleSubmit function that explicitly includes orderNumber
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Calculate the total based on product price
        const total = parseFloat(selectedProduct.price);

        // Generate a properly formatted order number
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        const random = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
        const orderNumber = `JCB-${year}${month}${day}-${random}`;

        // Prepare order data to match your backend model
        const orderData = {
          orderNumber: orderNumber, // Explicitly include the order number
          customer: {
            userId:
              isAuthenticated && currentUser ? currentUser._id : undefined,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: formData.deliveryAddress || "",
          },
          items: [
            {
              productId: formData.productId,
              name: selectedProduct.name,
              quantity: formData.quantity,
              price: parseFloat(selectedProduct.price),
              customizations: formData.customizations,
            },
          ],
          total: total,
          status: "Pending", // Using a valid enum value from your model
          paymentMethod: formData.paymentMethod,
          paymentStatus: "Pending",
          deliveryMethod: formData.deliveryMethod,
          deliveryDate:
            formData.deliveryDate || new Date(Date.now() + 86400000), // Default to tomorrow
          deliveryAddress: formData.deliveryAddress || "",
          deliveryInstructions: formData.deliveryInstructions || "",
          notes: formData.specialInstructions || "",
        };

        console.log("Submitting order:", orderData);

        // Send order to your API
        const response = await orderService.createOrder(orderData);
        const newOrder = response.data.data;

        setOrderId(newOrder._id);
        setOrderNumber(newOrder.orderNumber);

        // If payment method is M-Pesa, show the M-Pesa form
        if (formData.paymentMethod === "mpesa") {
          setShowMpesaForm(true);
          setIsSubmitting(false);
        } else if (formData.paymentMethod === "card") {
          // For card payments, redirect to payment gateway
          navigate(`/payment/card/${newOrder._id}`);
        } else {
          // For other payment methods (like bank transfer), just show success
          setSubmitSuccess(true);
          window.scrollTo(0, 0);
        }
      } catch (err) {
        console.error("Error submitting order:", err);
        // Extract error message from the response if available
        const errorMessage =
          err.response?.data?.error ||
          "Failed to submit your order. Please try again.";
        setSubmitError(errorMessage);
        setIsSubmitting(false);
      }
    }
  };

  // Handle M-Pesa payment initiation
  const handleMpesaPayment = async (e) => {
    e.preventDefault();

    if (!validateMpesaPhone()) {
      return;
    }

    setIsSubmitting(true);
    setPaymentStatus("processing");

    try {
      // Format phone number for M-Pesa
      const formattedPhone = formatMpesaPhone(mpesaPhone);

      // Initiate M-Pesa payment
      await paymentService.initiateMpesaPayment({
        phone: formattedPhone,
        amount: selectedProduct.price,
        orderId: orderId,
      });

      // Set status to initiated
      setPaymentStatus("initiated");

      // Start polling for payment status
      startPollingPaymentStatus(orderId);
    } catch (err) {
      console.error("Error initiating M-Pesa payment:", err);
      setPaymentStatus("error");
      setSubmitError(
        err.response?.data?.error ||
          "Failed to initiate M-Pesa payment. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Submitted Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order! We've received your request and will contact
          you shortly to confirm the details.
        </p>
        <p className="text-gray-600 mb-8">
          Your order reference number is:{" "}
          <span className="font-semibold">
            {orderNumber || `ORD-${Math.floor(Math.random() * 10000)}`}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button to="/" variant="outline" size="lg">
            Return to Home
          </Button>
          <Button to="/products" size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    // Parse the price to a number first
    const numPrice = parseFloat(price);

    // Check if the price has decimal part
    const hasCents = numPrice % 1 !== 0;

    // Format with appropriate decimal places
    return numPrice.toLocaleString("en-KE", {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    });
  };

  // M-Pesa Payment Form
  if (showMpesaForm) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Complete Your Payment
        </h2>

        {submitError && <FormError message={submitError} />}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Order Placed Successfully!
          </h3>
          <p className="text-green-700">
            Your order has been received. Please complete the payment to
            finalize your order.
          </p>
          <p className="text-green-700 mt-2">
            Order Reference:{" "}
            <span className="font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center">
            {selectedProduct.image && (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
            )}
            <div>
              <h3 className="text-md font-medium text-gray-800">
                {selectedProduct.name}
              </h3>
              <span className="text-lg font-bold text-pink-500">
                Kes {formatPrice(selectedProduct.price)}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleMpesaPayment} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              M-Pesa Phone Number
            </label>
            <TextInput
              name="mpesaPhone"
              value={mpesaPhone}
              onChange={handleMpesaPhoneChange}
              placeholder="Enter your M-Pesa number (e.g., 0712345678)"
              error={errors.mpesaPhone}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the phone number registered with M-Pesa that you wish to use
              for payment.
            </p>
          </div>

          {paymentStatus === "processing" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Initiating M-Pesa payment...
              </p>
            </div>
          )}

          {paymentStatus === "initiated" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-yellow-800 font-medium mb-2">
                Payment Request Sent!
              </h4>
              <p className="text-yellow-700 mb-3">
                Please check your phone for the M-Pesa payment prompt and enter
                your PIN to complete the payment.
              </p>
              <p className="text-yellow-700 mb-3">
                This page will update automatically once your payment is
                confirmed.
              </p>
              <div className="flex justify-center mt-4">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === "failed" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-medium mb-2">Payment Failed</h4>
              <p className="text-red-700">
                Your M-Pesa payment was not successful. Please check your phone
                number and try again, or use a different payment method.
              </p>
            </div>
          )}

          {paymentStatus === "timeout" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-amber-800 font-medium mb-2">
                Payment Verification Timed Out
              </h4>
              <p className="text-amber-700">
                We couldn't confirm your payment status. If you've completed the
                payment, please contact us with your order number: {orderNumber}
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMpesaForm(false)}
              disabled={isSubmitting || paymentStatus === "initiated"}
            >
              Back to Order
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || paymentStatus === "initiated"}
            >
              {isSubmitting ? "Processing..." : "Complete M-Pesa Payment"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Error Loading Product
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button to="/products" size="lg">
          Browse Products
        </Button>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          No product selected
        </h2>
        <p className="text-gray-600 mb-6">
          Please select a product from our catalog to place an order.
        </p>
        <Button to="/products" size="lg">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-pink-500 md:text-5xl font-bold mb-6">
        Order <span className="text-gray-800">Form</span>
      </h2>

      {submitError && <FormError message={submitError} />}

      <form onSubmit={handleSubmit}>
        {/* Selected Product Display */}
        <FormSection
          title="Selected Product"
          description="You're ordering the following product:"
        >
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {selectedProduct.image && (
                <div className="w-full sm:w-auto flex-shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full sm:w-32 md:w-40 h-32 md:h-40 object-cover rounded-md shadow-sm"
                  />
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {selectedProduct.name}
                </h3>

                <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-3 md:line-clamp-none">
                  {selectedProduct.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-pink-600 font-medium text-lg md:text-xl">
                    Kes {parseFloat(selectedProduct.price).toLocaleString()}
                  </p>

                  {selectedProduct.isAvailable ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Optional: Show allergens if available */}
            {selectedProduct.allergens &&
              selectedProduct.allergens.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Contains:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedProduct.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Product Customizations */}
          {selectedProduct &&
          selectedProduct.customizable &&
          selectedProduct.options &&
          selectedProduct.options.length > 0 ? (
            <FormGroup title="Customization Options">
              {/* Debug information (remove this in production) */}
              {process.env.NODE_ENV === "development" && (
                <div className="mb-4 p-2 bg-gray-100 text-xs">
                  <p>
                    Debug: {selectedProduct.options.length} options available
                  </p>
                </div>
              )}

              {selectedProduct.options.map((option, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {option.name}:
                  </label>
                  {option.choices && option.choices.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {option.choices.map((choice, choiceIndex) => (
                        <div
                          key={choiceIndex}
                          onClick={() =>
                            handleCustomizationChange(option.name, choice)
                          }
                          className={`
                  border rounded-md py-2 px-3 text-center cursor-pointer transition-colors
                  ${
                    formData.customizations &&
                    formData.customizations[option.name] === choice
                      ? "bg-pink-100 border-pink-500 text-pink-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                `}
                        >
                          {choice}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No choices available for this option
                    </p>
                  )}
                </div>
              ))}
            </FormGroup>
          ) : (
            selectedProduct &&
            selectedProduct.customizable && (
              <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 mb-4">
                <p className="text-yellow-700">
                  This product is customizable, but no options have been
                  configured.
                </p>
              </div>
            )
          )}

          <TextArea
            label="Special Instructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="Any specific details or requests for your order..."
            rows={4}
          />
        </FormSection>
        {/* Customer Information */}
        <FormSection
          title="Customer Information"
          description="Please provide your contact details."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              error={errors.firstName}
              required
            />

            <TextInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              error={errors.lastName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <TextInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors.phone}
              required
            />
          </div>
        </FormSection>
        {/* Event Information */}
        <FormSection
          title="Event Information (Optional)"
          description="If you're ordering for a specific event, please provide the details."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Event Type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              options={eventTypeOptions}
              placeholder="Select event type"
            />

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Event Date
              </label>
              <OrderCalendar
                selectedDate={formData.eventDate}
                onDateChange={(date) => handleDateChange("eventDate", date)}
              />
              {errors.eventDate && (
                <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
              )}
            </div>
          </div>

          <TextInput
            label="Event Address (If different from delivery address)"
            name="eventAddress"
            value={formData.eventAddress}
            onChange={handleChange}
            placeholder="Enter the event address"
          />
        </FormSection>
        {/* Delivery Options */}
        <FormSection
          title="Delivery & Payment"
          description="Choose your preferred delivery method and payment option."
        >
          <DeliveryOptions
            deliveryMethod={formData.deliveryMethod}
            deliveryDate={formData.deliveryDate}
            onDeliveryMethodChange={handleChange}
            onDateChange={(date) => handleDateChange("deliveryDate", date)}
            dateError={errors.deliveryDate}
          />

          {formData.deliveryMethod === "delivery" && (
            <>
              <TextInput
                label="Delivery Address"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                error={errors.deliveryAddress}
                required={formData.deliveryMethod === "delivery"}
              />

              <TextArea
                label="Delivery Instructions (Optional)"
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleChange}
                placeholder="Any specific instructions for delivery..."
                rows={3}
              />
            </>
          )}

          <div className="mb-6">
            <RadioGroup
              label="Payment Method"
              name="paymentMethod"
              options={paymentOptions}
              value={formData.paymentMethod}
              onChange={handleChange}
              error={errors.paymentMethod}
              required
            />

            {formData.paymentMethod === "mpesa" && (
              <div className="mt-2 ml-6 text-sm text-gray-600">
                <p>
                  You'll be prompted to enter your M-Pesa phone number after
                  placing the order. A payment request will be sent to your
                  phone.
                </p>
              </div>
            )}

            {formData.paymentMethod === "card" && (
              <div className="mt-2 ml-6 text-sm text-gray-600">
                <p>
                  You'll be redirected to our secure payment gateway after
                  placing the order.
                </p>
              </div>
            )}

            {formData.paymentMethod === "bank" && (
              <div className="mt-2 ml-6 text-sm text-gray-600">
                <p>
                  Our bank details will be provided after placing the order.
                </p>
              </div>
            )}
          </div>
        </FormSection>
        {/* Terms and Conditions */}
        <div className="mb-6">
          <Checkbox
            label={
              <span>
                I agree to the{" "}
                <a href="/terms" className="text-pink-500 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-pink-500 hover:underline">
                  Privacy Policy
                </a>
              </span>
            }
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            error={errors.agreeToTerms}
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;