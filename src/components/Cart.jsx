import React, { useContext } from "react";
import "../css/Cart.css";
import { FaPlus, FaMinus, FaTrash,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext,} from "../context/CartContext";

const Cart = () => {

  const navigate = useNavigate();

  const {
    cart,
    isCartOpen,
    addToCart,
    decreaseQty,
    removeFromCart,
    toggleCart,
  } = useContext(CartContext);

  if (!isCartOpen) return null;

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <div className="overlay">

      <div className="cart-sidebar">

        <h2 className="title">
          🛒 Giỏ hàng
        </h2>

        {cart.length === 0 ? (

          <p className="empty">
            Chưa có sản phẩm
          </p>

        ) : (
          <>

            {cart.map((item) => (

              <div
                key={item.id}
                className="item"
              >

                <img src={item.image}  alt={item.name} className="cart-image" />

                <div className="info">

                  <h4 className="name">
                    {item.name}
                  </h4>

                  <p className="price">
                    {item.price.toLocaleString()}đ
                  </p>

                  <div className="qty-box">

                    <div
                      className="icon"
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      <FaMinus />
                    </div>

                    <span className="qty">
                      {item.qty}
                    </span>

                    <div
                      className="icon"
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      <FaPlus />
                    </div>
                  </div>
                </div>

                <FaTrash
                  className="delete-icon"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                />
              </div>
            ))}

            <div className="total-box">

              <h3>
                Tổng tiền:
              </h3>

              <h2 className="total">
                {total.toLocaleString()}đ
              </h2>

            </div>

            <button
              className="checkout-btn"

              onClick={() => {

                toggleCart();

                navigate("/checkout");
              }}
            >
              THANH TOÁN
            </button>

          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
