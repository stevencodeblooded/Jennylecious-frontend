import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * A wrapper for routes that require authentication
 * Redirects to login if user isn't authenticated
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If this route requires admin access, check user role
  if (adminOnly && currentUser?.role !== "admin") {
    // Redirect unauthorized users to the home page
    return <Navigate to="/" replace />;
  }

  // User is authenticated (and has admin role if required)
  return children;
};

export default ProtectedRoute;
