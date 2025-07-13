import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, X, Menu } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, currentUser } = useAuth();

  // Refs for detecting clicks outside
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Handle clicks outside of mobile menu
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu and auth dropdown when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setAuthDropdownOpen(false);
  }, [location.pathname]);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-pink-600">Jennylecious</span>
          <span className="text-2xl font-light text-orange-400">
            Cakes & Bakes
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12 items-center">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              className={({ isActive }) =>
                isActive
                  ? "text-pink-500 font-semibold transition-colors duration-300"
                  : "text-gray-700 hover:text-pink-500 transition-colors duration-300"
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Authentication Area */}
          <div className="relative ml-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-pink-500">
                  <span className="mr-1">
                    {currentUser?.firstName || "Account"}
                  </span>
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>

                  {currentUser?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="relative group">
                  <button
                    onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                    className="bg-white p-2 rounded-full shadow-md hover:shadow-lg relative group transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-50 hover:to-white focus:outline-none"
                  >
                    <User className="w-6 h-6 text-gray-700 group-hover:text-pink-500 transition-colors duration-300" />
                    <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-pink-200 transition-all duration-300"></span>
                  </button>
                </div>

                {authDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    onMouseLeave={() => setAuthDropdownOpen(false)}
                  >
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setAuthDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setAuthDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={mobileMenuButtonRef}
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`
          md:hidden fixed inset-x-0 top-[var(--header-height)] bg-white shadow-lg 
          transition-all duration-300 ease-in-out
          ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
        style={{
          "--header-height": isScrolled ? "64px" : "80px",
          zIndex: 40,
        }}
      >
        <nav className="px-4 py-6">
          <div className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 py-2 border-b border-gray-100 transition-colors duration-300 ${
                    isActive
                      ? "text-pink-500 font-semibold"
                      : "hover:text-pink-500"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Authentication Links */}
            {isAuthenticated ? (
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/account"
                  className="text-gray-700 hover:text-pink-500 transition-colors duration-300 py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>

                {currentUser?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-pink-500 transition-colors duration-300 py-2 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/logout"
                  className="text-gray-700 hover:text-pink-500 transition-colors duration-300 py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex flex-col pt-4 border-t border-gray-100">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-500 transition-colors duration-300 py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 mt-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
