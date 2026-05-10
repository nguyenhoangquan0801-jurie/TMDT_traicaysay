import React, { useContext, useState, } from "react";
import "../css/CheckoutPage.css";
import { CartContext, } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {

  const { cart, checkout, } = useContext(CartContext);
  const navigate = useNavigate();
  const MAX_QTY = 15;

  const [form, setForm] = useState({ name: "", phone: "", address: "", });

  const [message, setMessage] = useState({ text: "", type: "", });

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {

    const totalQty = cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );

    if (cart.length === 0) {

      setMessage({
        text:
          "❌ Chưa có sản phẩm trong giỏ hàng!",
        type: "error",
      });

      return;
    }

    if (totalQty > MAX_QTY) {

      setMessage({
        text:
          "❌ Quá 15 sản phẩm. Không thể thanh toán!",
        type: "error",
      });

      return;
    }

    checkout();

    setMessage({
      text:
        "🎉 Thanh toán thành công!",
      type: "success",
    });

    setTimeout(() => {

      setMessage({
        text: "",
        type: "",
      });

    }, 3000);
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-left">

          <h1 className="checkout-title">
            🧾 Thanh toán
          </h1>

          {message.text && (

            <div
              className={
                message.type === "success"
                  ? "toast success"
                  : "toast error"
              }
            >
              {message.text}
            </div>
          )}

          <div className="form-card">

            <h3 className="sub-title">
              Thông tin người nhận
            </h3>

            <input
              name="name"
              placeholder="Nhập họ tên..."

              value={form.name}

              onChange={handleChange}

              className="checkout-input"
            />

            <input
              name="phone"
              placeholder="Nhập số điện thoại..."
              value={form.phone}
              onChange={handleChange}
              className="checkout-input"
            />

            <input
              name="address"
              placeholder="Nhập địa chỉ..."
              value={form.address}
              onChange={handleChange}
              className="checkout-input"
            />

          </div>

          <div className="button-group">

            <button
              className="checkout-btn"

              onClick={handleCheckout}
            >
              🧾 Xác nhận thanh toán
            </button>

            <button
              className="back-btn"

              onClick={() =>
                navigate("/")
              }
            >
              ⬅ Quay về trang chủ
            </button>

          </div>
        </div>

        <div className="checkout-right">

          <h2 className="order-title">
            🛒 Đơn hàng của bạn
          </h2>

          {cart.length === 0 ? (

            <div className="empty-cart">
              Chưa có sản phẩm
            </div>

          ) : (
            <>

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="product-card"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="checkout-image"
                  />

                  <div>

                    <h4 className="product-name">
                      {item.name}
                    </h4>

                    <p className="qty">
                      Số lượng: {item.qty}
                    </p>

                    <p className="price">
                      {(
                        item.price * item.qty
                      ).toLocaleString()} đ
                    </p>

                  </div>
                </div>
              ))}

              <div className="total-box">

                <span>
                  Tổng tiền
                </span>

                <span>
                  {total.toLocaleString()} đ
                </span>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
