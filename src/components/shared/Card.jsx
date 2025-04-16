import React from "react";

const Card = ({
  children,
  className = "",
  elevation = "md",
  hover = false,
  onClick,
}) => {
  const elevationClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const hoverClasses = hover
    ? "transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    : "";

  return (
    <div
      className={`
        bg-white rounded-lg overflow-hidden 
        ${elevationClasses[elevation]} 
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : {}}
    >
      {children}
    </div>
  );
};

// Sub-components for better structuring
Card.Header = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

Card.Body = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

Card.Image = ({ src, alt, className = "" }) => (
  <div className="relative pt-[56.25%]">
    <img
      src={src}
      alt={alt}
      className={`absolute top-0 left-0 w-full h-full object-cover ${className}`}
    />
  </div>
);

export default Card;
