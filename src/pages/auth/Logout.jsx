import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate("/login", {
          state: { message: "You have been successfully logged out." },
        });
      } catch (error) {
        console.error("Logout error:", error);
        navigate("/login");
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Logging Out</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">
            Please wait while we log you out...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
