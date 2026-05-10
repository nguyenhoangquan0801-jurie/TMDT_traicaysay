import React, { useContext, useState,} from "react";
import "../css/Navbar.css";
import { CartContext,} from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {

  const {
    cart,
    toggleCart,
  } = useContext(CartContext);

  const [keyword, setKeyword] =
    useState("");

  const totalQty = cart.reduce(
    (sum, item) =>
      sum + item.qty,
    0
  );

  return (
    <div className="nav">

      <h2 className="logo">
        🍍 Fruit Shop
      </h2>

      <input
        placeholder="Tìm trái cây..."
        className="search"

        value={keyword}

        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

      <div className="right">

        <div
          className="cart"
          onClick={toggleCart}
        >
          🛒 Giỏ hàng

          <span className="badge">
            {totalQty}
          </span>
        </div>

        <span className="login">
          👤 Login
        </span>

      </div>
    </div>
  );
};

export default Navbar;
