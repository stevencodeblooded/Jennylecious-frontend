import React, { createContext, useState, useContext, useEffect } from "react";

// Create cart context
const CartContext = createContext(null);

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Calculate total and count
    const { total, count } = cartItems.reduce(
      (acc, item) => {
        acc.total += item.price * item.quantity;
        acc.count += item.quantity;
        return acc;
      },
      { total: 0, count: 0 }
    );

    setCartTotal(total);
    setCartCount(count);
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1, customizations = {}) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item._id === product._id &&
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            customizations,
          },
        ];
      }
    });

    return true;
  };

  // Update item quantity in cart
  const updateQuantity = (productId, quantity, customizations = {}) => {
    if (quantity <= 0) {
      return removeFromCart(productId, customizations);
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item._id === productId &&
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeFromCart = (productId, customizations = {}) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item._id === productId &&
            JSON.stringify(item.customizations) ===
              JSON.stringify(customizations)
          )
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Cart value object
  const value = {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
