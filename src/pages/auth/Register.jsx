import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  Checkbox,
  FormError,
  FormSuccess,
} from "../../components/shared/FormElements";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    agreeToTerms: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/account");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Prepare registration data (excluding confirmPassword and agreeToTerms)
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
          newsletter: formData.newsletter,
        };

        // Call register function from AuthContext
        const result = await register(userData);

        if (result.success) {
          setSubmitSuccess(true);

          // Redirect after successful registration
          setTimeout(() => {
            navigate("/account");
          }, 2000);
        } else {
          setSubmitError(result.error);
        }
      } catch (error) {
        setSubmitError("An unexpected error occurred. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
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

  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="py-8 px-6 sm:px-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Create an Account
                </h2>
                <p className="text-gray-600">
                  Join us to access exclusive offers and track your orders
                </p>
              </div>

              {submitSuccess && (
                <FormSuccess message="Registration successful! Redirecting to your account dashboard..." />
              )}

              {submitError && <FormError message={submitError} />}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                <TextInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    error={errors.password}
                    required
                  />

                  <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    required
                  />
                </div>

                <div className="mb-6">
                  <Checkbox
                    label={
                      <span>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-pink-500 hover:underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-pink-500 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    }
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    error={errors.agreeToTerms}
                  />
                </div>

                <div className="mb-6">
                  <Checkbox
                    label="I would like to receive newsletters about special offers and new products"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth={true}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>

              {/* <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Or sign up with</p>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Google
                  </button>
                </div>
              </div> */}

              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
