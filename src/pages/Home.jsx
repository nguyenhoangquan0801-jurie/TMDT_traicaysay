import React from "react";
import "../css/Home.css";
import products from "../data/mockProduct";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div>
   
      <div className="page">

        <div className="banner">
          <div>
            <h1 className="title">
              HEALTHY FRUIT SHOP 🍍
            </h1>

            <p className="text">
              Trái cây sấy healthy thơm ngon
            </p>
          </div>
        </div>

        <div className="grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
            />
          ))}
        </div>
      </div>

      <footer className="footer">

        <div className="footer-top">

          <div className="socials">
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
              alt="facebook"
              className="icon"
            />

            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="instagram"
              className="icon"
            />

            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="youtube"
              className="icon"
            />

            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
              alt="tiktok"
              className="icon"
            />
          </div>

          <div className="subscribe">

            <p className="subscribe-text">
              Bạn muốn nhận khuyến mãi đặc biệt?
              Đăng ký ngay.
            </p>

            <div className="input-box">
              <input
                type="text"
                placeholder="Thả email nhận ngay ưu đãi khủng"
                className="input"
              />

              <button className="button">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">

          <div>
            <h3 className="heading">
              Địa chỉ:
            </h3>

            <p className="info">
              311-G9 Đường số 8,
              Phường Bình Trưng,
              Thủ Đức
            </p>

            <p className="info">
              <strong>Số điện thoại:</strong>
              0901956070
            </p>

            <p className="info">
              <strong>Email:</strong>
              support@nonglamfood.com
            </p>
          </div>

          <div>
            <h3 className="heading">
              Thông tin
            </h3>

            <ul className="list">
              <li>TRANG CHỦ</li>
              <li>SẢN PHẨM</li>
              <li>TIN TỨC | MẸO VẶT</li>
              <li>GIỚI THIỆU</li>
              <li>HỢP TÁC</li>
              <li>KIỂM TRA ĐƠN HÀNG</li>
            </ul>
          </div>

          <div>
            <h3 className="heading">
              Hỗ trợ khách hàng
            </h3>

            <ul className="list">
              <li>TÌM KIẾM</li>
              <li>CHÍNH SÁCH ĐỔI TRẢ</li>
              <li>CHÍNH SÁCH BẢO MẬT</li>
              <li>THANH TOÁN VÀ VẬN CHUYỂN</li>
              <li>ĐIỀU KHOẢN VÀ QUY ĐỊNH CHUNG</li>
            </ul>
          </div>

          <div>
            <h3 className="heading">
              Tổng đài hỗ trợ
            </h3>

            <p className="info">
              Hotline:
              <span className="hotline">
                0901956070
              </span>
            </p>

            <p className="payment">
              Phương thức thanh toán
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
