import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// Import mặc định từ mockProducts (chính là mảng products)
import products from '../data/mockProducts'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    if (Array.isArray(products)) {
      const foundProduct = products.find((p) => String(p.id) === String(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    // Gửi kèm sản phẩm VÀ số lượng thực tế được chọn trên giao diện
    addToCart(product, quantity); 
    window.dispatchEvent(new Event('openCartGlobal'));
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity); 
    navigate('/checkout'); 
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 text-gray-500">
        Đang tải dữ liệu sản phẩm...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center bg-gray-50 rounded-3xl p-8 border">
          <img src={product.image} alt={product.name} className="max-h-[400px] object-contain" />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-black text-green-600">
            {Number(product.price).toLocaleString('vi-VN')}đ
          </p>

          <hr className="border-gray-100" />

          {/* Bộ nút tăng giảm số lượng */}
          <div className="flex items-center gap-4 py-2">
            <span className="text-sm font-bold text-gray-700 w-20">Số lượng</span>
            <div className="flex items-center border rounded-2xl bg-gray-50 p-1">
              <button onClick={handleDecrease} className="w-10 h-10 font-bold text-gray-600 hover:bg-white rounded-xl cursor-pointer">-</button>
              <span className="w-12 text-center font-bold text-gray-800 text-lg">{quantity}</span>
              <button onClick={handleIncrease} className="w-10 h-10 font-bold text-gray-600 hover:bg-white rounded-xl cursor-pointer">+</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <button onClick={handleAddToCart} className="w-full py-4 border-2 border-green-600 text-green-600 font-bold rounded-2xl hover:bg-green-50 cursor-pointer">
              Thêm vào giỏ hàng
            </button>
            <button onClick={handleBuyNow} className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:bg-green-700 cursor-pointer">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;