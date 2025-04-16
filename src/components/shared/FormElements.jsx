import React from "react";

// Text Input Component
export const TextInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Textarea Component
export const TextArea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Select Component
export const Select = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = "Select an option",
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Checkbox Component
export const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300 rounded"
          {...rest}
        />
        {label && (
          <label htmlFor={name} className="ml-2 block text-gray-700">
            {label}
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Radio Button Group Component
export const RadioGroup = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-gray-300"
              required={required}
              {...rest}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Form Group Component (for grouping related form elements)
export const FormGroup = ({ children, title, className = "" }) => {
  return (
    <div className={`border border-gray-200 rounded-lg p-4 mb-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      )}
      {children}
    </div>
  );
};

// Form Section Component (for creating sections in a longer form)
export const FormSection = ({
  children,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {title && (
        <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      )}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
};

// Form Error Message Component
export const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Form Success Message Component
export const FormSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-green-700">{message}</p>
        </div>
      </div>
    </div>
  );
};
