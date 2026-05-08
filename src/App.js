import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
  <CartProvider>
    <BrowserRouter>
      <Navbar />
      <Cart />   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
  );
}

export default App;
