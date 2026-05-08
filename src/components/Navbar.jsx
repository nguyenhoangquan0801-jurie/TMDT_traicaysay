import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart, toggleCart } = useContext(CartContext);
  const [keyword, setKeyword] = useState("");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={styles.nav}>
      {/* 🏷️ Logo */}
      <h2 style={styles.logo}>🍍 Fruit Shop</h2>

      {/* 🔍 Search */}
      <input
        placeholder="Tìm trái cây..."
        style={styles.search}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* 🛒 Right menu */}
      <div style={styles.right}>
        {/* 🔥 FIX QUAN TRỌNG: click mở cart */}
        <div style={styles.cart} onClick={toggleCart}>
          🛒 Giỏ hàng
          <span style={styles.badge}>{totalQty}</span>
        </div>

        <span style={styles.login}>👤 Login</span>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#ff9800",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },

  logo: {
    margin: 0,
    fontSize: "20px",
  },

  search: {
    width: "320px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },

  right: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  cart: {
    position: "relative",
    cursor: "pointer",
  },

  badge: {
    marginLeft: "6px",
    background: "red",
    borderRadius: "50%",
    padding: "2px 7px",
    fontSize: "12px",
    color: "white",
  },

  login: {
    cursor: "pointer",
  },
};

export default Navbar;
