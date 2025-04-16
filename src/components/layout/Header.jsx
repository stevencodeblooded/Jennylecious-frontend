import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Order", path: "/order" },
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
        <nav className="hidden md:flex space-x-6 items-center">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/order"
            className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
          >
            Order Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-pink-500 transition-colors duration-300 py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/order"
              className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300 text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
