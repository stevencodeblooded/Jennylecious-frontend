import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}) => {
  // Style variants
  const variants = {
    primary: "bg-pink-500 hover:bg-pink-600 text-white",
    secondary: "bg-orange-400 hover:bg-orange-500 text-white",
    outline:
      "bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
    text: "bg-transparent text-pink-500 hover:text-pink-600 p-0",
  };

  // Size variants
  const sizes = {
    sm: "text-sm py-1 px-3",
    md: "py-2 px-5",
    lg: "text-lg py-3 px-6",
  };

  const baseClasses = `
    inline-flex items-center justify-center 
    rounded-full font-medium transition-colors duration-300
    focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  // If 'to' prop exists, render a Link component
  if (to) {
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }

  // If 'href' prop exists, render an anchor tag
  if (href) {
    return (
      <a href={href} className={baseClasses} {...rest}>
        {children}
      </a>
    );
  }

  // Otherwise, render a button
  return (
    <button className={baseClasses} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
