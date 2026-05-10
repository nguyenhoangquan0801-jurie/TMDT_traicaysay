import React, { useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProductDetail.css";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const images = [
    "https://bizweb.dktcdn.net/100/514/629/products/dua-say-gion.jpg?v=1700000000",

    "https://bizweb.dktcdn.net/100/514/629/products/dua-say-gion.jpg?v=1700000000",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "DỪA SẤY GIÒN | HỘP 150G | CRISPY COCONUT CHIPS | HEALTHY SNACK",
    description: "Snack healthy thơm ngon, giòn rụm, tốt cho sức khỏe.",
    price: 89000,
    oldPrice: 153000,
    image: mainImage,
    quantity,
  };

  return (
    <div className="product-page">

      <div className="breadcrumb">
        Trang chủ / TẤT CẢ SẢN PHẨM /
        DỪA SẤY GIÒN
      </div>

      <div className="product-container">

        <div className="product-left">

          <div className="thumbnail-list">

            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""

                className={`thumbnail
                  ${mainImage === img
                    ? "active"
                    : ""
                  }`}

                onClick={() =>
                  setMainImage(img)
                }
              />
            ))}
          </div>

          <div className="main-image">
            <img
              src={mainImage}
              alt="product"
            />
          </div>

          <div className="share">

            <span>
              Chia sẻ
            </span>

            <div className="social blue"></div>
            <div className="social red"></div>
            <div className="social sky"></div>

          </div>
        </div>

        <div className="product-right">

          <h1>
            DỪA SẤY GIÒN | HỘP 150G | CRISPY COCONUT CHIPS | HEALTHY SNACK
          </h1>

          <div className="product-info">

            <span>
              Thương hiệu:
              Healthy Fruit
            </span>

            <span>
              Mã sản phẩm:
              NLF001
            </span>

          </div>

          <div className="price-box">

            <span className="new-price">
              89,000đ
            </span>

            <span className="old-price">
              153,000đ
            </span>

            <span className="discount">
              -42%
            </span>

          </div>

          <p className="saving">
            (Tiết kiệm: 64,000đ)
          </p>

          <div className="shipping-box">

            <div className="gift-icon">
              🎁
            </div>

            <div>

              <p>
                Đồng giá Ship toàn quốc 30.000đ
              </p>

              <p>
                Miễn phí Ship cho đơn hàng từ 300.000đ
              </p>

            </div>
          </div>

          <div className="coupon">

            <h3>
              Mã giảm giá
            </h3>

            <div className="coupon-list">

              <span>NLF100</span>
              <span>NLF300</span>
              <span>NLF500</span>
              <span>NLF1000</span>

            </div>
          </div>

          <div className="cart-action">

            <div className="quantity">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(
                    quantity - 1
                  )
                }
              >
                -
              </button>

              <input
                type="text"
                value={quantity}
                readOnly
              />

              <button
                onClick={() =>
                  setQuantity(
                    quantity + 1
                  )
                }
              >
                +
              </button>

            </div>

            <button
              className="add-cart"

              onClick={() =>
                addToCart({
                  ...product,
                  quantity,
                })
              }
            >
              THÊM VÀO GIỎ
            </button>

          </div>

          <div className="action-buttons">

            <button
              className="back-btn"
              onClick={() => window.history.back()}
            >
              QUAY VỀ TRANG CHỦ
            </button>

            <button
              className="buy-now"

              onClick={() => {

                addToCart({
                  ...product,
                  quantity,
                });

                navigate("/checkout");
              }}
            >
              MUA NGAY
            </button>

          </div>

          <p className="call-order">
            Gọi đặt mua
          </p>

          <div className="policy">

            <div className="policy-item">

              🚚

              <span>
                Hẹn giờ giao hàng
              </span>

            </div>

            <div className="policy-item">

              🎁

              <span>
                Ưu đãi mỗi ngày
              </span>

            </div>

            <div className="policy-item">

              ⏰

              <span>
                Đổi trả trong vòng 7 ngày
              </span>

            </div>
          </div>
        </div>
      </div>

      <div className="related">

        <h2>
          SẢN PHẨM THƯỜNG MUA CÙNG
        </h2>

      </div>
    </div>
  );
};

export default ProductDetail;
