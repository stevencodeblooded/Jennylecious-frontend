import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  FormError,
  FormSuccess,
} from "../../components/shared/FormElements";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
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
        // Use the login function from AuthContext
        const result = await login(
          formData.email,
          formData.password,
          formData.rememberMe
        );

        if (result.success) {
          setSubmitSuccess(true);

          // Get the redirect path from location state or default to account page
          const from = location.state?.from?.pathname || "/account";

          // Redirect after successful login
          setTimeout(() => {
            navigate(from);
          }, 1500);
        } else {
          setSubmitError(result.error);
        }
      } catch (error) {
        setSubmitError("An unexpected error occurred. Please try again.");
        console.error("Login error:", error);
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
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="py-8 px-6 sm:px-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Log in to your account to manage your orders
                </p>
              </div>

              {submitSuccess && (
                <FormSuccess message="Login successful! Redirecting to your account..." />
              )}

              {submitError && <FormError message={submitError} />}

              <form onSubmit={handleSubmit}>
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
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  error={errors.password}
                  required
                />

                <div className="flex items-center justify-between mt-4 mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-pink-500 hover:text-pink-600 font-medium"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth={true}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>

              {/* <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Or sign in with</p>
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
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Sign up
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

export default Login;
