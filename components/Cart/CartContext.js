import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    // Check if the product is already in cart
    const existingIndex = cartItems.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      // If product exists, update the quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex] = {
        ...updatedCartItems[existingIndex],
        quantity: updatedCartItems[existingIndex].quantity + quantity,
      };
      setCartItems(updatedCartItems);
    } else {
      // If product does not exist, add to cart with quantity
      setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
