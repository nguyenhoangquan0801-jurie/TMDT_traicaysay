import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      saveCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
    } else {
      saveCart([...cart, { ...product, quantity: qty }]);
    }
  };

  const increaseQuantity = (id) => {
    saveCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    saveCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export default CartContext;