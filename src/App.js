import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
  <CartProvider>
    <BrowserRouter>
      <Navbar />
      <Cart />   
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout" element={<ProductDetail />} />

      </Routes>
    </BrowserRouter>
  </CartProvider>
  );
}

export default App;
