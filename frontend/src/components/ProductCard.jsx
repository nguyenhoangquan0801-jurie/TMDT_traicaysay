import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  // Kiểm tra dữ liệu sản phẩm đầu vào
  if (!product) {
    return (
      <div className="bg-white border border-red-200 rounded-3xl p-6 shadow-sm">
        <div className="h-64 bg-red-50 rounded-2xl flex items-center justify-center text-red-400 text-lg font-medium">
          Không thể tải sản phẩm
        </div>
      </div>
    );
  }

  const rawId = product.id || product.productId;
  const id = rawId ? Number(rawId) : null;

  const {
    name = 'Sản phẩm',
    price = 0,
    image,
    category,
  } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("DỮ LIỆU GỐC CỦA SẢN PHẨM TỪ API TRẢ VỀ:", product);

    const exactId = product.id || product.productId || product.product_id;

    addToCart({
      ...product,
      id: exactId ? Number(exactId) : null // Đảm bảo luôn có ID gửi vào giỏ hàng
    });
  };

  return (
    <div
      onClick={() => id && navigate(`/product/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        border border-gray-100
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-300
        h-full
        flex
        flex-col
        cursor-pointer
        hover:-translate-y-1
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        {image ? (
          <img
            src={image}
            alt={name}
            className={`
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-5xl font-bold text-gray-400">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Overlay nhẹ */}
        <div
          className="
            absolute inset-0
            bg-black/0
            group-hover:bg-black/5
            transition-all
            duration-300
          "
        />

        {/* Badge category */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Product name */}
        <h3
          className="
            text-lg
            font-semibold
            text-gray-800
            line-clamp-2
            leading-snug
            min-h-[56px]
            transition-colors
            duration-300
            group-hover:text-green-700
          "
        >
          {name}
        </h3>

        {/* Price */}
        <div className="mt-3">
          <p className="text-2xl font-bold text-green-600 tracking-tight">
            {Number(price).toLocaleString('vi-VN')}đ
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Giá đã bao gồm thuế
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className="
            mt-6
            w-full
            py-3.5
            rounded-2xl
            bg-green-600
            hover:bg-green-700
            active:scale-[0.98]
            text-white
            font-semibold
            tracking-wide
            transition-all
            duration-200
            shadow-sm
            hover:shadow-lg
          "
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductCard;