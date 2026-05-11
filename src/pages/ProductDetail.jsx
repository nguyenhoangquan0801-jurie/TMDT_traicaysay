import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  // =========================
  // PRODUCT DATA
  // =========================
  const product = {
    id: 1,
    name: 'Dừa Sấy Giòn | Hộp 150G | Crispy Coconut Chips',
    brand: 'Nông Lâm Store',
    sku: 'NLF-COCONUT-150',
    price: 89000,
    oldPrice: 153000,
    description:
      'Dừa sấy giòn tự nhiên với công nghệ sấy hiện đại giúp giữ trọn hương vị thơm ngon và độ giòn hấp dẫn.',
    images: [
      'https://bizweb.dktcdn.net/100/514/629/products/dua-say-gion.jpg?v=1700000000',
      'https://picsum.photos/id/1080/800/800',
      'https://picsum.photos/id/433/800/800',
    ],
  };

  // =========================
  // STATES
  // =========================
  const [mainImage, setMainImage] = useState(
    product.images[0]
  );

  const [quantity, setQuantity] = useState(1);

  // =========================
  // PRICE
  // =========================
  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  // =========================
  // QUANTITY
  // =========================
  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      image: mainImage,
    });
  };

  // =========================
  // BUY NOW
  // =========================
  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
      image: mainImage,
    });

    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BREADCRUMB */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-sm text-gray-500">
            Trang chủ / Tất cả sản phẩm /{' '}
            <span className="text-green-600 font-medium">
              Dừa sấy giòn
            </span>
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div>
            <div className="flex gap-5">
              {/* THUMBNAILS */}
              <div className="flex flex-col gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`
                      w-24
                      h-24
                      rounded-2xl
                      overflow-hidden
                      border-2
                      transition-all
                      duration-300
                      ${
                        mainImage === img
                          ? 'border-green-500 shadow-lg'
                          : 'border-gray-200'
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </button>
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div
                className="
                  flex-1
                  bg-white
                  rounded-[36px]
                  overflow-hidden
                  border
                  border-gray-100
                  shadow-xl
                "
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    hover:scale-105
                    transition-transform
                    duration-700
                  "
                />
              </div>
            </div>

            {/* SHARE */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-gray-600 font-medium">
                Chia sẻ:
              </span>

              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-500"></div>

                <div className="w-11 h-11 rounded-full bg-red-500"></div>

                <div className="w-11 h-11 rounded-full bg-sky-400"></div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {/* CATEGORY */}
            <span
              className="
                inline-block
                px-4
                py-2
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-semibold
              "
            >
              HEALTHY SNACK
            </span>

            {/* TITLE */}
            <h1
              className="
                text-4xl
                font-bold
                text-gray-800
                mt-5
                leading-tight
              "
            >
              {product.name}
            </h1>

            {/* INFO */}
            <div className="flex flex-wrap gap-8 mt-6 text-gray-500">
              <p>
                Thương hiệu:{' '}
                <span className="text-gray-700 font-medium">
                  {product.brand}
                </span>
              </p>

              <p>
                Mã sản phẩm:{' '}
                <span className="text-gray-700 font-medium">
                  {product.sku}
                </span>
              </p>
            </div>

            {/* PRICE */}
            <div
              className="
                mt-8
                p-6
                rounded-[32px]
                bg-green-50
                border
                border-green-100
              "
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-5xl font-bold text-green-600">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>

                <span className="text-2xl text-gray-400 line-through">
                  {product.oldPrice.toLocaleString(
                    'vi-VN'
                  )}
                  đ
                </span>

                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-red-100
                    text-red-600
                    font-semibold
                  "
                >
                  -{discount}%
                </span>
              </div>

              <p className="text-gray-500 mt-4">
                Tiết kiệm:{' '}
                <span className="font-semibold text-red-500">
                  {(
                    product.oldPrice - product.price
                  ).toLocaleString('vi-VN')}
                  đ
                </span>
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Mô tả sản phẩm
              </h3>

              <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                {product.description}
              </p>
            </div>

            {/* SHIPPING */}
            <div
              className="
                mt-8
                bg-white
                border
                border-gray-100
                rounded-[28px]
                p-6
                shadow-sm
              "
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-green-100
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-green-700
                    "
                  >
                    01
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Đồng giá ship toàn quốc 30.000đ
                    </p>

                    <p className="text-gray-500 mt-1">
                      Giao hàng nhanh và an toàn
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-green-100
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-green-700
                    "
                  >
                    02
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Miễn phí ship từ 300.000đ
                    </p>

                    <p className="text-gray-500 mt-1">
                      Áp dụng toàn quốc
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* COUPON */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-5">
                Mã giảm giá
              </h3>

              <div className="flex flex-wrap gap-4">
                {[
                  'NLF100',
                  'NLF300',
                  'NLF500',
                  'NLF1000',
                ].map((code, index) => (
                  <div
                    key={index}
                    className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-white
                      border
                      border-dashed
                      border-green-300
                      text-green-700
                      font-semibold
                      shadow-sm
                    "
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION */}
            <div className="mt-10">
              {/* QUANTITY */}
              <div className="flex items-center gap-5">
                <span className="font-semibold text-gray-700">
                  Số lượng
                </span>

                <div
                  className="
                    flex
                    items-center
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    overflow-hidden
                  "
                >
                  <button
                    onClick={decreaseQty}
                    className="
                      w-14
                      h-14
                      text-xl
                      font-semibold
                      hover:bg-gray-100
                      transition
                    "
                  >
                    -
                  </button>

                  <div
                    className="
                      w-16
                      text-center
                      font-semibold
                      text-lg
                    "
                  >
                    {quantity}
                  </div>

                  <button
                    onClick={increaseQty}
                    className="
                      w-14
                      h-14
                      text-xl
                      font-semibold
                      hover:bg-gray-100
                      transition
                    "
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-5 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="
                    flex-1
                    py-5
                    rounded-3xl
                    border-2
                    border-green-600
                    text-green-700
                    font-semibold
                    text-lg
                    hover:bg-green-50
                    transition-all
                    duration-300
                  "
                >
                  Thêm vào giỏ hàng
                </button>

                <button
                  onClick={handleBuyNow}
                  className="
                    flex-1
                    py-5
                    rounded-3xl
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    font-semibold
                    text-lg
                    shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  Mua ngay
                </button>
              </div>
            </div>

            {/* POLICY */}
            <div className="grid sm:grid-cols-3 gap-5 mt-12">
              <div
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  p-6
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    mx-auto
                    text-green-700
                    font-bold
                    text-xl
                  "
                >
                  01
                </div>

                <p className="mt-5 font-semibold text-gray-700">
                  Giao hàng nhanh
                </p>
              </div>

              <div
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  p-6
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    mx-auto
                    text-green-700
                    font-bold
                    text-xl
                  "
                >
                  02
                </div>

                <p className="mt-5 font-semibold text-gray-700">
                  Ưu đãi mỗi ngày
                </p>
              </div>

              <div
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  p-6
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    mx-auto
                    text-green-700
                    font-bold
                    text-xl
                  "
                >
                  03
                </div>

                <p className="mt-5 font-semibold text-gray-700">
                  Đổi trả 7 ngày
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span
              className="
                inline-block
                px-5
                py-2
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-semibold
              "
            >
              RELATED PRODUCTS
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-6">
              Sản phẩm thường mua cùng
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  bg-white
                  rounded-[32px]
                  overflow-hidden
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                  duration-500
                "
              >
                <div className="h-72 overflow-hidden">
                  <img
                    src={`https://picsum.photos/id/${
                      200 + item
                    }/600/600`}
                    alt="product"
                    className="
                      w-full
                      h-full
                      object-cover
                      hover:scale-110
                      transition-transform
                      duration-700
                    "
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Trái cây sấy tự nhiên
                  </h3>

                  <p className="text-green-600 font-bold text-2xl mt-4">
                    59.000đ
                  </p>

                  <button
                    className="
                      w-full
                      mt-6
                      py-3.5
                      rounded-2xl
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      font-semibold
                      transition
                    "
                  >
                    Xem sản phẩm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;