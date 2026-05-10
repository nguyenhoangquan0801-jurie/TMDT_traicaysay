import React, { useContext } from "react";
import "../css/ProductCart.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="card">

      {product.discount && (
        <div className="discount">
          -{product.discount}%
        </div>
      )}

      <div className="image-box">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="product-overlay">

          <button
            className="detail-btn"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            Xem chi tiết
          </button>

        </div>
      </div>

      <h3 className="name">
        {product.name}
      </h3>

      <p className="description">
        {product.description}
      </p>

      <div className="price-box">

        <span className="new-price">
          {product.price
            ? product.price.toLocaleString()
            : 0}
          đ
        </span>

        {product.oldPrice && (
          <span className="old-price">
            {product.oldPrice.toLocaleString()}
            đ
          </span>
        )}
      </div>

      <div className="info-box">

        <span>
          ⭐ {product.rating || 5.0}
        </span>

        <span>
          Đã bán: {product.sold || 0}
        </span>

      </div>

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
      >
        <FaShoppingCart />

        <span>
          Thêm vào giỏ
        </span>
      </button>
    </div>
  );
};

export default ProductCard;
