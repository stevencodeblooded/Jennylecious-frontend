import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import ProductSelection from "./ProductSelection";
import DeliveryOptions from "./DeliveryOptions";
import OrderCalendar from "./OrderCalendar";
import products from "../../data/products";

const OrderForm = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  // Pre-select product if specified in URL
  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const product = products.find((p) => p.id === parseInt(productId));
      if (product) {
        setFormData((prev) => ({
          ...prev,
          productId: product.id.toString(),
        }));
        setSelectedProduct(product);

        // Initialize customization options
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
      }
    }
  }, [searchParams]);

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

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = products.find((p) => p.id === parseInt(productId));
    setFormData((prev) => ({
      ...prev,
      productId: productId,
      customizations: {},
    }));
    setSelectedProduct(product);

    // Initialize customization options
    if (product && product.options) {
      const initialCustomizations = {};
      product.options.forEach((option) => {
        initialCustomizations[option.name] = option.choices[0];
      });
      setFormData((prev) => ({
        ...prev,
        customizations: initialCustomizations,
      }));
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      setIsSubmitting(true);

      // In a real application, this would be an API call
      setTimeout(() => {
        console.log("Order submitted:", formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after submission (in a real app, you might redirect to a confirmation page)
        window.scrollTo(0, 0);
      }, 1500);
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
            ORD-{Math.floor(Math.random() * 10000)}
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Form</h2>

      {submitError && <FormError message={submitError} />}

      <form onSubmit={handleSubmit}>
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

        {/* Product Selection */}
        <FormSection
          title="Product Selection"
          description="Choose the product you'd like to order."
        >
          <ProductSelection
            selectedProductId={formData.productId}
            onSelectProduct={handleProductSelect}
            error={errors.productId}
          />

          {/* Product Customizations */}
          {selectedProduct &&
            selectedProduct.customizable &&
            selectedProduct.options && (
              <FormGroup title="Customization Options">
                {selectedProduct.options.map((option, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      {option.name}:
                    </label>
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
                  </div>
                ))}
              </FormGroup>
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

          <RadioGroup
            label="Payment Method"
            name="paymentMethod"
            options={paymentOptions}
            value={formData.paymentMethod}
            onChange={handleChange}
            error={errors.paymentMethod}
            required
          />
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
            {isSubmitting ? "Processing..." : "Submit Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
