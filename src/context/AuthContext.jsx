import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext(null);

// API base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create API instance with authentication handling
const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this line
});

// Add request interceptor to include token in requests
authAPI.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Load user on first render
  useEffect(() => {
    const loadUser = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      // Set token in headers for all subsequent requests
      authAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await authAPI.get("/auth/current-user");
        setCurrentUser(response.data.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to load user:", err);
        // Clear tokens if they're invalid
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.post("/auth/register", userData);
      const { token } = response.data;

      // Save token to storage
      localStorage.setItem("token", token);

      // Get user data
      const userResponse = await authAPI.get("/auth/current-user");
      setCurrentUser(userResponse.data.data);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  // In AuthContext.jsx, modify the login method
  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.post("/auth/login", { email, password });
      console.log("Login response:", response.data);

      const { token } = response.data;
      console.log("Token received:", token);

      // Store token based on rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", token);
      console.log("Token saved to storage");

      // Set token for all future requests
      authAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Token set in default headers");

      // Log the headers that will be sent
      console.log("Headers for next request:", authAPI.defaults.headers);

      // Get user data
      const userResponse = await authAPI.get("/auth/current-user");
      setCurrentUser(userResponse.data.data);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      console.error("Login error details:", err.response || err);
      const errorMessage = err.response?.data?.error || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setIsLoading(true);
    try {
      await authAPI.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clean up locally regardless of API response
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setCurrentUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authAPI.put("/users/profile", userData);
      setCurrentUser(response.data.data);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to update profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      await authAPI.put("/users/password", { currentPassword, newPassword });
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to change password";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    setIsLoading(true);
    try {
      await authAPI.post("/auth/forgot-password", { email });
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to request password reset";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    isLoading,
    isAuthenticated,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    requestPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
