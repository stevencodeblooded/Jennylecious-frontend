import React, { useState } from "react";
import Button from "./Button";

const Newsletter = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // In a real application, this would be an API call to subscribe the user
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setError("");
    setEmail("");

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className={`bg-pink-50 py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest creations, special offers, and baking
            tips!
          </p>

          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4 animate-fade-in">
              Thank you for subscribing! We'll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-3 justify-center"
            >
              <div className="flex-grow max-w-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 rounded-full border ${
                    error ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-pink-300`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1 text-left">{error}</p>
                )}
              </div>
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. <button className="hover:text-red-400 transition-all hover:font-semibold">Unsubscribe</button> at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
