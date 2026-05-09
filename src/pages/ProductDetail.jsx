import React, { useState } from "react";
import "../css/ProductDetail.css";

const ProductDetail = () => {
  const images = [
    "https://bizweb.dktcdn.net/100/514/629/products/dua-say-gion.jpg?v=1700000000",
    "https://bizweb.dktcdn.net/100/514/629/products/dua-say-gion.jpg?v=1700000000",
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Trang chủ / TẤT CẢ SẢN PHẨM / DỪA SẤY GIÒN
      </div>

      <div className="product-container">
        {/* LEFT */}
        <div className="product-left">
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className={`thumbnail ${
                  mainImage === img ? "active" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImage} alt="product" />
          </div>

          <div className="share">
            <span>Chia sẻ</span>

            <div className="social blue"></div>
            <div className="social red"></div>
            <div className="social sky"></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="product-right">
          <h1>
            DỪA SẤY GIÒN | HỘP 150G | CRISPY COCONUT CHIPS | HEALTHY SNACK
          </h1>

          <div className="product-info">
            <span>Thương hiệu:</span>
            <span>Mã sản phẩm:</span>
          </div>

          {/* Price */}
          <div className="price-box">
            <span className="new-price">89,000đ</span>

            <span className="old-price">153,000đ</span>

            <span className="discount">-42%</span>
          </div>

          <p className="saving">(Tiết kiệm: 64,000đ)</p>

          {/* Shipping */}
          <div className="shipping-box">
            <div className="gift-icon">🎁</div>

            <div>
              <p>Đồng giá Ship toàn quốc 30.000đ</p>
              <p>Miễn phí Ship cho đơn hàng từ 300.000đ</p>
            </div>
          </div>

          {/* Coupon */}
          <div className="coupon">
            <h3>Mã giảm giá</h3>

            <div className="coupon-list">
              <span>NLF100</span>
              <span>NLF300</span>
              <span>NLF500</span>
              <span>NLF1000</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="cart-action">
            <div className="quantity">
              <button
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <input type="text" value={quantity} readOnly />

              <button onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>

            <button className="add-cart">THÊM VÀO GIỎ</button>
          </div>

          <button className="buy-now">MUA NGAY</button>

          <p className="call-order">Gọi đặt mua</p>

          {/* Policy */}
          <div className="policy">
            <div className="policy-item">
              🚚
              <span>Hẹn giờ giao hàng</span>
            </div>

            <div className="policy-item">
              🎁
              <span>Ưu đãi mỗi ngày</span>
            </div>

            <div className="policy-item">
              ⏰
              <span>Đổi trả trong vòng 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="related">
        <h2>SẢN PHẨM THƯỜNG MUA CÙNG</h2>
      </div>
    </div>
  );
};

export default ProductDetail;
