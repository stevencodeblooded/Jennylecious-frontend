import React, { useState } from "react";
import {
  TextInput,
  TextArea,
  Select,
  FormSuccess,
  FormError,
} from "../shared/FormElements";
import Button from "../shared/Button";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const inquiryTypes = [
    { value: "order", label: "Order Inquiry" },
    { value: "custom", label: "Custom Cake Design" },
    { value: "wedding", label: "Wedding Cake Consultation" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }

    // Subject validation
    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    // Inquiry type validation
    if (!formState.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      setIsSubmitting(true);

      // In a real application, this would be an API call
      setTimeout(() => {
        console.log("Form submitted:", formState);
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after submission
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Send Us a Message
      </h2>

      {submitSuccess && (
        <FormSuccess message="Thank you for your message! We'll get back to you as soon as possible." />
      )}

      {submitError && <FormError message={submitError} />}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label="Your Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label="Phone Number (Optional)"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <Select
            label="Inquiry Type"
            name="inquiryType"
            value={formState.inquiryType}
            onChange={handleChange}
            options={inquiryTypes}
            error={errors.inquiryType}
            required
          />
        </div>

        <TextInput
          label="Subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder="Enter the subject of your message"
          error={errors.subject}
          required
        />

        <TextArea
          label="Message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          rows={6}
          error={errors.message}
          required
        />

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
